import { Link } from 'react-router-dom'
import type { TCategory } from '../data/categories'
import { CategoryBackdrop } from './CategoryBackdrop'

type TCategoryCardProps = {
  category: TCategory
}

/**
 * 大厅：故事分类入口卡片（封面图 + 标题居中放大 + 底部描述）。
 * hover：整体上移、阴影与描边、背景图轻微放大。
 */
export function CategoryCard({ category }: TCategoryCardProps) {
  const label = `${category.name}：${category.description}。画面参考：${category.visualHint}`

  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative block min-h-[15.5rem] overflow-hidden rounded-lg border border-slate-600/70 shadow-lg outline-none ring-1 ring-slate-700/50 transition duration-300 ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.02] hover:border-amber-500/55 hover:shadow-2xl hover:shadow-amber-900/25 focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:translate-y-0 active:scale-100 sm:min-h-[17rem]"
      aria-label={label}
    >
      <CategoryBackdrop
        coverImageUrl={category.coverImageUrl}
        variant="card"
      />

      <div className="relative z-10 flex min-h-[15.5rem] flex-col sm:min-h-[17rem]">
        <span
          className="absolute right-3 top-3 rounded-md bg-slate-950/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200/90 ring-1 ring-amber-600/40 backdrop-blur-sm sm:text-xs"
          aria-hidden
        >
          5 则
        </span>

        {/* 分类名：水平垂直居中于上半区，字体放大 */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-2 pt-10 text-center sm:px-6 sm:pt-12">
          <h2 className="max-w-[14ch] text-balance text-2xl font-extrabold tracking-tight text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] transition duration-300 group-hover:text-amber-200 group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.35)] sm:text-3xl md:text-4xl">
            {category.name}
          </h2>
        </div>

        {/* 描述：贴底、居中 */}
        <div className="shrink-0 px-4 pb-5 pt-1 text-center sm:px-6 sm:pb-6">
          <p className="mx-auto max-w-md text-pretty text-sm leading-relaxed text-slate-200/95 drop-shadow-md sm:text-base">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
