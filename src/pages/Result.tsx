import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { Message } from '../components/Message'
import { StoryReveal } from '../components/StoryReveal'
import { getStoryById } from '../data/stories'
import type { TMessage } from '../types/chat'

/** 从游戏页传入的对话（可选） */
type TResultLocationState = {
  messages?: TMessage[]
}

/** 汤底页：标题、仪式感揭晓、可选对话回顾、再来一局回大厅 */
export default function Result() {
  const { storyId } = useParams<{ storyId: string }>()
  const location = useLocation()
  const story = storyId ? getStoryById(storyId) : undefined
  const state = location.state as TResultLocationState | null
  const rawMessages = state?.messages

  const displayMessages = useMemo(
    () =>
      (rawMessages ?? []).filter(
        (m) => !(m.role === 'assistant' && m.pending),
      ),
    [rawMessages],
  )
  const [historyOpen, setHistoryOpen] = useState(false)

  if (!storyId || !story) {
    return <Navigate to="/" replace />
  }

  const hasHistory = displayMessages.length > 0

  return (
    <div className="mx-auto min-h-[100dvh] max-w-2xl px-4 py-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-8">
      <header className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          to={`/category/${story.categoryId}`}
          className="inline-flex items-center gap-1 text-sm text-amber-400/90 transition hover:text-amber-300"
        >
          <span aria-hidden>←</span>
          返回分类
        </Link>
        <span className="hidden text-slate-600 sm:inline" aria-hidden>
          |
        </span>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-300"
        >
          大厅
        </Link>
      </header>

      <StoryReveal
        storyTitle={story.title}
        storyDescription={story.description}
        bottom={story.bottom}
      />

      {/* 可选：本局对话回顾（由游戏页「查看汤底」带入 state） */}
      {hasHistory && (
        <section className="mt-8 rounded-lg border border-slate-700/80 bg-slate-800/40 shadow-lg backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setHistoryOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5"
            aria-expanded={historyOpen}
          >
            <span className="text-sm font-medium text-slate-200">
              本局对话回顾
            </span>
            <span className="text-xs text-amber-500/90" aria-hidden>
              {historyOpen ? '收起 ▲' : '展开 ▼'}
            </span>
          </button>
          {historyOpen && (
            <div className="max-h-[min(50vh,24rem)] space-y-3 overflow-y-auto border-t border-slate-700/70 px-4 py-4 sm:px-5">
              {displayMessages.map((m) => (
                <Message key={m.id} message={m} />
              ))}
            </div>
          )}
        </section>
      )}

      <footer className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          to="/"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-amber-600 px-5 py-3 text-center text-sm font-medium text-slate-900 shadow-lg transition hover:bg-amber-500 sm:flex-none sm:min-w-[10rem]"
        >
          再来一局
        </Link>
        <Link
          to={`/game/${story.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-amber-600/50 px-5 py-3 text-center text-sm font-medium text-amber-400 shadow-lg transition hover:border-amber-500/70 hover:bg-amber-500/10 sm:flex-none"
        >
          再玩本故事
        </Link>
        <Link
          to={`/category/${story.categoryId}`}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-600 px-5 py-3 text-center text-sm text-slate-200 shadow-lg transition hover:bg-slate-800 sm:flex-none"
        >
          返回该分类
        </Link>
      </footer>
    </div>
  )
}
