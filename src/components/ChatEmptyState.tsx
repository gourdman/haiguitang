type TChatEmptyStateProps = {
  /** 已结束且无消息时的文案 */
  variant?: 'default' | 'ended'
}

/** 对话区无消息时的引导（进行中 / 已结束） */
export function ChatEmptyState({ variant = 'default' }: TChatEmptyStateProps) {
  if (variant === 'ended') {
    return (
      <div className="chat-empty-enter flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
        <span className="text-3xl opacity-90" aria-hidden>
          🌙
        </span>
        <p className="max-w-xs text-sm leading-relaxed text-slate-400">
          本局已结束，还没有对话记录。你可以查看汤底，或点击「再来一局」重新提问。
        </p>
      </div>
    )
  }

  return (
    <div className="chat-empty-enter flex flex-col items-center justify-center gap-4 px-4 py-6 text-center sm:py-8">
      <div className="relative">
        <span
          className="chat-empty-glow text-4xl sm:text-5xl"
          role="img"
          aria-hidden
        >
          🐢
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-amber-400/95">向主持人提问</p>
        <p className="mt-1 text-xs text-slate-500">
          AI 只回答「是」「否」或「无关」，用它缩小真相范围
        </p>
      </div>
      <ul className="max-w-sm space-y-2.5 text-left text-xs leading-relaxed text-slate-400 sm:text-sm">
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden>
            ◆
          </span>
          <span>尽量问<strong className="text-slate-300">可判断对错</strong>的具体问题</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden>
            ◆
          </span>
          <span>一次一个问题，根据回答再往下推</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden>
            ◆
          </span>
          <span>随时可查看汤底或返回大厅换题</span>
        </li>
      </ul>
    </div>
  )
}
