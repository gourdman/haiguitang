/** OpenAI 兼容接口 — DeepSeek chat/completions 请求体（骨架） */
export type TDeepseekChatRequest = {
  /** 省略时使用默认或 VITE_DEEPSEEK_MODEL */
  model?: string
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
  temperature?: number
  max_tokens?: number
}

/** 仅解析我们用到的字段 */
export type TDeepseekChatResponse = {
  choices?: Array<{ message?: { content?: string } }>
  error?: { message?: string }
}
