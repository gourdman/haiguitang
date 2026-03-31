import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { fetchHostAnswer } from '../api/hostAnswer'
import { HOST_INVALID_REPLY_USER_HINT } from '../api/hostReply'
import { ChatBox } from '../components/ChatBox'
import { Toast } from '../components/Toast'
import { getStoryById } from '../data/stories'
import type { TMessage } from '../types/chat'
import type { TGameSessionStatus } from '../types/game'

/** 游戏页：根据 /game/:id 加载故事，汤面 + ChatBox 对话 + 底部操作（AI 经代理，密钥不在前端） */
export default function Game() {
  const { id } = useParams<{ id: string }>()
  const story = id ? getStoryById(id) : undefined
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<TMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  /** 进行中：可提问；已结束：放弃本局后停止提问，仍可查看汤底或再来一局 */
  const [sessionStatus, setSessionStatus] = useState<TGameSessionStatus>('playing')
  /** 网络/API 失败时底部 Toast（与气泡内详细文案配合） */
  const [toastError, setToastError] = useState<string | null>(null)

  if (!id || !story) {
    return <Navigate to="/" replace />
  }

  const activeStory = story

  function getErrorMessage(err: unknown): string {
    const raw = err instanceof Error ? err.message : ''
    if (raw.includes('请求超时')) {
      return '主持人响应超时了，请稍后再试。'
    }
    if (raw.includes('网络异常') || raw.includes('Failed to fetch')) {
      return '网络连接失败，请确认后端服务已启动并检查网络。'
    }
    if (raw.includes('500') || raw.includes('Server error')) {
      return '后端服务暂时不可用，请稍后重试。'
    }
    if (raw.trim()) {
      return `请求失败：${raw}`
    }
    return '抱歉，主持暂时无法回复。请稍后再试。'
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || isSending || sessionStatus !== 'playing') return

    setToastError(null)

    /** 本轮之前的对话，供 AI 上下文（不含本条用户问题与占位） */
    const prior = messages
    const now = Date.now()
    const userMsg: TMessage = {
      id: `u-${now}`,
      role: 'user',
      content: text,
      timestamp: now,
    }
    const thinkingId = `a-thinking-${now}`
    const thinkingMsg: TMessage = {
      id: thinkingId,
      role: 'assistant',
      content: '思考中...',
      timestamp: now,
      pending: true,
    }

    setMessages((prev) => [...prev, userMsg, thinkingMsg])
    setInput('')
    setIsSending(true)

    try {
      const outcome = await fetchHostAnswer({
        surface: activeStory.surface,
        bottom: activeStory.bottom,
        question: text,
        history: prior,
      })
      const replyText =
        outcome.kind === 'answer'
          ? outcome.text
          : HOST_INVALID_REPLY_USER_HINT
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? {
                ...m,
                content: replyText,
                timestamp: Date.now(),
                pending: undefined,
              }
            : m,
        ),
      )
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setToastError(errorMessage)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? {
                ...m,
                content: errorMessage,
                timestamp: Date.now(),
                pending: undefined,
                variant: 'error' as const,
              }
            : m,
        ),
      )
    } finally {
      setIsSending(false)
    }
  }

  const chatDisabled = isSending || sessionStatus === 'ended'

  function handleAbandonRound() {
    setSessionStatus('ended')
    setInput('')
  }

  function handlePlayAgain() {
    setSessionStatus('playing')
    setMessages([])
    setInput('')
    setToastError(null)
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 sm:px-5 sm:pb-8 sm:pt-6">
      {/* 顶栏：返回 */}
      <header className="mb-4 flex flex-wrap items-center gap-3 shrink-0">
        <Link
          to={`/category/${activeStory.categoryId}`}
          className="touch-manipulation inline-flex min-h-[44px] items-center gap-1 text-sm text-amber-400/90 transition hover:text-amber-300 active:opacity-80"
        >
          <span aria-hidden>←</span>
          返回分类
        </Link>
        <span className="hidden text-slate-600 sm:inline" aria-hidden>
          |
        </span>
        <Link
          to="/"
          className="touch-manipulation inline-flex min-h-[44px] items-center gap-1 text-sm text-slate-500 transition hover:text-slate-300 active:opacity-80"
        >
          大厅
        </Link>
      </header>

      {/* 故事标题 + 汤面 */}
      <section className="mb-4 shrink-0 overflow-hidden rounded-lg border border-slate-700/80 bg-slate-800/50 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-amber-900/5">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-700/70 px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold leading-snug text-amber-400 sm:text-xl">
              {activeStory.title}
            </h1>
            <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-relaxed text-slate-400">
              {activeStory.description}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${
              sessionStatus === 'playing'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-slate-600 bg-slate-800/80 text-slate-400'
            }`}
            role="status"
            aria-live="polite"
          >
            {sessionStatus === 'playing' ? '进行中' : '已结束'}
          </span>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <h2 className="text-xs font-medium uppercase tracking-wider text-slate-500">
            汤面
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            {activeStory.surface}
          </p>
        </div>
      </section>

      {/* 中部：对话 */}
      <main className="flex min-h-0 flex-1 flex-col gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wider text-slate-500">
          对话
        </h2>
        {isSending && (
          <p
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200"
            role="status"
            aria-live="polite"
          >
            正在请求主持人回复，请稍候...
          </p>
        )}
        {sessionStatus === 'ended' && (
          <p
            className="rounded-lg border border-slate-600/80 bg-slate-800/60 px-3 py-2 text-sm text-slate-300 shadow-lg"
            role="status"
          >
            你已放弃本局，无法继续提问。仍可查看汤底，或点击「再来一局」重新开始。
          </p>
        )}
        <ChatBox
          className="min-h-[min(52vh,22rem)] sm:min-h-[min(48vh,26rem)]"
          messages={messages}
          value={input}
          onChange={setInput}
          onSend={() => void handleSend()}
          disabled={chatDisabled}
          isLoading={isSending}
          emptyVariant={sessionStatus === 'ended' ? 'ended' : 'default'}
          placeholder={
            sessionStatus === 'ended'
              ? '本局已结束'
              : '输入你的问题…'
          }
        />
      </main>

      {toastError && (
        <Toast message={toastError} onDismiss={() => setToastError(null)} />
      )}

      {/* 底部操作：查看汤底 → Result；放弃本局 → 本页已结束；结束游戏 → 大厅 */}
      <footer className="mt-5 shrink-0 border-t border-slate-800/80 pt-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            to={`/result/${activeStory.id}`}
            state={{ messages }}
            className="touch-manipulation inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg border border-amber-600/50 bg-amber-500/5 px-4 py-3 text-center text-sm font-medium text-amber-400 shadow-lg transition hover:border-amber-500/70 hover:bg-amber-500/10 active:scale-[0.99] sm:min-h-[44px] sm:min-w-[8.5rem]"
          >
            查看汤底
          </Link>
          {sessionStatus === 'playing' ? (
            <button
              type="button"
              onClick={handleAbandonRound}
              className="touch-manipulation inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg border border-rose-500/45 bg-rose-500/5 px-4 py-3 text-center text-sm font-medium text-rose-300/95 shadow-lg transition hover:border-rose-400/60 hover:bg-rose-500/10 active:scale-[0.99] sm:min-h-[44px] sm:min-w-[8.5rem]"
            >
              放弃本局
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlayAgain}
              className="touch-manipulation inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg border border-emerald-500/45 bg-emerald-500/5 px-4 py-3 text-center text-sm font-medium text-emerald-300/95 shadow-lg transition hover:border-emerald-400/55 hover:bg-emerald-500/10 active:scale-[0.99] sm:min-h-[44px] sm:min-w-[8.5rem]"
            >
              再来一局
            </button>
          )}
          <Link
            to="/"
            className="touch-manipulation inline-flex min-h-[48px] flex-1 items-center justify-center rounded-lg border border-slate-600 bg-slate-800/40 px-4 py-3 text-center text-sm font-medium text-slate-300 shadow-lg transition hover:border-slate-500 hover:bg-slate-800 active:scale-[0.99] sm:min-h-[44px] sm:min-w-[8.5rem]"
          >
            结束游戏
          </Link>
        </div>
      </footer>
    </div>
  )
}
