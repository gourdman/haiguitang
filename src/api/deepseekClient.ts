import type { TDeepseekChatRequest, TDeepseekChatResponse } from './deepseekTypes'

const DEFAULT_MODEL = 'deepseek-chat'

/** 开发环境走 Vite 代理；生产需配置 VITE_API_PROXY_BASE 指向你的服务端转发地址 */
function chatCompletionsUrl(): string {
  if (import.meta.env.DEV) {
    return '/api/deepseek/chat/completions'
  }
  const base = import.meta.env.VITE_API_PROXY_BASE
  if (typeof base === 'string' && base.trim() !== '') {
    return `${base.replace(/\/$/, '')}/chat/completions`
  }
  throw new Error(
    '生产环境未配置 VITE_API_PROXY_BASE。静态站点无法安全持有密钥，请部署可注入 Authorization 的后端或边缘函数，见 .env.example。',
  )
}

function currentModel(): string {
  const m = import.meta.env.VITE_DEEPSEEK_MODEL
  return typeof m === 'string' && m.trim() !== '' ? m.trim() : DEFAULT_MODEL
}

function parseJsonSafe(raw: string): TDeepseekChatResponse | null {
  const t = raw.trim()
  if (!t) return null
  try {
    return JSON.parse(t) as TDeepseekChatResponse
  } catch {
    return null
  }
}

function humanizeUpstreamError(status: number, rawText: string): string {
  const lower = rawText.slice(0, 200).toLowerCase()
  if (
    status === 401 ||
    lower.includes('authentication') ||
    lower.includes('invalid api key') ||
    lower.includes('unauthorized')
  ) {
    return import.meta.env.DEV
      ? '认证失败：请检查项目根目录 .env 或 .env.local 中的 DEEPSEEK_API_KEY 是否正确，修改后需重启 npm run dev。'
      : '认证失败：请检查服务端环境中的 DeepSeek 密钥配置。'
  }
  if (status === 429 || lower.includes('rate limit')) {
    return '请求过于频繁，请稍后再试。'
  }
  const oneLine = rawText.trim().split(/\r?\n/)[0] ?? ''
  if (oneLine.length > 0 && oneLine.length < 160) {
    return oneLine
  }
  return `请求失败（HTTP ${status}）`
}

/**
 * 调用 DeepSeek Chat Completions（经代理，请求体不含密钥）
 */
export async function postChatCompletion(
  body: TDeepseekChatRequest,
): Promise<TDeepseekChatResponse> {
  const url = chatCompletionsUrl()
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...body,
      model: body.model?.trim() ? body.model : currentModel(),
    }),
  })

  const rawText = await res.text()
  const data = parseJsonSafe(rawText)

  if (!res.ok) {
    const fromJson = data?.error?.message
    throw new Error(
      fromJson?.trim()
        ? fromJson
        : humanizeUpstreamError(res.status, rawText),
    )
  }

  if (!data) {
    throw new Error(
      `接口返回了非 JSON 内容：${humanizeUpstreamError(res.status, rawText)}`,
    )
  }

  return data
}

export function extractAssistantText(data: TDeepseekChatResponse): string {
  const text = data.choices?.[0]?.message?.content
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('模型未返回有效内容')
  }
  return text
}
