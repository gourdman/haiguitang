import { useEffect, useState } from 'react'

type TStoryRevealProps = {
  /** 故事标题（揭晓区上方展示） */
  storyTitle: string
  /** 标题下简短说明（与分类页风格一致） */
  storyDescription?: string
  /** 汤底正文 */
  bottom: string
}

const REVEAL_DELAY_MS = 900

/** 汤底揭晓：短暂帷幕 + 渐入与光晕，强调仪式感（尊重减少动画偏好） */
export function StoryReveal({
  storyTitle,
  storyDescription,
  bottom,
}: TStoryRevealProps) {
  const [phase, setPhase] = useState<'waiting' | 'revealed'>('waiting')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const onChange = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('revealed')
      return
    }
    const t = window.setTimeout(() => setPhase('revealed'), REVEAL_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [prefersReducedMotion])

  function skipWait() {
    if (phase === 'waiting') setPhase('revealed')
  }

  return (
    <section className="relative overflow-hidden rounded-lg shadow-lg">
      {/* 装饰：角框 */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg border border-amber-500/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[3px] rounded-md border border-amber-400/10"
        aria-hidden
      />

      <div className="relative border border-amber-500/35 bg-gradient-to-b from-slate-800/95 to-slate-900/90 px-5 py-6 sm:px-7 sm:py-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-amber-500/80">
          汤底揭晓
        </p>
        <h2 className="mt-3 text-center text-xl font-semibold leading-snug text-amber-400 sm:text-2xl">
          {storyTitle}
        </h2>
        {storyDescription ? (
          <p className="mx-auto mt-2 max-w-md text-pretty text-center text-sm leading-relaxed text-slate-400">
            {storyDescription}
          </p>
        ) : null}

        {/* 等待阶段：帷幕 */}
        {phase === 'waiting' && (
          <button
            type="button"
            onClick={skipWait}
            className="story-reveal-veil mt-8 flex w-full flex-col items-center justify-center rounded-lg border border-amber-600/30 bg-slate-950/70 px-4 py-14 text-center transition hover:border-amber-500/50 hover:bg-slate-950/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
            aria-label="立即揭晓汤底"
          >
            <span
              className="inline-block h-1 w-16 rounded-full bg-amber-400/60 story-reveal-shimmer"
              aria-hidden
            />
            <p className="mt-5 text-sm text-amber-200/90">真相正在浮现…</p>
            <p className="mt-2 text-xs text-slate-500">点击可跳过等待</p>
          </button>
        )}

        {/* 汤底正文：揭晓后大段突出 */}
        <div
          className={
            phase === 'revealed'
              ? prefersReducedMotion
                ? 'story-reveal-content-static mt-8'
                : 'story-reveal-content mt-8'
              : 'sr-only'
          }
          aria-hidden={phase !== 'revealed'}
        >
          <div className="story-reveal-glow rounded-lg border-2 border-amber-400/45 bg-slate-950/50 px-4 py-5 sm:px-6 sm:py-6">
            <h3 className="text-sm font-semibold text-amber-300/95">完整汤底</h3>
            <p className="mt-4 whitespace-pre-wrap text-base leading-[1.75] text-slate-100 sm:text-lg">
              {bottom}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
