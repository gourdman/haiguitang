import { useMemo, type CSSProperties } from 'react'

const CONFETTI_COUNT = 52

type TParticle = {
  id: number
  tx: number
  ty: number
  rot: number
  delay: number
  hue: number
  w: number
  h: number
  rounded: boolean
}

/** 确定性生成彩纸粒子（避免随机数导致 hydration 不一致） */
function buildParticles(): TParticle[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => {
    const angle = (i / CONFETTI_COUNT) * Math.PI * 2 + (i % 7) * 0.11
    const dist = 48 + (i % 13) * 11
    const tx = Math.cos(angle) * dist
    const ty = Math.sin(angle) * dist - 18
    return {
      id: i,
      tx,
      ty,
      rot: (i * 61) % 720 - 360,
      delay: (i % 12) * 0.016,
      hue: (i * 41) % 360,
      w: 4 + (i % 5),
      h: 6 + (i % 6),
      rounded: i % 5 === 0,
    }
  })
}

/** 汤底揭晓瞬间：中心向外爆开的七彩礼花（由父级 `position: relative` 定位） */
export function StoryRevealConfetti() {
  const particles = useMemo(buildParticles, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[8] overflow-hidden rounded-[inherit]"
      aria-hidden
    >
      {/* 中心闪光 */}
      <div className="story-confetti-flash" />

      {particles.map((p) => {
        const style = {
          width: p.w,
          height: p.h,
          borderRadius: p.rounded ? '9999px' : '3px',
          backgroundColor: `hsl(${p.hue} 88% 58%)`,
          boxShadow: `0 0 12px hsl(${p.hue} 92% 55% / 0.55)`,
          '--tx': `${p.tx}px`,
          '--ty': `${p.ty}px`,
          '--rot': `${p.rot}deg`,
          '--delay': `${p.delay}s`,
        } as CSSProperties

        return (
          <span
            key={p.id}
            className="story-confetti-piece absolute left-1/2 top-[40%] will-change-transform"
            style={style}
          />
        )
      })}
    </div>
  )
}
