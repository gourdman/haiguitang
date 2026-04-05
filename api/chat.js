import {
  callDeepSeekChat,
  createHttpError,
  sendErrorJson,
} from './lib/deepseek-core.js';

function parseBody(req) {
  if (req.body == null) return {};
  if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body);
  try {
    return JSON.parse(raw || '{}');
  } catch {
    throw createHttpError(400, 'INVALID_JSON', 'Invalid JSON body');
  }
}

export default async function handler(req, res) {
  const isProd = process.env.NODE_ENV === 'production';

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed' });
  }

  try {
    const body = parseBody(req);
    const { question, story } = body;

    if (typeof question !== 'string' || question.trim().length === 0) {
      throw createHttpError(400, 'INVALID_QUESTION', 'question is required (string)');
    }

    const isStoryObject =
      story !== null && typeof story === 'object' && !Array.isArray(story);
    if (!isStoryObject) {
      throw createHttpError(400, 'INVALID_STORY', 'story is required (JSON object)');
    }

    const answer = await callDeepSeekChat({ question: question.trim(), story });
    return res.status(200).json({ ok: true, answer });
  } catch (err) {
    return sendErrorJson(res, err, isProd);
  }
}
