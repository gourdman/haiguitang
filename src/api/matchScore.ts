/**
 * 请求后端评估玩家表述与汤底的语义匹配度（0–100）。
 * 失败时返回 null，不阻断游戏流程。
 */
export async function fetchMatchScore(params: {
  playerAnswer: string
  bottom: string
}): Promise<number | null> {
  const controller = new AbortController()
  const timeoutMs = 20000
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch('/api/match-score', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerAnswer: params.playerAnswer.trim(),
        bottom: params.bottom,
      }),
    })

    const payload = (await response.json().catch(() => null)) as
      | { ok?: boolean; score?: number }
      | null

    if (!response.ok || !payload?.ok || typeof payload.score !== 'number') {
      return null
    }

    const n = Math.round(payload.score)
    if (Number.isNaN(n)) return null
    return Math.min(100, Math.max(0, n))
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}
