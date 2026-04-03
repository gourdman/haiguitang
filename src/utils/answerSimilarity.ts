/**
 * 本地相似度（0–100）：不依赖 AI，用于「整段复述汤底」或 API 失败/偏低时的兜底。
 * 规则：去空白后相等 → 100；一方包含另一方且足够长 → 按长度比例；否则用编辑距离比例。
 */
function normalizeSoupText(s: string): string {
  return s.normalize('NFC').trim().replace(/\s+/g, '')
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m

  let prev = new Array<number>(n + 1)
  for (let j = 0; j <= n; j++) prev[j] = j

  for (let i = 1; i <= m; i++) {
    const cur = new Array<number>(n + 1)
    cur[0] = i
    const ai = a.charCodeAt(i - 1)
    for (let j = 1; j <= n; j++) {
      const cost = ai === b.charCodeAt(j - 1) ? 0 : 1
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost)
    }
    prev = cur
  }
  return prev[n]!
}

/** 与汤底文本的本地匹配分，用于与 AI 分数取 max */
export function localSimilarityScore(playerAnswer: string, bottom: string): number {
  const a = normalizeSoupText(playerAnswer)
  const b = normalizeSoupText(bottom)
  if (!a || !b) return 0
  if (a === b) return 100

  const lenA = a.length
  const lenB = b.length
  const longer = lenA >= lenB ? a : b
  const shorter = lenA < lenB ? a : b

  if (shorter.length >= 8 && longer.includes(shorter)) {
    return Math.max(0, Math.min(100, Math.round((shorter.length / longer.length) * 100)))
  }

  const maxLen = Math.max(lenA, lenB)
  const dist = levenshtein(a, b)
  const ratio = maxLen === 0 ? 1 : 1 - dist / maxLen
  return Math.max(0, Math.min(100, Math.round(ratio * 100)))
}
