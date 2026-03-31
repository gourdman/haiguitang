/** 主持人合法回答（与游戏规则一致） */
export type THostReplyToken = '是' | '否' | '无关'

export type TStrictHostReply =
  | { ok: true; reply: THostReplyToken }
  | { ok: false; raw: string }

/** 模型未按「仅输出是/否/无关」作答时，展示给玩家的提示 */
export const HOST_INVALID_REPLY_USER_HINT =
  '主持人本轮只能回答「是」「否」或「无关」，但返回了不合规内容。请把问题改得更具体、可判断一些后再发一次（例如针对汤面里的某个事实做猜测）。'

/**
 * 将模型输出严格规范为「是」「否」「无关」之一。
 * 仅接受整行（去装饰后）恰好为这三者之一；不再用「无关」兜底误解析。
 */
export function parseStrictHostReply(raw: string): TStrictHostReply {
  const firstLine = raw.trim().split(/\r?\n/)[0]?.trim() ?? ''
  let compact = firstLine
  compact = compact.replace(/^[\s"'「『]+|[\s"'」』]+$/g, '').trim()
  compact = compact.replace(/^(答|回答|输出|结果)[:：]\s*/i, '').trim()
  compact = compact.replace(/[。.．!！，,、]+$/u, '').trim()

  if (compact === '是' || compact === '否' || compact === '无关') {
    return { ok: true, reply: compact }
  }
  return { ok: false, raw: raw.trim() }
}
