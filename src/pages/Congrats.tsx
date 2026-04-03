import { Link, Navigate, useParams } from 'react-router-dom'
import { StoryReveal } from '../components/StoryReveal'
import { getStoryById } from '../data/stories'

function MedalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-10 w-10 drop-shadow-sm"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 14.2c3.2 0 5.8-2.6 5.8-5.8S15.2 2.6 12 2.6 6.2 5.2 6.2 8.4s2.6 5.8 5.8 5.8Z"
        className="stroke-amber-400/90"
        strokeWidth="1.7"
      />
      <path
        d="M7.2 13.1 5.2 21l6.8-3 6.8 3-2-7.9"
        className="stroke-amber-300/90"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 8.4c.7-1.6 2.6-2 3.7-.8 1 .9.8 2.5-.4 3.2-1 .6-2.2.3-2.9-.6"
        className="stroke-amber-500"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** 匹配度达标后的祝贺页：上奖章提示，下展示汤底 */
export default function Congrats() {
  const { storyId } = useParams<{ storyId: string }>()
  const story = storyId ? getStoryById(storyId) : undefined

  if (!storyId || !story) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col px-4 py-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-8">
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

      {/* 上下两部分：恭喜 + 汤底 */}
      <div className="flex flex-1 flex-col gap-4">
        {/* 上：恭喜提示 */}
        <section className="rounded-lg border border-amber-500/25 bg-slate-800/40 px-4 py-6 shadow-lg backdrop-blur-sm sm:px-6">
          <div className="flex items-center justify-center gap-3">
            <MedalIcon />
            <h1 className="text-center text-lg font-semibold leading-snug text-amber-400 sm:text-xl">
              恭喜你，回答正常
            </h1>
          </div>
        </section>

        {/* 下：与结果页一致的帷幕 → 揭晓汤底 */}
        <StoryReveal
          storyTitle={story.title}
          storyDescription={story.description}
          bottom={story.bottom}
        />
      </div>

      <footer className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-600 px-5 py-3 text-center text-sm text-slate-200 shadow-lg transition hover:border-slate-500 hover:bg-slate-800 sm:flex-none"
        >
          返回该分类
        </Link>
      </footer>
    </div>
  )
}

