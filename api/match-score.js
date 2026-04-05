import {
  callDeepSeekMatchScore,
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
    const { playerAnswer, bottom } = body;

    if (typeof playerAnswer !== 'string' || playerAnswer.trim().length === 0) {
      throw createHttpError(400, 'INVALID_PLAYER_ANSWER', 'playerAnswer is required (string)');
    }
    if (typeof bottom !== 'string' || bottom.trim().length === 0) {
      throw createHttpError(400, 'INVALID_BOTTOM', 'bottom is required (string)');
    }

    const score = await callDeepSeekMatchScore({
      playerAnswer: playerAnswer.trim(),
      bottom: bottom.trim(),
    });
    return res.status(200).json({ ok: true, score });
  } catch (err) {
    return sendErrorJson(res, err, isProd);
  }
}
