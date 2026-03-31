import type { TStory } from './data/stories'

/** 与 TECH_DESIGN / hostPrompt 一致的故事类型别名，便于对外签名使用 `Story` */
export type Story = TStory

export async function askAI(question: string, story: Story): Promise<string> {
  const q = question.trim()
  if (!q) {
    throw new Error('问题不能为空')
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: q,
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

    return payload.answer
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('网络异常，无法连接到后端服务，请检查服务是否已启动')
    }
    throw error
  }
}
