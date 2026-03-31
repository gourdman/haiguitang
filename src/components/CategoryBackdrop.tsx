type TCategoryBackdropProps = {
  coverImageUrl: string
  /** 卡片内：absolute + 随 group-hover 变化；列表页：fixed + 静态遮罩 */
  variant: 'card' | 'page'
}

/**
 * 分类主题底图：与大厅分类卡片同一套封面与渐变逻辑。
 * - card：置于 `relative` + `group` 容器内
 * - page：固定铺满视口，略加强暗角便于长列表阅读
 */
export function CategoryBackdrop({
  coverImageUrl,
  variant,
}: TCategoryBackdropProps) {
  const pos = variant === 'page' ? 'fixed' : 'absolute'

  const imgLoading = variant === 'page' ? 'eager' : 'lazy'

  return (
    <>
      <div
        className={`pointer-events-none ${pos} inset-0 z-0 bg-slate-800`}
        aria-hidden
      />
      <img
        src={coverImageUrl}
        alt=""
        loading={imgLoading}
        decoding="async"
        className={`pointer-events-none ${pos} inset-0 z-0 h-full w-full object-cover ${
          variant === 'card'
            ? 'transition-transform duration-500 ease-out motion-safe:group-hover:scale-110'
            : ''
        }`}
      />
      {variant === 'card' ? (
        <>
          <div
            className={`pointer-events-none ${pos} inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/35 transition-opacity duration-300 group-hover:from-slate-950/95 group-hover:via-slate-950/70`}
            aria-hidden
          />
          <div
            className={`pointer-events-none ${pos} inset-0 z-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            aria-hidden
          />
        </>
      ) : (
        <>
          <div
            className={`pointer-events-none ${pos} inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/82 to-slate-950/48`}
            aria-hidden
          />
          <div
            className={`pointer-events-none ${pos} inset-0 z-0 bg-gradient-to-br from-amber-900/12 to-transparent`}
            aria-hidden
          />
        </>
      )}
    </>
  )
}
