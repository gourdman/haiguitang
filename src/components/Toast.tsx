type TToastProps = {
  message: string
  onDismiss: () => void
}

/** 底部短暂错误提示（移动端留出安全区） */
export function Toast({ message, onDismiss }: TToastProps) {
  return (
    <div
      className="toast-enter fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pointer-events-none"
      role="alert"
    >
      <div className="pointer-events-auto flex max-w-lg items-start gap-3 rounded-lg border border-rose-500/40 bg-rose-950/95 px-4 py-3 text-sm text-rose-100 shadow-2xl shadow-rose-950/50 backdrop-blur-md sm:px-5">
        <span className="mt-0.5 shrink-0 text-rose-400" aria-hidden>
          !
        </span>
        <p className="min-w-0 flex-1 leading-relaxed">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-rose-200 ring-1 ring-rose-400/30 transition hover:bg-rose-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
        >
          知道了
        </button>
      </div>
    </div>
  )
}
