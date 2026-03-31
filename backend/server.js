const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const IS_PROD = process.env.NODE_ENV === 'production';

function createHttpError(statusCode, code, message, details) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  err.details = details;
  return err;
}

function sendError(res, err) {
  const statusCode = Number(err?.statusCode) || 500;
  const code = String(err?.code || (statusCode >= 500 ? 'INTERNAL_ERROR' : 'BAD_REQUEST'));
  const publicMessage =
    statusCode >= 500 && IS_PROD
      ? 'Server error'
      : String(err?.message || 'Server error');

  const payload = {
    ok: false,
    code,
    message: publicMessage,
  };

  if (!IS_PROD && err?.details) {
    payload.details = err.details;
  }

  return res.status(statusCode).json(payload);
}

function normalizeHostReply(raw) {
  const firstLine = String(raw || '')
    .trim()
    .split(/\r?\n/)[0]
    ?.trim();
  if (!firstLine) return null;

  let compact = firstLine;
  compact = compact.replace(/^[\s"'「『]+|[\s"'」』]+$/g, '').trim();
  compact = compact.replace(/^(答|回答|输出|结果)[:：]\s*/i, '').trim();
  compact = compact.replace(/[。.．!！，,、]+$/u, '').trim();

  if (compact === '是' || compact === '否' || compact === '无关') {
    return compact;
  }
  return null;
}

app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '-';
    // eslint-disable-next-line no-console
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms ip=${ip}`,
    );
  });
  next();
});

app.use(
  cors({
    // Allow requests from the configured frontend origin(s). If not set, allow all origins.
    origin: function (origin, callback) {
      // Non-browser requests (no Origin header) should still work.
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(
        createHttpError(403, 'CORS_NOT_ALLOWED', `CORS: origin "${origin}" not allowed`),
      );
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.get('/api/test', (req, res) => {
  res.json({
    ok: true,
    message: 'API is working',
    timestamp: new Date().toISOString(),
  });
});

async function callDeepSeekChat({ question, story }) {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  if (!DEEPSEEK_API_KEY) {
    throw createHttpError(
      500,
      'MISSING_DEEPSEEK_API_KEY',
      'Missing DEEPSEEK_API_KEY in environment variables',
    );
  }

  const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  const DEEPSEEK_BASE_URL =
    process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/chat/completions';

  // 严格主持人模式：只允许输出「是 / 否 / 无关」
  const systemMessage =
    '你是海龟汤主持人。必须且只能输出一个词：是、否、无关。禁止解释、禁止标点、禁止前后缀、禁止换行。';

  const userMessage = `故事对象：${JSON.stringify(story, null, 2)}\n\n玩家问：${question}\n请仅输出：是 / 否 / 无关`;

  const controller = new AbortController();
  const timeoutMs = Number(process.env.DEEPSEEK_TIMEOUT_MS) || 30000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(DEEPSEEK_BASE_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.1,
        max_tokens: 8,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw createHttpError(
        502,
        'UPSTREAM_DEEPSEEK_ERROR',
        `DeepSeek API error: ${response.status} ${response.statusText}${text ? ` - ${text}` : ''}`,
      );
    }

    const data = await response.json();
    const content =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      data?.output ??
      '';

    if (!content) {
      throw createHttpError(502, 'EMPTY_DEEPSEEK_RESPONSE', 'DeepSeek API returned empty content');
    }

    const normalized = normalizeHostReply(content);
    if (!normalized) {
      throw createHttpError(
        502,
        'INVALID_HOST_REPLY',
        'Host reply must be one of: 是 / 否 / 无关',
        { raw: String(content).slice(0, 200) },
      );
    }

    return normalized;
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw createHttpError(504, 'UPSTREAM_TIMEOUT', 'DeepSeek request timeout');
    }
    if (err?.statusCode) throw err;
    throw createHttpError(500, 'UPSTREAM_REQUEST_FAILED', 'Failed to request DeepSeek', {
      reason: err?.message || 'unknown error',
    });
  } finally {
    clearTimeout(timeout);
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { question, story } = req.body || {};

    if (typeof question !== 'string' || question.trim().length === 0) {
      throw createHttpError(400, 'INVALID_QUESTION', 'question is required (string)');
    }

    // story 要求为“故事对象”，通常应是 JSON 对象
    const isStoryObject =
      story !== null && typeof story === 'object' && !Array.isArray(story);
    if (!isStoryObject) {
      throw createHttpError(400, 'INVALID_STORY', 'story is required (JSON object)');
    }

    const answer = await callDeepSeekChat({ question: question.trim(), story });
    return res.json({ ok: true, answer });
  } catch (err) {
    return sendError(res, err);
  }
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    code: 'NOT_FOUND',
    message: 'Not found',
  });
});

// Basic error handler for CORS and other middleware errors.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return sendError(
      res,
      createHttpError(400, 'INVALID_JSON', 'Invalid JSON body', {
        body: err?.body,
      }),
    );
  }
  return sendError(res, err);
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
});

