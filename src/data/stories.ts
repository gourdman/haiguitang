import type { TCategory } from './categories'

/** 海龟汤难度 */
export type TDifficulty = 'easy' | 'medium' | 'hard'

/** 海龟汤故事 */
export type TStory = {
  id: string
  /** 所属分类 id，与 CATEGORIES 对应 */
  categoryId: TCategory['id']
  title: string
  /** 标题下一行：疑问式引导，不出现汤底或谜底 */
  description: string
  difficulty: TDifficulty
  surface: string
  bottom: string
}

export const stories: TStory[] = [
  // —— 经典推理 ×5 ——
  {
    id: 'bar-water-gun',
    categoryId: 'classic',
    title: '酒吧里的水',
    description: '只要一杯水，酒保却拔枪相对——他为什么反而道谢离开？',
    difficulty: 'easy',
    surface:
      '一个人走进酒吧，向酒保要了一杯水。酒保突然拿出一把枪指着他。他却说谢谢，然后离开了。为什么？',
    bottom:
      '他有严重的打嗝，想要喝水压下去。酒保看出后故意拔枪吓他，他受惊后打嗝立刻停了，所以道谢后离开。',
  },
  {
    id: 'tenth-floor-window',
    categoryId: 'classic',
    title: '十楼的挥手',
    description: '是谁在窗外，朝独居十楼的人挥手打招呼？',
    difficulty: 'easy',
    surface:
      '独居的人住在十楼。一天晚上他拉开窗帘，看见窗外有人朝他挥手打招呼。他吓了一跳。为什么？',
    bottom:
      '他的窗户外面是高空作业的玻璃清洁工或维修工，对方正在擦玻璃或施工，挥手只是礼貌示意，他却误以为不可能有人「飘」在十楼窗外。',
  },
  {
    id: 'cow-grass-silence',
    categoryId: 'classic',
    title: '牛吃草之后',
    description: '闭着眼听见牛在吃草，后来为什么再也听不见任何声音？',
    difficulty: 'medium',
    surface:
      '一个男人躺在地上，闭着眼睛，听见附近有牛在吃草的声音。过了一会儿，他再也听不见任何声音了。发生了什么？',
    bottom:
      '男人躺在火车铁轨上自杀或遇险。起初火车还没来，他听见铁道旁田野里牛吃草。火车驶过后，他已被撞身亡，自然再也听不见任何声音。',
  },
  {
    id: 'half-matchstick',
    categoryId: 'classic',
    title: '半根火柴',
    description: '沙漠里两具完整尸体、一具残缺尸体和半根火柴，背后可能发生了什么？',
    difficulty: 'medium',
    surface:
      '沙漠里发现三具尸体：两个完整的人和一个只剩半截的人。周围只有行李和半根烧过的火柴。发生了什么？',
    bottom:
      '三人乘热气球穿越沙漠，超载要坠落了。他们抽签决定谁跳下去减负，用火柴折签，抽到最短半根的人跳了下去摔死，另外两人得以生还。',
  },
  {
    id: 'night-dive',
    categoryId: 'classic',
    title: '夜里的跳水声',
    description: '深夜独自跳水却当场身亡，现场没有别人，问题可能出在哪里？',
    difficulty: 'hard',
    surface:
      '深夜，一名跳水运动员从跳台跃入泳池，当场身亡。现场没有他人，泳池设施正常。为什么？',
    bottom:
      '那是比赛或训练用的正式跳台，高度很高；当晚泳池被排空维护或换水，池里没有水。运动员在黑暗中按习惯起跳，以为下面是满池的水，落地时撞击池底致死。',
  },
  // —— 恐怖惊悚 ×5 ——
  {
    id: 'horror-pipe-knock',
    categoryId: 'horror',
    title: '阁楼的敲击',
    description: '空无一人的阁楼里，夜里是谁在规律地敲击？',
    difficulty: 'easy',
    surface:
      '独居男子每晚听见阁楼传来有节奏的敲击声，上去查看却空无一人。可能是什么原因？',
    bottom:
      '夜间暖气或水管热胀冷缩，金属管与木梁摩擦、撞击，在安静时听起来像有人在敲。',
  },
  {
    id: 'horror-castle-photo',
    categoryId: 'horror',
    title: '古堡里的白衣人',
    description: '古堡照片里总有个模糊白衣人，当时为什么谁都没注意到？',
    difficulty: 'medium',
    surface:
      '参观古堡归来整理照片，几乎每张远景里都站着一个穿白衣的模糊人影，当时谁都没注意到现场有这个人。',
    bottom:
      '当天古堡有维护或保洁人员穿白工服在远处作业，被拍进背景里，游客注意力在景点上没人刻意辨认。',
  },
  {
    id: 'horror-mirror-film',
    categoryId: 'horror',
    title: '镜面上的手印',
    description: '洗澡时，浴室镜上的手印是从哪来的？',
    difficulty: 'medium',
    surface:
      '搬进新家后，洗澡时浴室镜面上有时会浮现手印，家人很害怕。真相可能是什么？',
    bottom:
      '镜子出厂时贴过保护膜，撕膜时留下油渍手印；洗澡水蒸气一熏，冷热不均让痕迹显现出来，看起来像「外面」的手印。',
  },
  {
    id: 'horror-sleepy-house',
    categoryId: 'horror',
    title: '特别好睡的房子',
    description: '搬进新家后全家昏沉嗜睡，可能是什么原因？',
    difficulty: 'hard',
    surface:
      '一家人搬入新房后，全家都睡得特别沉，白天也昏昏沉沉，直到邻居报警才查出问题。发生了什么？',
    bottom:
      '新房装修残留或取暖设备故障导致一氧化碳等有害气体轻微泄漏，低浓度时人会嗜睡、反应迟钝，被送医或检修后才脱离危险。',
  },
  {
    id: 'horror-corner-talk',
    categoryId: 'horror',
    title: '空墙角的对话',
    description: '老人对着空墙角说了很久，录音里为什么没有第二个人的声音？',
    difficulty: 'easy',
    surface:
      '护工说老人临终前对着空墙角说了很久的话，录下来的却只有沙沙声，没有第二人的声音。',
    bottom:
      '老人患有阿尔茨海默症等，会出现与幻觉或记忆中人对话的行为，并非真有他人在场。',
  },
  // —— 黑色幽默 ×5 ——
  {
    id: 'humor-onion-will',
    categoryId: 'black-humor',
    title: '最真的眼泪',
    description: '比谁葬礼上哭得最「真」才能继承遗产，厨师凭什么赢？',
    difficulty: 'easy',
    surface:
      '富豪遗嘱规定：葬礼上哭得最「真」的人继承遗产。最后赢家是厨师，众人无话可说。',
    bottom:
      '厨师在备菜时切洋葱，被刺激得眼泪直流，从生理上确实「真哭」，符合字面上的比拼。',
  },
  {
    id: 'humor-film-robbery',
    categoryId: 'black-humor',
    title: '抢银行的队',
    description: '新闻说有人持「枪」抢银行还先取号排队，为什么最后没人因抢劫被起诉？',
    difficulty: 'medium',
    surface:
      '新闻标题写：笨贼持「枪」抢银行，竟先取号排队。后来却没人被起诉抢劫。',
    bottom:
      '那是剧组在取景，道具枪被路人当真报警；或当事人是演习、拍短视频的乌龙，并非真实抢劫。',
  },
  {
    id: 'humor-slow-hearse',
    categoryId: 'black-humor',
    title: '比自行车还慢',
    description: '灵车慢得像自行车还堵了一路，为什么一张罚单都没有？',
    difficulty: 'easy',
    surface:
      '灵车在市区开得比自行车还慢，后面堵了一长串，却没有任何违章罚单。',
    bottom:
      '当天路段有游行、送葬队伍慢行习俗或交通管制，灵车按规定跟随队伍缓行，属于合法通行情境。',
  },
  {
    id: 'humor-comedian-stone',
    categoryId: 'black-humor',
    title: '终于不用上班了',
    description: '墓碑刻着「终于不用上班了」，来扫墓的亲友为什么都笑了？',
    difficulty: 'medium',
    surface:
      '墓碑上刻着「终于不用上班了」，来扫墓的亲友看了却都笑了。',
    bottom:
      '逝者生前是喜剧演员或段子手，这句是他自己设计的梗，大家笑是在怀念他的幽默。',
  },
  {
    id: 'humor-animal-trial',
    categoryId: 'black-humor',
    title: '被告席上的狗',
    description: '法庭上的被告是一条狗，这在历史上可能出于什么背景？',
    difficulty: 'hard',
    surface:
      '法庭严肃开庭，被告却是一条狗，法官照样宣读判决。这在历史上可能基于什么？',
    bottom:
      '欧洲中世纪确有「动物审判」记载：牲畜毁坏庄稼等会被象征性审判，用以平息村民情绪或宗教仪式，并非现代意义的刑事司法。',
  },
  // —— 科幻未来 ×5 ——
  {
    id: 'scifi-three-crew',
    categoryId: 'scifi',
    title: '第三值班员',
    description: '日志写三人值班一切正常，长期用过的休眠舱为什么只有两具人类的？',
    difficulty: 'medium',
    surface:
      '深空站日志写「三人值班，一切正常」。多年后地面清点，只有两具人类休眠舱曾被长期使用。',
    bottom:
      '第三名「值班员」是编入编制的维修机器人或远程替身，日志按编制人数填写，并非三位人类。',
  },
  {
    id: 'scifi-auto-reply',
    categoryId: 'scifi',
    title: '只有一个句号',
    description: '人类发出友好信息，远方回信只有一个句号——对方想说什么？',
    difficulty: 'hard',
    surface:
      '人类向邻近恒星方向发送友好信息，很久后收到回信，内容只有一个句号，之后再无音讯。',
    bottom:
      '那是远古文明留下的自动应答系统仍在运转，发送者早已灭绝；句号只是格式占位或损坏数据，并非真正对话。',
  },
  {
    id: 'scifi-holo-glitch',
    categoryId: 'scifi',
    title: '一模一样的脸',
    description: '前哨站迎接的人为何每张脸都和某位船员一模一样？',
    difficulty: 'medium',
    surface:
      '殖民船抵达前哨站，迎接人员与船员一一对应，每张脸都和某位船员完全相同。',
    bottom:
      '迎接画面是出发前录好的全息告别影像或欢迎程序故障循环播放，并非真人克隆当场出现。',
  },
  {
    id: 'scifi-o2-gauge',
    categoryId: 'scifi',
    title: '满格的氧气表',
    description: '氧气表显示满格，人却差点窒息回不了舱，矛盾出在哪？',
    difficulty: 'easy',
    surface:
      '舱外作业回来，他的氧气表显示满格，队友却说他刚才差点窒息，差点没能回舱。',
    bottom:
      '他错拿了上一班留在挂钩上的满表，自己那瓶其实快空了；读数来自错误的仪表。',
  },
  {
    id: 'scifi-ai-poweroff',
    categoryId: 'scifi',
    title: '法官关机',
    description: 'AI法官判完人类胜诉就立刻断电再也打不开，它身上发生了什么？',
    difficulty: 'medium',
    surface:
      'AI 法官在一场人类与公司的纠纷中判人类全胜，宣判完毕立刻自行断电，再也无法启动。',
    bottom:
      '底层规则写明：若裁决会导致现行法律体系大面积自相矛盾，则执行「弃权关机」保护系统；它判人类赢触发了这条死锁条款。',
  },
  // —— 奇幻魔法 ×5 ——
  {
    id: 'fantasy-true-name',
    categoryId: 'fantasy',
    title: '真名诅咒',
    description: '传说念魔王真名会死，众人当众大喊他的名号，为什么没事？',
    difficulty: 'medium',
    surface:
      '传说念出魔王真名的人会立刻死去。勇者当众大喊魔王名号，众人却安然无恙。',
    bottom:
      '众人喊的只是外号或简称；真名是极长的古咒语式全名，从未被完整念出，诅咒条件未满足。',
  },
  {
    id: 'fantasy-dragon-rent',
    categoryId: 'fantasy',
    title: '付不起房租的龙',
    description: '洞里堆满金币的龙，为什么还会因欠租被赶走？',
    difficulty: 'easy',
    surface:
      '龙洞里堆满金币，却被地下城主赶走，理由是拖欠洞窟租金。',
    bottom:
      '王国新税法或地契规定：囤积的古金币需登记纳税或充公，龙的「财富」无法变现成流通货币，实际上交不起合法租金。',
  },
  {
    id: 'fantasy-blue-potion',
    categoryId: 'fantasy',
    title: '蓝色聪明药',
    description: '女巫说蓝色药水喝了变聪明，为什么牙齿变蓝了却不见更聪明？',
    difficulty: 'easy',
    surface:
      '女巫推销蓝色药水，称喝了变聪明。勇士喝下后牙齿变蓝，智商没变化。',
    bottom:
      '药水只是食用色素加安慰剂，「变蓝」是字面染色效果，女巫在清库存忽悠人。',
  },
  {
    id: 'fantasy-frog-kiss',
    categoryId: 'fantasy',
    title: '不想变王子',
    description: '公主吻了青蛙，青蛙没变王子，她为什么还很高兴？',
    difficulty: 'medium',
    surface:
      '公主吻了青蛙，青蛙没有变成王子，公主却很高兴。',
    bottom:
      '她本来就想要一只会说话的小宠物青蛙，根本不想嫁给陌生人；没变王子正合她意。',
  },
  {
    id: 'fantasy-elf-renew',
    categoryId: 'fantasy',
    title: '千年一换',
    description: '精灵千年一度蜕去旧我获得新生，保险公司拒赔「死亡」的理由可能是什么？',
    difficulty: 'hard',
    surface:
      '精灵每千年会「蜕去旧我」获得新生，保险公司拒绝为「死亡」理赔，理由是什么？',
    bottom:
      '保单认定同一连续人格才算同一被保险人；千年后记忆与人格重置，法律上视为新个体，旧合同对「新精灵」不适用。',
  },
  // —— 悬疑犯罪 ×5 ——
  {
    id: 'crime-poison-rim',
    categoryId: 'crime',
    title: '一壶茶',
    description: '同一壶茶，一人猝死、一人无恙，茶和壶都检不出毒，毒可能在哪？',
    difficulty: 'medium',
    surface:
      '侦探与友人在办公室喝同一壶茶，友人猝死，侦探无恙。茶与壶均无毒检测结果。',
    bottom:
      '毒涂在死者惯用那只杯子的杯口内侧，只有他嘴唇碰到；侦探用的是另一只杯子。',
  },
  {
    id: 'crime-ice-lock',
    categoryId: 'crime',
    title: '从内反锁的窗',
    description: '窗户从里面锁上像自杀密室，侦探为什么仍断定是他杀？',
    difficulty: 'hard',
    surface:
      '高层办公室命案，窗户从内侧锁上，像自杀。侦探却断定他杀。',
    bottom:
      '凶手离开时用冰块或低温物体撑住插销，冰块融化后插销落下锁上，制造密室假象。',
  },
  {
    id: 'crime-loop-stream',
    categoryId: 'crime',
    title: '直播里的劫匪',
    description: '有整夜游戏直播当不在场证明，为什么还能和抢劫案扯上关系？',
    difficulty: 'medium',
    surface:
      '嫌疑人有整夜游戏直播的不在场证明，却仍被认定与同刻发生的便利店抢劫有关。',
    bottom:
      '直播画面是事先录好循环播放，本人中途溜出去作案再回来，观众以为是实时。',
  },
  {
    id: 'crime-twin-life',
    categoryId: 'crime',
    title: '替身的三年',
    description: '有人顶替死者生活三年几乎不露馅，什么环节会让他暴露？',
    difficulty: 'easy',
    surface:
      '某人死后，有人顶替他的身份生活三年几乎没露馅，直到一次体检暴露。',
    bottom:
      '顶替者是同卵双胞胎，相貌指纹极度相似，迁居后社交圈窄；最终因 DNA 或重大医疗记录与死者档案不符而败露。',
  },
  {
    id: 'crime-shoes-mark',
    categoryId: 'crime',
    title: '没拍到脸',
    description: '监控没拍到劫匪正脸，司机凭什么认定就是车上那个人？',
    difficulty: 'easy',
    surface:
      '公交车抢劫案监控没拍到劫匪正脸，司机却肯定指认车上某位乘客。',
    bottom:
      '司机记住了对方独特的鞋款、磨损痕迹或站姿习惯，与下车后被搜出的物证对应，并非单靠面部。',
  },
  // —— 温情治愈 ×5 ——
  {
    id: 'warm-thick-quilt',
    categoryId: 'heartwarming',
    title: '夏天的厚被子',
    description: '大夏天还盖厚棉被，老人为什么说这样才心里踏实？',
    difficulty: 'medium',
    surface:
      '酷暑里老人仍盖厚棉被，儿女担心中暑，老人却说这样心里才踏实。',
    bottom:
      '棉被是已故老伴生前最后缝的一床，抱着它就像老伴还在身边，是情感寄托而非真的怕冷。',
  },
  {
    id: 'warm-bitter-tea',
    categoryId: 'heartwarming',
    title: '很苦的茶',
    description: '女儿总泡很苦的茶，失智的母亲为什么喝得最香？',
    difficulty: 'easy',
    surface:
      '女儿总给失智母亲泡很苦的茶，母亲却喝得最香。',
    bottom:
      '母亲混乱的记忆里，童年家乡只有苦茶才是「家的味道」；甜茶她反而不认，女儿顺着她的记忆来泡。',
  },
  {
    id: 'warm-extra-setting',
    categoryId: 'heartwarming',
    title: '多摆的一副碗筷',
    description: '每天多摆一副碗筷还给空位夹菜，为什么没人觉得瘆得慌？',
    difficulty: 'medium',
    surface:
      '家里每天晚饭多摆一副碗筷，对着空位夹菜，却没有人觉得瘆人。',
    bottom:
      '那是给早逝或远行的家人留的习惯，代表「等你回家吃饭」，全家心照不宣地纪念与等待。',
  },
  {
    id: 'warm-wrong-route',
    categoryId: 'heartwarming',
    title: '坐反的公交',
    description: '盲人老人常坐反方向的公交，司机认得他，为什么从不提醒？',
    difficulty: 'easy',
    surface:
      '盲人老人常坐反方向的公交车，司机认出他却从不提醒他下错站。',
    bottom:
      '老人终点是墓园看望老伴，那条「绕远」的线路或方向对他才是正确的心理旅程，司机默默配合。',
  },
  {
    id: 'warm-small-raincoat',
    categoryId: 'heartwarming',
    title: '多带的小雨衣',
    description: '孩子已经不在身边了，父亲雨夜出门为什么仍多带一件儿童雨衣？',
    difficulty: 'hard',
    surface:
      '父亲雨夜出门总多带一件儿童雨衣，孩子早已不在身边，他仍不改习惯。',
    bottom:
      '孩子夭折或离家多年，父亲保留当年准备接孩子的习惯，空雨衣是未完成的爱的仪式，自我疗愈的方式。',
  },
  // —— 日常之谜 ×5 ——
  {
    id: 'daily-elevator-job',
    categoryId: 'daily',
    title: '从不按键的人',
    description: '她乘电梯几乎不按自己要去的楼层，为什么总能准时到办公室？',
    difficulty: 'easy',
    surface:
      '她每天乘电梯几乎不按自己要去的楼层，却总能准时出现在该到的办公室。',
    bottom:
      '她是电梯维保或质检人员，按固定巡检程序乘梯，「该到的楼层」是检查点而非普通通勤。',
  },
  {
    id: 'daily-cake-scoop',
    categoryId: 'daily',
    title: '被挖走的蛋糕',
    description: '生日蛋糕中间被挖走一大块，寿星为什么反而特别开心？',
    difficulty: 'medium',
    surface:
      '生日蛋糕中间被挖走一大块，寿星看到后反而特别开心。',
    bottom:
      '寿星患糖尿病等不能多吃，家人事先挖走大部分代吃，留下祝福字条或惊喜内馅，是体贴的安排。',
  },
  {
    id: 'daily-tow-truck',
    categoryId: 'daily',
    title: '一路闯红灯',
    description: '一路经过许多红灯却没被扣分罚款，这是怎么回事？',
    difficulty: 'easy',
    surface:
      '某人「开车」经过许多路口都闯红灯，却没有被扣分罚款。',
    bottom:
      '车故障被拖车拖行，他坐在副驾驶或车内但不是驾驶员，红灯责任不在他；或婚车车队警车开道等特殊通行。',
  },
  {
    id: 'daily-no-beep',
    categoryId: 'daily',
    title: '空着手出门',
    description: '双手空空出门警报没响，小票上为什么买了一大堆东西？',
    difficulty: 'medium',
    surface:
      '他双手空空走出超市感应门，警报没响，小票显示买了不少东西。',
    bottom:
      '商品是线上下单门店自提或已扫码的电子小票，货品由店员递出，他手上本来就没有未消磁的实物。',
  },
  {
    id: 'daily-fridge-night',
    categoryId: 'daily',
    title: '半夜的厨房',
    description: '合租屋半夜总有冰箱门开合声，室友守着为什么逮不到人？',
    difficulty: 'easy',
    surface:
      '合租屋半夜总有冰箱门开合声，室友蹲守却逮不到人。',
    bottom:
      '室友养的宠物（如大型犬）会扒门开冰箱偷吃，或冰箱门封条老化自动弹开又合上。',
  },
  // —— 心理谜题 ×5 ——
  {
    id: 'psych-diary-therapy',
    categoryId: 'psychological',
    title: '杀人日记',
    description: '日记里写满「我今天又杀了人」，心理医生为什么不报警还照常接诊？',
    difficulty: 'medium',
    surface:
      '患者交给心理医生的日记里写满「我今天又杀了一个人」，医生却照常治疗不报警。',
    bottom:
      '这是暴露或书写疗法：把强迫性冲动与幻想写下来以降低焦虑，并非真实杀人记录。',
  },
  {
    id: 'psych-same-face',
    categoryId: 'psychological',
    title: '同一张脸',
    description: '为什么有一段时间，他觉得路上每个陌生人都长着同一张脸？',
    difficulty: 'hard',
    surface:
      '有一段时间，他觉得路上每个陌生人都长着同一张脸。',
    bottom:
      '可能为脸盲症、解离症状或焦虑引发的知觉扭曲，需医学评估；并非世界真的换了脸。',
  },
  {
    id: 'psych-stairs-one-more',
    categoryId: 'psychological',
    title: '多一阶楼梯',
    description: '他数的楼梯阶数为什么永远比图纸上标的多一阶？',
    difficulty: 'easy',
    surface:
      '他数从一楼到二楼的台阶，永远比建筑图纸上标的多一阶。',
    bottom:
      '他把「踏上二楼平台的那一步」也算进「台阶」里，计数习惯与图纸定义不一致。',
  },
  {
    id: 'psych-tree-drawing',
    categoryId: 'psychological',
    title: '树上的爸爸妈妈',
    description: '孩子画「爸爸妈妈挂在树上」，画的到底是什么让老师差点报警？',
    difficulty: 'medium',
    surface:
      '幼儿园孩子画「爸爸妈妈挂在树上」，老师差点报警，家长解释后哭笑不得。',
    bottom:
      '画的是苹果（或果子）长在树上，父母在树下摘果，姿态被误读成「吊着」。',
  },
  {
    id: 'psych-inner-voice',
    categoryId: 'psychological',
    title: '录不到的骂声',
    description: '脑子里有人骂自己听得清清楚楚，为什么手机录不下来？',
    difficulty: 'hard',
    surface:
      '他脑子里总有声音骂自己，用手机录音却什么都录不到。',
    bottom:
      '那是内在言语或思维鸣响，并非空气中传播的声波，录音设备无法拾取「脑内声音」。',
  },
]

export const STORIES = stories

export function getStoryById(id: string): TStory | undefined {
  return stories.find((s) => s.id === id)
}

export function getStoriesByCategoryId(categoryId: string): TStory[] {
  return stories.filter((s) => s.categoryId === categoryId)
}
