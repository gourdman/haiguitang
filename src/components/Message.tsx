import { LoadingDots } from './LoadingDots'
import type { TMessage } from '../types/chat'

/** 展示用消息片段（与列表项中的 role、content、pending 一致） */
type TMessageBubble = Pick<TMessage, 'role' | 'content' | 'pending' | 'variant'>

type TMessageProps = {
  message: TMessageBubble
}

/** 用户侧圆形头像图标 */
function UserAvatarIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

/** AI 主持人侧图标（面具/主持意象） */
function HostAvatarIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3c4.97 0 9 3.58 9 8s-4.03 8-9 8-9-3.58-9-8 4.03-8 9-8Z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01M15 9h.01" />
    </svg>
  )
}

/** 单条聊天消息：用户靠右、AI 靠左，带头像与区分样式 */
export function Message({ message }: TMessageProps) {
  const { role, content, pending, variant } = message
  const isUser = role === 'user'
  const isThinking = !isUser && pending
  const isError = variant === 'error' && !isUser && !isThinking

  return (
    <div
      className={`msg-enter flex w-full gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
      role="article"
      aria-label={isUser ? '你的消息' : '主持人回复'}
    >
      {!isUser && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-slate-800 text-amber-400 shadow-lg"
          aria-hidden
        >
          <HostAvatarIcon />
        </div>
      )}

      <div
        className={`max-w-[min(85%,28rem)] rounded-lg px-3 py-2 text-sm shadow-lg transition-[box-shadow,transform] duration-200 motion-safe:hover:shadow-md ${
          isUser
            ? 'border border-amber-600/40 bg-slate-700 text-slate-100'
            : isThinking
              ? 'border border-slate-600/80 bg-slate-800/60 text-slate-400'
              : isError
                ? 'border border-rose-500/45 bg-rose-950/50 text-rose-100'
                : 'border border-slate-600 bg-slate-800/90 text-amber-100'
        }`}
      >
        {isThinking ? (
          <div className="flex flex-wrap items-center gap-2 py-0.5">
            <LoadingDots />
            <span className="sr-only">主持人思考中</span>
            <span className="text-xs text-slate-500">思考中…</span>
          </div>
        ) : (
          <p
            className="whitespace-pre-wrap break-words leading-relaxed"
            aria-live={isError ? 'assertive' : undefined}
          >
            {content}
          </p>
        )}
      </div>

      {isUser && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 ring-2 ring-amber-500/35 shadow-lg"
          aria-hidden
        >
          <UserAvatarIcon />
        </div>
      )}
    </div>
  )
}
