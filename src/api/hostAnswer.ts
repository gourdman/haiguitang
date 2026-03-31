import { parseStrictHostReply, type THostReplyToken } from './hostReply'
import type { TMessage } from '../types/chat'

type THistoryTurn = Pick<TMessage, 'role' | 'content'>

const VALID_ASSISTANT = new Set<string>(['是', '否', '无关'])

/** 仅把「问 + 合法是/否/无关」成对交给模型，避免不合规提示污染上下文 */
function historyForApi(history: THistoryTurn[]): THistoryTurn[] {
  const out: THistoryTurn[] = []
  for (let i = 0; i < history.length; i++) {
    const m = history[i]
    if (m.role !== 'user') continue
    const next = history[i + 1]
    if (
      next?.role === 'assistant' &&
      VALID_ASSISTANT.has(next.content.trim())
    ) {
      out.push(m, next)
      i++
    }
  }
  return out
}

/** 主持人本轮结果：合法三字之一，或模型输出不合规 */
export type THostAnswerOutcome =
  | { kind: 'answer'; text: THostReplyToken }
  | { kind: 'invalid' }

/**
 * 向主持人提问，解析为「是 / 否 / 无关」；若模型未遵守格式则返回 invalid。
 * @param history 不含当前这条用户问题的历史消息
 */
export async function fetchHostAnswer(params: {
  surface: string
  bottom: string
  question: string
  history: THistoryTurn[]
}): Promise<THostAnswerOutcome> {
  const prior = historyForApi(params.history)
  const story = {
    surface: params.surface,
    bottom: params.bottom,
    history: prior,
  }

  const controller = new AbortController()
  const timeoutMs = 20000
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: params.question,
        story,
      }),
    })

    const payload = (await response.json().catch(() => null)) as
      | { ok?: boolean; answer?: string; message?: string }
      | null

    if (!response.ok || !payload?.ok) {
      const message = payload?.message || `请求失败（${response.status}）`
      throw new Error(message)
    }

    if (!payload.answer || typeof payload.answer !== 'string') {
      throw new Error('后端返回内容无效，请稍后重试')
    }

    const parsed = parseStrictHostReply(payload.answer)
    if (parsed.ok) {
      return { kind: 'answer', text: parsed.reply }
    }
    return { kind: 'invalid' }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('请求超时，请稍后重试')
    }
    if (error instanceof TypeError) {
      throw new Error('网络异常，无法连接到后端服务')
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}
