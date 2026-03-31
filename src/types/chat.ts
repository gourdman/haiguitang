/** 对话角色（与 TECH_DESIGN 的 Message 一致） */
export type TChatRole = 'user' | 'assistant'

/** 单条对话消息（数据模型） */
export type TMessage = {
  id: string
  role: TChatRole
  content: string
  timestamp: number
  /** 主持人侧占位（如「思考中…」），收到回复后应清除 */
  pending?: boolean
  /** 发送失败等异常回复的视觉区分 */
  variant?: 'error'
}
