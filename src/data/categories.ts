/** 故事分类（大厅入口） */
export type TCategory = {
  /** 路由 /category/:id */
  id: string
  name: string
  /** 一句话说明玩法/氛围 */
  description: string
  /** 建议配图风格，供卡片装饰与无障碍描述 */
  visualHint: string
  /** 分类卡片封面（Unsplash 等 HTTPS 图，需允许跨域展示） */
  coverImageUrl: string
}

export const CATEGORIES: TCategory[] = [
  {
    id: 'classic',
    name: '经典推理',
    description: '传统海龟汤风格，逻辑严密。',
    visualHint: '暗色书房、放大镜、线绳、陈旧纸张',
    coverImageUrl:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'horror',
    name: '恐怖惊悚',
    description: '紧张、阴森、灵异氛围。',
    visualHint: '黑暗森林、古堡、血手印、鬼影',
    coverImageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'black-humor',
    name: '黑色幽默',
    description: '荒诞讽刺，结局啼笑皆非。',
    visualHint: '滑稽小丑、扭曲的镜子、黑白对比',
    coverImageUrl:
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'scifi',
    name: '科幻未来',
    description: '未来科技、外星、人工智能。',
    visualHint: '霓虹城市、全息投影、太空站',
    coverImageUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'fantasy',
    name: '奇幻魔法',
    description: '魔法、神话、传说。',
    visualHint: '魔法书、水晶球、龙、精灵',
    coverImageUrl:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'crime',
    name: '悬疑犯罪',
    description: '案件、阴谋、身份伪装。',
    visualHint: '警探剪影、犯罪现场、放大镜与指纹',
    coverImageUrl:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'heartwarming',
    name: '温情治愈',
    description: '表面悲伤，真相温暖。',
    visualHint: '暖色调、拥抱、阳光、手绘温馨风格',
    coverImageUrl:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'daily',
    name: '日常之谜',
    description: '平凡生活中的出人意料。',
    visualHint: '街道、便利店、家居一角、极简风格',
    coverImageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'psychological',
    name: '心理谜题',
    description: '心理状态、认知偏差、精神幻觉。',
    visualHint:
      '迷宫、双面人脸、扭曲空间、脑内思维图（画面含其中一种或多种即可）',
    coverImageUrl:
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80',
  },
]

export function getCategoryById(id: string): TCategory | undefined {
  return CATEGORIES.find((c) => c.id === id)
}
