import { Link } from 'react-router-dom'
import type { TStory } from '../data/stories'

/** 难度中文展示 */
const DIFFICULTY_LABEL: Record<TStory['difficulty'], string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

type TGameCardProps = {
  /** 单条海龟汤故事数据 */
  story: TStory
}

/**
 * 游戏大厅：单张故事卡片。
 * 点击整卡跳转至对应游戏页 `/game/:id`。
 */
export function GameCard({ story }: TGameCardProps) {
  const difficulty = story.difficulty
  const label = `${story.title}。${story.description} 难度：${DIFFICULTY_LABEL[difficulty]}`

  return (
    <Link
      to={`/game/${story.id}`}
      aria-label={label}
      className="group touch-manipulation block min-h-[48px] rounded-lg border border-slate-700 bg-slate-800/80 p-4 shadow-lg outline-none transition duration-200 motion-safe:hover:-translate-y-0.5 hover:border-amber-500/50 hover:bg-slate-800 hover:shadow-xl hover:shadow-amber-900/15 focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-0 active:scale-[0.995] sm:min-h-0"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-amber-400 transition group-hover:text-amber-300">
            {story.title}
          </h2>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-400 transition group-hover:text-slate-300/95">
            {story.description}
          </p>
        </div>
        <span
          className="shrink-0 rounded bg-slate-700/90 px-2.5 py-0.5 text-xs font-medium text-slate-200 ring-1 ring-slate-600 transition group-hover:bg-amber-950/40 group-hover:text-amber-200 group-hover:ring-amber-600/40"
          aria-hidden
        >
          {DIFFICULTY_LABEL[difficulty]}
        </span>
      </div>
    </Link>
  )
}
