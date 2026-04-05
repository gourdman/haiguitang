/**
 * DeepSeek 调用逻辑（供 Vercel `api/*` Serverless 使用；本地开发仍可用 backend/server.js）
 * 密钥仅从 process.env 读取，勿把 .env 提交到 Git
 */

export const MSG_MISSING_DEEPSEEK_KEY =
  '未配置 DEEPSEEK_API_KEY：在 Vercel 项目 Environment Variables 中设置，或本地 backend/.env 中设置';

export function createHttpError(statusCode, code, message, details) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  err.details = details;
  return err;
}

export function normalizeHostReply(raw) {
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

export function parseScore0to100(raw) {
  const s = String(raw ?? '').trim();
  const m = s.match(/\d{1,3}/);
  if (!m) return null;
  const n = parseInt(m[0], 10);
  if (Number.isNaN(n)) return null;
  return Math.min(100, Math.max(0, n));
}

export async function callDeepSeekChat({ question, story }) {
  const DEEPSEEK_API_KEY = String(process.env.DEEPSEEK_API_KEY || '').trim();
  if (!DEEPSEEK_API_KEY) {
    throw createHttpError(500, 'MISSING_DEEPSEEK_API_KEY', MSG_MISSING_DEEPSEEK_KEY);
  }

  const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  const DEEPSEEK_BASE_URL =
    process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/chat/completions';

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

export async function callDeepSeekMatchScore({ playerAnswer, bottom }) {
  const DEEPSEEK_API_KEY = String(process.env.DEEPSEEK_API_KEY || '').trim();
  if (!DEEPSEEK_API_KEY) {
    throw createHttpError(500, 'MISSING_DEEPSEEK_API_KEY', MSG_MISSING_DEEPSEEK_KEY);
  }

  const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  const DEEPSEEK_BASE_URL =
    process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/chat/completions';

  const systemMessage =
    '你是海龟汤裁判。只根据给定「汤底」判断玩家这段话是否说中真相。输出且仅输出一个 0 到 100 的整数（不要其它任何字符）。若玩家几乎复述或完整复述「汤底」原文（仅差空白、标点或个别字），必须输出 100。100 表示玩家完整说中汤底核心真相；90–99 表示核心正确、细节略有出入；70–89 表示大致说中核心或关键情节；0–49 表示错误或基本无关。';

  const userMessage = `汤底：\n${bottom}\n\n玩家表述：\n${playerAnswer}\n\n只输出 0–100 的整数：`;

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

    const score = parseScore0to100(content);
    if (score === null) {
      throw createHttpError(
        502,
        'INVALID_MATCH_SCORE',
        'Could not parse match score from model output',
        { raw: String(content).slice(0, 200) },
      );
    }

    return score;
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

export function sendErrorJson(res, err, isProd) {
  const statusCode = Number(err?.statusCode) || 500;
  const code = String(err?.code || (statusCode >= 500 ? 'INTERNAL_ERROR' : 'BAD_REQUEST'));
  const publicMessage =
    statusCode >= 500 && isProd ? 'Server error' : String(err?.message || 'Server error');

  const payload = {
    ok: false,
    code,
    message: publicMessage,
  };

  if (!isProd && err?.details) {
    payload.details = err.details;
  }

  return res.status(statusCode).json(payload);
}
