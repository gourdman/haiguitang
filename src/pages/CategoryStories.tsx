import { Link, Navigate, useParams } from 'react-router-dom'
import { CategoryBackdrop } from '../components/CategoryBackdrop'
import { GameCard } from '../components/GameCard'
import { getCategoryById } from '../data/categories'
import { getStoriesByCategoryId } from '../data/stories'

/** 某分类下的故事列表，选一则进入 `/game/:id` */
export default function CategoryStories() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = categoryId ? getCategoryById(categoryId) : undefined
  const list = categoryId ? getStoriesByCategoryId(categoryId) : []

  if (!categoryId || !category) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:py-12">
      <CategoryBackdrop
        coverImageUrl={category.coverImageUrl}
        variant="page"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-8 sm:mb-10">
          <Link
            to="/"
            className="touch-manipulation inline-flex min-h-[44px] items-center gap-1 text-sm text-amber-400/90 transition hover:text-amber-300 active:opacity-80"
          >
            <span aria-hidden>←</span>
            返回大厅
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-amber-400 sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">{category.description}</p>
          <p className="mt-1 text-xs text-slate-500">配图风格参考：{category.visualHint}</p>
        </header>

        <section aria-labelledby="cat-stories-heading">
          <h2
            id="cat-stories-heading"
            className="mb-5 text-lg font-semibold text-amber-400/95 sm:text-xl"
          >
            本分类故事（{list.length}）
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {list.map((story) => (
              <li key={story.id} className="min-w-0">
                <GameCard story={story} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
