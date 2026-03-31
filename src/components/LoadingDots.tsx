/** 主持人思考中：三点跳动（尊重减少动画时改为静态） */
export function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1.5 px-0.5" aria-hidden>
      <span className="loading-dot inline-block h-1.5 w-1.5 rounded-full bg-amber-400/90" />
      <span className="loading-dot inline-block h-1.5 w-1.5 rounded-full bg-amber-400/90" />
      <span className="loading-dot inline-block h-1.5 w-1.5 rounded-full bg-amber-400/90" />
    </span>
  )
}
