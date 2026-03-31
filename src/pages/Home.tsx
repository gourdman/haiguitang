import { CategoryCard } from '../components/CategoryCard'
import { CATEGORIES } from '../data/categories'

/** 游戏大厅：规则简介、故事分类入口 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cyan-950 px-4 py-10 sm:py-16">
      {/* 大堡礁阳光海景，见 index.css */}
      <div className="home-ocean-bg" aria-hidden />
      <div className="home-mist" aria-hidden />
      {/* 顶部阳光高光 */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,rgba(253,224,71,0.14),transparent_52%),radial-gradient(ellipse_75%_42%_at_50%_-5%,rgba(56,189,248,0.1),transparent_48%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-12 text-center sm:mb-16">
          <p className="mb-4 text-xs font-medium tracking-[0.45em] text-amber-500/80 sm:text-sm">
            汤面之下
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5 md:gap-6">
            <span
              className="select-none text-5xl leading-none sm:text-6xl md:text-7xl"
              role="img"
              aria-label="海龟"
            >
              🐢
            </span>
            <h1
              className="text-4xl font-extrabold tracking-tight text-amber-400 sm:text-5xl md:text-6xl md:tracking-tight"
              style={{
                textShadow:
                  '0 0 12px rgba(251, 191, 36, 0.65), 0 0 28px rgba(251, 191, 36, 0.4), 0 0 48px rgba(245, 158, 11, 0.22), 0 0 72px rgba(217, 119, 6, 0.12)',
              }}
            >
              AI海龟汤
            </h1>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
            只言片语的谜面，唯一自洽的真相——在追问与排除中逼近汤底。
          </p>
        </header>

        <section
          id="game-rules"
          aria-labelledby="rules-heading"
          className="mb-14 sm:mb-16"
        >
          <h2
            id="rules-heading"
            className="mb-4 text-center text-lg font-semibold text-amber-400/95 sm:text-xl"
          >
            游戏规则简介
          </h2>
          <div className="mx-auto max-w-3xl rounded-lg border border-slate-700/90 bg-slate-800/40 p-5 shadow-lg shadow-slate-950/50 backdrop-blur-sm sm:p-7">
            <ol className="list-none space-y-4 text-left text-sm leading-relaxed text-slate-300 sm:text-base">
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-700/80 text-xs font-bold text-amber-400 ring-1 ring-slate-600"
                  aria-hidden
                >
                  1
                </span>
                <span>
                  <strong className="text-slate-100">汤面</strong>
                  是主持人给出的不完整故事；<strong className="text-slate-100">汤底</strong>
                  是隐藏真相。开局时你只知道汤面。
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-700/80 text-xs font-bold text-amber-400 ring-1 ring-slate-600"
                  aria-hidden
                >
                  2
                </span>
                <span>
                  通过<strong className="text-slate-100">不断提问</strong>
                  来推理；本站的 AI 主持人只会回答「
                  <strong className="text-amber-400/90">是</strong>」「
                  <strong className="text-amber-400/90">否</strong>」或「
                  <strong className="text-amber-400/90">无关</strong>
                  」。
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-700/80 text-xs font-bold text-amber-400 ring-1 ring-slate-600"
                  aria-hidden
                >
                  3
                </span>
                <span>
                  问题尽量<strong className="text-slate-100">具体、可判断对错</strong>
                  ；避免一次性罗列太多假设，便于逐步缩小范围。
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-700/80 text-xs font-bold text-amber-400 ring-1 ring-slate-600"
                  aria-hidden
                >
                  4
                </span>
                <span>
                  先在大厅选择<strong className="text-slate-100">故事分类</strong>
                  ，再选一则故事开局；推理中可随时查看「汤底」核对，或返回分类与大厅换题。
                </span>
              </li>
            </ol>
          </div>
        </section>

        <section id="story-categories" aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="mb-6 text-center text-xl font-semibold text-amber-400 sm:text-2xl"
          >
            故事分类
          </h2>
          <p className="mb-6 text-center text-sm text-slate-500 sm:text-base">
            请选择一类，进入该分类下的 5 则海龟汤。
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="min-w-0">
                <CategoryCard category={cat} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
