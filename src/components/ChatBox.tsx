import type { KeyboardEvent } from 'react'
import { useLayoutEffect, useRef } from 'react'
import type { TMessage } from '../types/chat'
import { ChatEmptyState } from './ChatEmptyState'
import { Message } from './Message'
import { Spinner } from './Spinner'

type TChatBoxProps = {
  /** 对话消息（含 id，用于列表 key） */
  messages: TMessage[]
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  /** 正在等待主持回复：发送按钮显示加载 */
  isLoading?: boolean
  placeholder?: string
  /** 无消息时的展示：进行中引导 / 已结束且无对话 */
  emptyVariant?: 'default' | 'ended'
  /** 根节点 class，用于在父级 flex 布局中占满剩余高度 */
  className?: string
}

/** 聊天界面：上方消息列表（Message），下方输入区；回车发送；新消息时滚动到底部 */
export function ChatBox({
  messages,
  value,
  onChange,
  onSend,
  disabled,
  isLoading,
  placeholder = '输入你的问题…',
  emptyVariant = 'default',
  className = '',
}: TChatBoxProps) {
  const listScrollRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = listScrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && !isLoading && value.trim()) onSend()
    }
  }

  const sendBlocked = disabled || isLoading || !value.trim()

  return (
    <div
      className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-950/40 shadow-lg ${className}`}
    >
      <div
        ref={listScrollRef}
        className="flex min-h-[12rem] flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden p-3 sm:p-4"
      >
        {messages.length === 0 ? (
          <ChatEmptyState variant={emptyVariant} />
        ) : (
          messages.map((m) => <Message key={m.id} message={m} />)
        )}
      </div>

      <div className="shrink-0 border-t border-slate-700 bg-slate-800/90 p-2 shadow-lg sm:p-3">
        <div className="flex gap-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={2}
            placeholder={placeholder}
            className="min-h-[48px] flex-1 resize-none rounded-md bg-slate-900/80 px-3 py-2.5 text-base leading-normal text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[44px]"
          />
          <button
            type="button"
            onClick={onSend}
            disabled={sendBlocked}
            aria-busy={isLoading ? 'true' : 'false'}
            className="touch-manipulation flex min-h-[48px] min-w-[5rem] shrink-0 items-center justify-center self-end rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-slate-900 shadow-lg transition hover:bg-amber-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[44px] sm:min-w-[4.5rem] sm:px-4"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5">
                <Spinner className="h-4 w-4" label="发送中" />
                <span className="text-xs">发送中</span>
              </span>
            ) : (
              '发送'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
