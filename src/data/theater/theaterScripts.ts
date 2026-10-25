/**
 * 全 144 课情景剧场剧本数据
 *
 * 由课文逐课解析编写：人物（cast）、地点（place/bg）、事件（story）、画风（style）、
 * 预计时长（estimateSeconds 按台词词数计算）、逐句动作（lines，与课文段落一一对应）。
 *
 * 课型：
 *   dialogue  叙事对话剧——具体人物在具体地点演出情节
 *   narrative 旁白短文剧——"说书人"朗读课文（key='N'），配合场景背景
 *   drill     句型操练——展示台模式，主持人逐句讲解（key='A'）
 *
 * 场景背景模板（bg，由 TheaterStage 渲染）：
 *   street 街道 / classroom 教室 / home 客厅卧室 / kitchen 厨房 / shop 商店 /
 *   park 公园河畔 / station 车站 / office 办公室 / stage 展示台
 *
 * 动作集（action）：talk 说话 / point 指示 / raise 举起 / wave 挥手 /
 *   nod 点头 / shake 摇头 / none 无
 */
import type { FigureSpec } from '../../components/theater/PaperFigure';

export type BgId =
  | 'street'
  | 'classroom'
  | 'home'
  | 'kitchen'
  | 'shop'
  | 'park'
  | 'station'
  | 'office'
  | 'stage'
  | 'train'
  | 'bus'
  | 'airport'
  | 'night'
  | 'living'
  | 'river';

export type LessonType = 'dialogue' | 'narrative' | 'drill';
/**
 * walkin/walkout：角色走入/走出画面（整组平移动画，说话状态独立生效）；
 * smile/angry/sad/surprised：表情动作（眉+嘴形，持续到下一动作）
 */
export type LineAction =
  | 'talk'
  | 'point'
  | 'raise'
  | 'wave'
  | 'nod'
  | 'shake'
  | 'none'
  | 'walkin'
  | 'walkout'
  | 'smile'
  | 'angry'
  | 'sad'
  | 'surprised';

/** 镜头基调：wide 全景定场 / medium 中景跟说话者 / close 特写 */
export type ShotKind = 'wide' | 'medium' | 'close';

/** 天气特效：rain 雨丝+雨声 / wind 风线+风声 / thunder 乌云闪电+雷声 / sun 暖阳（无声） */
export type WeatherKind = 'rain' | 'wind' | 'thunder' | 'sun';

/** 舞台留存物品：台词讲到的物品出现在场景中，讲完留存原地（底锚摆放、真实比例） */
export interface StageItemEntry {
  /** 触发句：该句起物品出现并留存 */
  line: number;
  item:
    | 'box' | 'shoes' | 'window' | 'door' | 'teapot' | 'bookcase' | 'book'
    | 'clock' | 'table' | 'desk' | 'chair' | 'armchair' | 'bed' | 'wardrobe' | 'cupboard'
    | 'television' | 'radio' | 'lamp' | 'stereo' | 'fridge'
    | 'milk' | 'beer' | 'wine' | 'bottle' | 'tea' | 'coffee' | 'kettle' | 'glass' | 'plate' | 'dish'
    | 'bread' | 'cake' | 'chocolate' | 'biscuit' | 'cheese' | 'jam' | 'butter' | 'sugar' | 'apple'
    | 'letter' | 'ticket' | 'passport' | 'money'
    | 'coat' | 'blouse'
    | 'dog' | 'cat' | 'bird'
    | 'car' | 'train' | 'ship' | 'flower' | 'soap'
    | 'tie' | 'cup' | 'pencil' | 'hammer' | 'suitcase' | 'hat' | 'shirt'
    | 'bag' | 'photo' | 'newspaper'
    | 'swimmer' | 'aeroplane' | 'sleeping' | 'basin';
  /** 物品高度（世界 px，人物高约 418——箱子 150 门 300 等，做真实比例） */
  size: number;
  /** 摆放 x（底部中心；需避开人物站位 330/560/620/800/1060/1270 ±90） */
  x: number;
  /** 摆放 y（底部；地面物 830 左右，墙上物 620-660） */
  y: number;
  /** 跑动/游动动画方向（1 向右 -1 向左）：狗追猫、游泳横渡等动态物品 */
  run?: 1 | -1;
  /** 色相旋转角度（deg）：颜色教学物品按课文颜色调色（如绿帽子 hue=-83） */
  hue?: number;
  /** 亮度系数（0-1）：黑色物品用 brightness 压暗 */
  brightness?: number;
}

export interface LessonScriptV2 {
  id: number;
  /** 剧名 */
  scene: string;
  /** 地点（中文） */
  place: string;
  bg: BgId;
  type: LessonType;
  /** 事件梗概（一句话） */
  story: string;
  /** 人物表：[台词key, 姓名, 角色原型] */
  cast: Array<[string, string, string]>;
  /** 逐句动作：`key:action|key:action|...`，句数与课文段落一致 */
  lines: string;
  /** 画风（默认 paper 纸片描边卡通） */
  style?: string;
}

/**
 * 分场（v3）：剧情推进时切换背景/地点/在场角色，播放跨场时背景交叉淡变。
 * from = 该场起始句序号（升序，首场应为 0）；bg/place 缺省沿用课级；
 * present = 在场 cast key（缺省=全部在场，用于角色中途上场/退场）。
 * 未编排分场的课 = 单场（全课一个背景），渲染零差异。
 */
export interface ScriptScene {
  from: number;
  bg?: BgId;
  place?: string;
  present?: string[];
  /** 该场镜头基调（缺省 medium：说话推近、待机全景） */
  shot?: ShotKind;
}

/**
 * 分场编排表：特殊编排课（背景切换 / 角色进出 / 特写高点 / 走位）。
 * 未列出的课由 scenes.ts 按课型生成默认镜头节奏：
 *   dialogue/drill = 开场全景定场 → 对白中景；narrative = 全景。
 * 编排依据：逐课通读课文，在情节转折句（Come in / Let's go into the living room /
 * Everyone's in the garden 等自带转场语义处）切场，在情绪高点句（Be careful! /
 * Hurry up! / 检票冲突）上特写。
 */
export const SCRIPT_SCENES: Record<number, ScriptScene[]> = {
  // L13 新连衣裙：客厅→楼上看裙（Come upstairs 自带转场）
  13: [
    { from: 0, bg: 'home', place: '客厅', shot: 'wide' },
    { from: 4, bg: 'home', place: '楼上看新裙', shot: 'medium' },
  ],
  // L31 花园里的萨莉：句 5 蒂姆应答上场（walkin 到右侧树下），句 6 起举手爬树
  31: [
    { from: 0, bg: 'park', place: '花园', shot: 'wide', present: ['J', 'K'] },
    { from: 5, bg: 'park', place: '花园·蒂姆爬树', shot: 'medium' },
  ],
  // L34 他们在做什么：群体轮换——句0 孩子睡了（床上睡人）/句2 男人们上场交谈/句4 女人洗衣/句6 狗跑
  34: [
    { from: 0, bg: 'stage', place: '展示台·孩子们睡了', shot: 'wide', present: ['A', 'B'] },
    { from: 2, bg: 'stage', place: '展示台·男人们交谈', shot: 'wide', present: ['A', 'B', 'M1', 'M2'] },
    { from: 4, bg: 'stage', place: '展示台·洗衣服', shot: 'wide', present: ['A', 'B'] },
    { from: 6, bg: 'stage', place: '展示台·狗在跑', shot: 'wide', present: ['A', 'B'] },
  ],
  // L39 别摔了！：花瓶易碎，[6] Be careful! 起特写盯着花瓶
  39: [
    { from: 0, bg: 'home', place: '客厅', shot: 'wide' },
    { from: 6, bg: 'home', place: '花瓶危机', shot: 'close' },
    { from: 9, bg: 'home', place: '放上架子', shot: 'medium' },
  ],
  // L41 彭妮的包：[4] 起逐样报食品，中景看食物清单
  41: [
    { from: 0, bg: 'kitchen', place: '厨房', shot: 'wide' },
    { from: 4, bg: 'kitchen', place: '看看包里有什么', shot: 'medium' },
  ],
  // L43 快点！：[16] Hurry up / 水开 特写
  43: [
    { from: 0, bg: 'kitchen', place: '厨房·烧水', shot: 'wide' },
    { from: 16, bg: 'kitchen', place: '水开了！', shot: 'close' },
  ],
  // L45 老板的信：老板办公室→隔壁 Pamela 办公室（BOB 过去，老板不在场）
  45: [
    { from: 0, bg: 'office', place: '老板办公室', shot: 'wide', present: ['B', 'O'] },
    { from: 8, bg: 'office', place: '隔壁·Pamela 的办公室', shot: 'medium', present: ['O', 'P'] },
  ],
  // L55 索耶一家的一天：家→出门→家务→下午茶→傍晚回家（时间流转）
  55: [
    { from: 0, bg: 'home', place: '清晨·国王街 87 号', shot: 'wide' },
    { from: 1, bg: 'street', place: '早晨·出门上班上学', shot: 'wide' },
    { from: 3, bg: 'home', place: '上午·家务', shot: 'wide' },
    { from: 6, bg: 'park', place: '下午·与朋友喝茶', shot: 'wide' },
    { from: 8, bg: 'night', place: '傍晚至夜晚·一家人', shot: 'wide' },
  ],
  // L57 不寻常的一天：步行上学→妈妈购物→花园→夜读（时钟驱动）
  57: [
    { from: 0, bg: 'street', place: '八点·步行上学', shot: 'wide' },
    { from: 2, bg: 'shop', place: '十点·商店', shot: 'wide' },
    { from: 4, bg: 'park', place: '下午·花园茶会', shot: 'wide' },
    { from: 13, bg: 'night', place: '九点·夜读', shot: 'wide' },
  ],
  // L61 重感冒：客厅担忧→医生到床边检查（医生走入）
  61: [
    { from: 0, bg: 'home', place: '客厅·父母担忧', shot: 'wide', present: ['F', 'M'] },
    { from: 10, bg: 'home', place: '卧室·医生检查', shot: 'medium', present: ['D', 'F', 'M'] },
  ],
  // L63 谢谢医生：楼下→上楼进卧室（Come upstairs 自带转场）
  63: [
    { from: 0, bg: 'home', place: '楼下·门口', shot: 'wide' },
    { from: 4, bg: 'home', place: '楼上·卧室', shot: 'medium' },
  ],
  // L69 汽车比赛：赛场外→比赛→回家路上
  69: [
    { from: 0, bg: 'street', place: '赛场外·人山人海', shot: 'wide' },
    { from: 7, bg: 'stage', place: '赛道·二十辆赛车', shot: 'wide' },
    { from: 13, bg: 'street', place: '回家路上', shot: 'medium' },
  ],
  // L81 烤牛肉：客厅等汤姆→汤姆下楼（Tom 走入）
  81: [
    { from: 0, bg: 'home', place: '餐厅·萨姆来访', shot: 'wide', present: ['S', 'C'] },
    { from: 8, bg: 'home', place: '汤姆下楼', shot: 'medium', present: ['S', 'C', 'T'] },
  ],
  // L83 度假：餐桌午餐→客厅收拾行李（Let's go into the living room 自带转场）
  83: [
    { from: 0, bg: 'kitchen', place: '餐厅·午餐', shot: 'wide' },
    { from: 11, bg: 'home', place: '客厅·打包行李', shot: 'medium' },
  ],
  // L89 待售：门前咨询→进屋看房（Come in 自带转场）
  89: [
    { from: 0, bg: 'street', place: '住宅门前', shot: 'wide' },
    { from: 5, bg: 'home', place: '屋内看房', shot: 'medium' },
  ],
  // L95 车站：售票→隔壁酒吧→检票口（同景三场表时间流逝；[13] 起检票冲突特写）
  95: [
    { from: 0, bg: 'station', place: '售票窗口', shot: 'medium' },
    { from: 6, bg: 'station', place: '隔壁酒吧', shot: 'wide' },
    { from: 13, bg: 'station', place: '检票口·冲突', shot: 'close' },
  ],
  // L115 敲敲门：屋前敲门没人→发现大家在后花园（Everyone's in the garden）
  115: [
    { from: 0, bg: 'home', place: '屋前·敲门', shot: 'wide', present: ['H', 'J'] },
    { from: 11, bg: 'park', place: '后花园·午餐聚会', shot: 'wide', present: ['H', 'J', 'C', 'T'] },
  ],
  // L117 汤米的早餐：餐厅吞硬币→洗衣发现（Later that morning 时间推移）
  117: [
    { from: 0, bg: 'home', place: '清晨·餐厅', shot: 'wide' },
    { from: 6, bg: 'kitchen', place: '上午·洗衣', shot: 'wide' },
  ],
  // L119 真实的故事：床上夜读→小偷进厨房→下楼开灯（三场悬疑）
  119: [
    { from: 0, bg: 'night', place: '卧室·夜读', shot: 'wide' },
    { from: 3, bg: 'kitchen', place: '厨房·黑影潜入', shot: 'wide' },
    { from: 8, bg: 'home', place: '楼下·开灯查看', shot: 'wide' },
  ],
  // L129 七十英里：路边对话→警察上前（警察走入）
  129: [
    { from: 0, bg: 'street', place: '公路边', shot: 'wide', present: ['A', 'G'] },
    { from: 4, bg: 'street', place: '警察上前', shot: 'medium', present: ['A', 'G', 'P'] },
  ],
  // L133 轰动新闻：机场围访→街头买报读报（Let's buy a newspaper 自带转场）
  133: [
    { from: 0, bg: 'airport', place: '机场·记者围访', shot: 'medium', present: ['R', 'M'] },
    { from: 7, bg: 'street', place: '街头·读报', shot: 'wide', present: ['K', 'L'] },
  ],
};

/** 每课句级天气触发：台词谈到 wind/rain/snow/sun 时天空出形象+音效，帮孩子"听见即所见" */
export const SCRIPT_WEATHER: Record<number, Array<WeatherKind | undefined>> = {
  // L33 晴天：阳光全程
  33: Array.from({ length: 10 }, () => 'sun'),
  // L51 宜人的气候：谈到 windy/rains/hot 的句子触发对应天气
  51: [
    undefined, undefined, undefined, undefined,
    undefined, 'wind', 'rain', undefined,
    'sun', 'sun', undefined, undefined,
    undefined, undefined, undefined, undefined,
  ],
  // L53 有趣的气候：windy→风 / wet→雨 / sun rises→晴
  53: [
    undefined, undefined, 'wind', 'rain',
    undefined, undefined, undefined, 'sun',
    'sun', undefined, undefined, undefined,
    undefined, undefined,
  ],
  // L85 巴黎之春：[11] It rained all the time 起下雨（聊的就是那场雨）
  85: [
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, 'rain', 'rain', 'rain',
  ],
  // L119 真实的故事：[4] 黑暗中打手电→雷雨夜氛围（thunder 只闪不循环）
  119: [undefined, undefined, undefined, undefined, 'thunder', 'thunder', 'thunder'],
};

/**
 * 舞台留存物品编排：台词讲到的物品随句出现在场景中（讲完留存原地）。
 * x 必须避开该课人物站位（2 人 560/1060、3 人 400/800/1200、4 人 330/620/980/1270 ±90）；
 * y：地面物 830-845，墙上物（窗/门/挂画）620-660。
 * size = 物品高度（人物高约 418）：door 300、bookcase 260、box 150、teapot 60、shoes 36。
 */
export const SCRIPT_STAGE_ITEMS: Record<number, StageItemEntry[]> = {
  // L20 大小与开合：大箱子×2 / 小鞋 / 开着的窗 / 关着的门（尺寸对比是本课教学点）
  20: [
    { line: 0, item: 'box', size: 150, x: 690, y: 845 },
    { line: 0, item: 'box', size: 126, x: 800, y: 842 },
    { line: 2, item: 'shoes', size: 36, x: 950, y: 838 },
    { line: 4, item: 'window', size: 220, x: 760, y: 645 },
    { line: 6, item: 'door', size: 300, x: 1300, y: 662 },
  ],
  // L3 寄存处：外套 + 票（伞已手持）
  3: [
    { line: 0, item: 'coat', size: 120, x: 1420, y: 838 },
    { line: 1, item: 'ticket', size: 30, x: 1330, y: 845 },
  ],
  // L12 展示台：手提包 / 小汽车 / 领带 / 女衬衫 逐一出现
  12: [
    { line: 0, item: 'bag', size: 90, x: 200, y: 838 },
    { line: 2, item: 'car', size: 170, x: 1300, y: 838 },
    { line: 4, item: 'tie', size: 90, x: 500, y: 788 },
    { line: 6, item: 'blouse', size: 70, x: 1000, y: 788 },
  ],
  // L13 新裙子：帽子（课文 It's green——色相调绿）
  13: [{ line: 8, item: 'hat', size: 60, x: 1350, y: 838, hue: -83 }],
  // L14 颜色操练：白衬衫 / 黑外套（展示台）
  14: [
    { line: 0, item: 'shirt', size: 90, x: 400, y: 788 },
    { line: 2, item: 'coat', size: 120, x: 1000, y: 786 },
  ],
  // L15 海关：护照（箱子已手持）
  15: [{ line: 5, item: 'passport', size: 40, x: 1300, y: 838 }],
  // L24 展示台：杯子 / 书桌（杯放桌上）/ 瓶子 / 餐桌
  24: [
    { line: 0, item: 'cup', size: 48, x: 400, y: 788 },
    { line: 2, item: 'desk', size: 130, x: 790, y: 790 },
    { line: 2, item: 'cup', size: 44, x: 790, y: 712 },
    { line: 5, item: 'bottle', size: 90, x: 930, y: 788 },
    { line: 7, item: 'table', size: 160, x: 1350, y: 810 },
  ],
  // L26 东西在哪里：书包（笔在包里）/ 椅子+椅下书（杯瓶桌背景已有）
  26: [
    { line: 4, item: 'bag', size: 90, x: 1200, y: 838 },
    { line: 6, item: 'chair', size: 120, x: 330, y: 838 },
    { line: 6, item: 'book', size: 46, x: 330, y: 842 },
  ],
  // L28 卧室：收音机+书上 / 扶手椅 / 桌（挂画背景已有）
  28: [
    { line: 1, item: 'radio', size: 90, x: 1440, y: 840 },
    { line: 1, item: 'book', size: 44, x: 1440, y: 782 },
    { line: 4, item: 'table', size: 140, x: 800, y: 842 },
    { line: 4, item: 'armchair', size: 130, x: 1330, y: 840 },
  ],
  // L29 整理卧室：门 / 床 / 衣柜 / 梳妆台（窗背景已有）
  29: [
    { line: 1, item: 'door', size: 300, x: 180, y: 668 },
    { line: 5, item: 'wardrobe', size: 240, x: 1420, y: 840 },
    { line: 6, item: 'bed', size: 140, x: 200, y: 842 },
    { line: 7, item: 'desk', size: 150, x: 830, y: 842 },
  ],
  // L30 我该做什么：窗 / 茶壶 / 杯 / 书桌 / 书 / 鞋 / 铅笔 / 电视 / 灯
  30: [
    { line: 1, item: 'window', size: 200, x: 250, y: 650 },
    { line: 3, item: 'desk', size: 110, x: 770, y: 788 },
    { line: 6, item: 'teapot', size: 58, x: 200, y: 840 },
    { line: 6, item: 'cup', size: 48, x: 280, y: 788 },
    { line: 7, item: 'book', size: 46, x: 900, y: 838 },
    { line: 8, item: 'shoes', size: 34, x: 1200, y: 836 },
    { line: 8, item: 'pencil', size: 46, x: 1260, y: 790 },
    { line: 9, item: 'television', size: 130, x: 1400, y: 790 },
    { line: 10, item: 'lamp', size: 130, x: 80, y: 815 },
  ],
  // L31 花园里：狗追猫（跑动动画，狗在猫身后追）
  31: [
    { line: 12, item: 'dog', size: 90, x: 600, y: 842, run: 1 },
    { line: 13, item: 'cat', size: 80, x: 1150, y: 842, run: 1 },
  ],
  // L33 河上景：男孩游泳横渡（boat/ship/飞机背景已有）
  33: [{ line: 7, item: 'swimmer', size: 55, x: 700, y: 790, run: 1 }],
  // L32 展示台：信 / 书橱 / 书 / 面包 / 跑步的它
  32: [
    { line: 1, item: 'letter', size: 35, x: 300, y: 788 },
    { line: 3, item: 'bookcase', size: 200, x: 1300, y: 810 },
    { line: 7, item: 'book', size: 46, x: 640, y: 788 },
    { line: 9, item: 'bread', size: 45, x: 500, y: 788 },
    { line: 11, item: 'dog', size: 90, x: 1000, y: 805, run: 1 },
  ],
  // L34 展示台：床上睡着的孩子 / 洗衣盆 / 跑动的狗（They are running → 跑动动画）
  34: [
    { line: 0, item: 'sleeping', size: 90, x: 115, y: 810 },
    { line: 4, item: 'basin', size: 45, x: 480, y: 842 },
    { line: 6, item: 'dog', size: 90, x: 760, y: 805, run: 1 },
  ],
  // L35 村庄照：照片立在地面 / 河里游泳横渡的男孩
  35: [
    { line: 0, item: 'photo', size: 70, x: 1250, y: 842 },
    { line: 7, item: 'swimmer', size: 55, x: 500, y: 800, run: 1 },
  ],
  // L38 展示台：书橱 / 音响 / 一摞盘子
  38: [
    { line: 6, item: 'bookcase', size: 200, x: 1300, y: 810 },
    { line: 8, item: 'stereo', size: 110, x: 420, y: 788 },
    { line: 10, item: 'dish', size: 40, x: 650, y: 788 },
  ],
  // L37 粉红色的书橱：[3] 乔治正在做的书橱（大件，锤子手持）
  37: [{ line: 3, item: 'bookcase', size: 260, x: 1350, y: 700 }],
  // L39 花瓶风波：餐桌 / 花盆 / 放花瓶的书橱（窗背景已有，花瓶手持）
  39: [
    { line: 1, item: 'table', size: 160, x: 200, y: 842 },
    { line: 9, item: 'bookcase', size: 200, x: 1420, y: 810 },
    { line: 12, item: 'flower', size: 100, x: 760, y: 840 },
  ],
  // L40 展示台：锤子 / 花盆 / 信
  40: [
    { line: 0, item: 'hammer', size: 60, x: 300, y: 788 },
    { line: 2, item: 'flower', size: 100, x: 660, y: 788 },
    { line: 4, item: 'letter', size: 35, x: 1000, y: 790 },
  ],
  // L41 彭妮的购物袋：倒出来的食物清单（袋手持，前后两排摆放）
  41: [
    { line: 2, item: 'chair', size: 120, x: 1430, y: 838 },
    { line: 4, item: 'cheese', size: 30, x: 700, y: 815 },
    { line: 5, item: 'bread', size: 35, x: 790, y: 815 },
    { line: 6, item: 'soap', size: 30, x: 875, y: 815 },
    { line: 7, item: 'chocolate', size: 25, x: 720, y: 845 },
    { line: 8, item: 'milk', size: 90, x: 300, y: 840 },
    { line: 9, item: 'sugar', size: 55, x: 1220, y: 842 },
    { line: 10, item: 'coffee', size: 60, x: 1290, y: 843 },
    { line: 11, item: 'tea', size: 60, x: 1360, y: 843 },
  ],
  // L42 展示台：护照 / 苹果放桌上（牛奶没有——本课教学点；黄油在厨房不出现）
  42: [
    { line: 1, item: 'table', size: 160, x: 1350, y: 800 },
    { line: 0, item: 'passport', size: 40, x: 400, y: 790 },
    { line: 6, item: 'apple', size: 50, x: 1350, y: 640 },
  ],
  // L43 沏茶：水壶 / 茶壶 / 茶叶 / 碗柜（杯子背景已有）
  43: [
    { line: 2, item: 'kettle', size: 70, x: 780, y: 842 },
    { line: 5, item: 'teapot', size: 60, x: 870, y: 843 },
    { line: 8, item: 'tea', size: 60, x: 700, y: 844 },
    { line: 12, item: 'cupboard', size: 170, x: 1400, y: 830 },
  ],
  // L44 有没有：牛奶瓶 / 碗柜 / 茶壶
  44: [
    { line: 0, item: 'milk', size: 90, x: 1400, y: 840 },
    { line: 3, item: 'cupboard', size: 170, x: 300, y: 830 },
    { line: 4, item: 'teapot', size: 60, x: 1200, y: 840 },
  ],
  // L46 展示台：桌子 / 信
  46: [
    { line: 0, item: 'table', size: 150, x: 300, y: 810 },
    { line: 4, item: 'letter', size: 35, x: 880, y: 790 },
  ],
  // L47 黑咖啡：糖 / 饼干 / 牛奶（咖啡=手中杯子）
  47: [
    { line: 4, item: 'sugar', size: 55, x: 1240, y: 842 },
    { line: 6, item: 'milk', size: 90, x: 1300, y: 840 },
    { line: 10, item: 'biscuit', size: 40, x: 1420, y: 844 },
  ],
  // L48 展示台：啤酒 / 玻璃杯 / 葡萄酒
  48: [
    { line: 0, item: 'beer', size: 78, x: 340, y: 790 },
    { line: 2, item: 'glass', size: 56, x: 420, y: 790 },
    { line: 4, item: 'wine', size: 92, x: 1300, y: 788 },
  ],
  // L55 索耶一家：茶 / 床 / 报纸（电视背景已有）
  55: [
    { line: 7, item: 'tea', size: 60, x: 1350, y: 842 },
    { line: 13, item: 'bed', size: 140, x: 200, y: 842 },
    { line: 14, item: 'newspaper', size: 50, x: 1240, y: 842 },
  ],
  // L56 展示台：电视
  56: [{ line: 4, item: 'television', size: 130, x: 1300, y: 790 }],
  // L57 一天作息：挂钟 / 茶 / 床 / 报纸 / 书（汽车不开进客厅，属出行描述）
  57: [
    { line: 0, item: 'clock', size: 90, x: 1020, y: 600 },
    { line: 5, item: 'tea', size: 60, x: 1350, y: 842 },
    { line: 11, item: 'bed', size: 140, x: 200, y: 842 },
    { line: 14, item: 'newspaper', size: 50, x: 1240, y: 842 },
    { line: 16, item: 'book', size: 46, x: 1150, y: 842 },
  ],
  // L58 展示台：立式钟（教时间）
  58: [{ line: 0, item: 'clock', size: 110, x: 400, y: 788 }],
  // L59 文具店：信封 / 胶水瓶 / 粉笔盒
  59: [
    { line: 0, item: 'letter', size: 35, x: 1420, y: 842 },
    { line: 10, item: 'bottle', size: 90, x: 1240, y: 840 },
    { line: 11, item: 'box', size: 100, x: 1330, y: 838 },
  ],
  // L61 吉姆生病：床上有吉姆（He's in bed——3 人场，床在最右）
  61: [{ line: 1, item: 'sleeping', size: 140, x: 1500, y: 838 }],
  // L63 康复：床上有吉姆（must stay in bed）
  63: [{ line: 0, item: 'sleeping', size: 140, x: 1500, y: 838 }],
  // L64 展示台：床
  64: [{ line: 2, item: 'bed', size: 140, x: 270, y: 805 }],
  // L65 前门钥匙：前门（钥匙手持）
  65: [{ line: 4, item: 'door', size: 300, x: 1500, y: 662 }],
  // L66 展示台：立式钟
  66: [{ line: 0, item: 'clock', size: 110, x: 400, y: 788 }],
  // L69 汽车大赛：赛车 ×2
  69: [
    { line: 7, item: 'car', size: 150, x: 1130, y: 838 },
    { line: 8, item: 'car', size: 130, x: 1490, y: 842 },
  ],
  // L71 打电话：信（钟属时刻表述）
  71: [{ line: 6, item: 'letter', size: 35, x: 1330, y: 842 }],
  // L73 问路：短语手册
  73: [{ line: 10, item: 'book', size: 46, x: 1200, y: 842 }],
  // L74 展示台：蛋糕 / 玻璃杯
  74: [
    { line: 1, item: 'cake', size: 60, x: 400, y: 788 },
    { line: 2, item: 'glass', size: 56, x: 700, y: 788 },
  ],
  // L75 鞋店：那双鞋（课文 black——压暗成黑色）
  75: [{ line: 0, item: 'shoes', size: 40, x: 1350, y: 840, brightness: 0.3 }],
  // L76 展示台：小汽车
  76: [{ line: 0, item: 'car', size: 170, x: 1420, y: 800 }],
  // L79 购物清单：咖啡 / 茶 / 糖 / 果酱 / 啤酒 / 葡萄酒 / 钱
  79: [
    { line: 4, item: 'coffee', size: 60, x: 700, y: 844 },
    { line: 4, item: 'tea', size: 60, x: 770, y: 844 },
    { line: 4, item: 'sugar', size: 55, x: 840, y: 845 },
    { line: 4, item: 'jam', size: 55, x: 910, y: 844 },
    { line: 8, item: 'beer', size: 78, x: 1330, y: 840 },
    { line: 8, item: 'wine', size: 92, x: 1440, y: 838 },
    { line: 10, item: 'money', size: 30, x: 1240, y: 845 },
  ],
  // L80 展示台：奶酪 / 书 / 钱
  80: [
    { line: 0, item: 'cheese', size: 40, x: 400, y: 788 },
    { line: 2, item: 'book', size: 46, x: 740, y: 788 },
    { line: 4, item: 'money', size: 30, x: 870, y: 790 },
  ],
  // L81 威士忌：玻璃杯
  81: [{ line: 11, item: 'glass', size: 56, x: 1380, y: 838 }],
  // L83 咖啡与行李：咖啡 / 行李箱
  83: [
    { line: 8, item: 'coffee', size: 60, x: 1390, y: 840 },
    { line: 15, item: 'suitcase', size: 120, x: 200, y: 830 },
  ],
  // L87 车库：路灯（撞的灯柱）/ 汽车
  87: [
    { line: 3, item: 'lamp', size: 130, x: 1200, y: 820 },
    { line: 1, item: 'car', size: 160, x: 1470, y: 830 },
  ],
  // L89 卖房：钱
  89: [{ line: 16, item: 'money', size: 30, x: 1360, y: 845 }],
  // L95 车站：车票（火车/挂钟背景已有）
  95: [{ line: 0, item: 'ticket', size: 30, x: 1460, y: 845 }],
  // L108 展示台：三只箱子比大小（课文 blue/brown/green——蓝棕绿三色）
  108: [
    { line: 9, item: 'suitcase', size: 110, x: 1250, y: 780, hue: 185 },
    { line: 10, item: 'suitcase', size: 130, x: 1370, y: 810 },
    { line: 11, item: 'suitcase', size: 150, x: 1500, y: 785, hue: 95 },
  ],
  // L109 咖啡：牛奶 / 糖 / 烟盒（咖啡=手中杯子）
  109: [
    { line: 3, item: 'milk', size: 90, x: 1330, y: 840 },
    { line: 5, item: 'sugar', size: 55, x: 1240, y: 842 },
    { line: 14, item: 'box', size: 100, x: 1420, y: 836 },
  ],
  // L110 展示台：巧克力 / 汽车
  110: [
    { line: 1, item: 'chocolate', size: 30, x: 400, y: 788 },
    { line: 16, item: 'car', size: 170, x: 1420, y: 800 },
  ],
  // L111 商店型号：收音机（展品）/ 钱
  111: [
    { line: 0, item: 'radio', size: 90, x: 1250, y: 838 },
    { line: 6, item: 'money', size: 30, x: 1360, y: 845 },
  ],
  // L112 展示台：书
  112: [{ line: 3, item: 'book', size: 46, x: 400, y: 788 }],
  // L114 展示台：巧克力 / 信封 / 蛋糕 / 饼干
  114: [
    { line: 1, item: 'chocolate', size: 30, x: 400, y: 788 },
    { line: 7, item: 'letter', size: 35, x: 700, y: 788 },
    { line: 13, item: 'cake', size: 60, x: 900, y: 790 },
    { line: 16, item: 'biscuit', size: 40, x: 1300, y: 788 },
  ],
  // L115 后花园：窗 / 后门 / 啤酒
  115: [
    { line: 6, item: 'window', size: 200, x: 60, y: 645 },
    { line: 9, item: 'door', size: 280, x: 1540, y: 662 },
    { line: 18, item: 'beer', size: 78, x: 1470, y: 842 },
  ],
  // L118 展示台：电视 / 信
  118: [
    { line: 1, item: 'television', size: 130, x: 350, y: 788 },
    { line: 7, item: 'letter', size: 35, x: 880, y: 790 },
  ],
  // L119 床上的故事：床 / 鹦鹉
  119: [
    { line: 2, item: 'bed', size: 140, x: 1500, y: 838 },
    { line: 11, item: 'bird', size: 55, x: 1300, y: 842 },
  ],
  // L120 展示台：汽车 / 火车
  120: [
    { line: 0, item: 'car', size: 150, x: 250, y: 790 },
    { line: 1, item: 'train', size: 170, x: 1360, y: 790 },
  ],
  // L121 书店：柜上的书（帽子手持）
  121: [{ line: 4, item: 'book', size: 46, x: 1460, y: 838 }],
  // L122 展示台：书
  122: [{ line: 2, item: 'book', size: 46, x: 400, y: 788 }],
  // L123 澳洲旅行：轮船（照片手持）
  123: [{ line: 4, item: 'ship', size: 160, x: 1420, y: 800 }],
  // L124 展示台：书
  124: [{ line: 12, item: 'book', size: 46, x: 400, y: 788 }],
  // L125 沏茶：茶
  125: [{ line: 0, item: 'tea', size: 60, x: 1350, y: 842 }],
  // L126 展示台：晚餐 / 睡觉的床
  126: [
    { line: 4, item: 'dish', size: 40, x: 730, y: 788 },
    { line: 2, item: 'bed', size: 140, x: 1360, y: 800 },
  ],
  // L127 认人：报纸
  127: [{ line: 5, item: 'newspaper', size: 50, x: 1350, y: 842 }],
  // L128 推测：帽子 / 睡觉的床（He must be sleeping）
  128: [
    { line: 1, item: 'hat', size: 60, x: 400, y: 788 },
    { line: 14, item: 'bed', size: 140, x: 1360, y: 800 },
  ],
  // L130 推测完成时：帽子 / 睡觉的床
  130: [
    { line: 1, item: 'hat', size: 60, x: 400, y: 788 },
    { line: 14, item: 'bed', size: 140, x: 1360, y: 800 },
  ],
  // L131 假期计划：狗
  131: [{ line: 14, item: 'dog', size: 90, x: 1360, y: 840 }],
  // L133 新闻：貂皮大衣（报纸手持）
  133: [{ line: 12, item: 'coat', size: 120, x: 1440, y: 838 }],
  // L137 足球博彩：钱 / 貂皮大衣
  137: [
    { line: 4, item: 'money', size: 30, x: 1250, y: 845 },
    { line: 5, item: 'coat', size: 120, x: 1350, y: 838 },
  ],
  // L138 条件句：窗 / 火车 / 汽车
  138: [
    { line: 0, item: 'window', size: 180, x: 280, y: 780 },
    { line: 1, item: 'train', size: 170, x: 1360, y: 790 },
    { line: 5, item: 'car', size: 120, x: 810, y: 795 },
  ],
  // L141 火车上：帽子 / 蓝外套 / 手提包（窗/火车=车厢本身）
  141: [
    { line: 7, item: 'bag', size: 90, x: 1330, y: 838 },
    { line: 7, item: 'hat', size: 60, x: 1400, y: 840 },
    { line: 8, item: 'coat', size: 120, x: 1490, y: 836 },
  ],
  // L142 被动语态：书 / 信
  142: [
    { line: 2, item: 'book', size: 46, x: 760, y: 788 },
    { line: 4, item: 'letter', size: 35, x: 400, y: 788 },
  ],
  // L143 乱扔垃圾：旧汽车 / 旧冰箱 / 空瓶（ litter baskets 不在词表）
  143: [
    { line: 8, item: 'car', size: 170, x: 1230, y: 838 },
    { line: 8, item: 'fridge', size: 220, x: 1500, y: 830 },
    { line: 9, item: 'bottle', size: 90, x: 1000, y: 844 },
  ],
  // L93 飞行员奈杰尔：飞机飞过（He will fly to New York）
  93: [{ line: 3, item: 'aeroplane', size: 90, x: 800, y: 260, run: 1 }],
};

/** 角色配色原型（同一角色全剧不变；肤色/发型/服装可按人物调整） */
export const ROLE_PRESETS: Record<string, FigureSpec> = {
  man1: { skin: '#f2c9a1', hair: '#4a3c30', hairStyle: 'short', shirt: '#4f86c6', pants: '#3f4a5a' },
  man2: { skin: '#f2c9a1', hair: '#2f2a26', hairStyle: 'short', shirt: '#7a9e7e', pants: '#4a4238' },
  man3: { skin: '#f6d3ae', hair: '#6b4a2f', hairStyle: 'short', shirt: '#c9a227', pants: '#4a4238' },
  woman1: { skin: '#f6d3ae', hair: '#6b4a2f', hairStyle: 'bun', shirt: '#d96f5e', pants: '#7a6a58', dress: true },
  woman2: { skin: '#f2c9a1', hair: '#3a3230', hairStyle: 'long', shirt: '#5e9ea0', pants: '#55606b', dress: true },
  woman3: { skin: '#f6d3ae', hair: '#8a5a2b', hairStyle: 'long', shirt: '#e0a458', pants: '#6b5a4a', dress: true },
  boy: { skin: '#f6d3ae', hair: '#5d4a3a', hairStyle: 'short', shirt: '#e0a458', pants: '#4f6d7a' },
  girl: { skin: '#f6d3ae', hair: '#8a5a2b', hairStyle: 'long', shirt: '#c98686', pants: '#7a6a58', dress: true },
  elderM: { skin: '#f2c9a1', hair: '#b8b0a4', hairStyle: 'short', shirt: '#8a7f6f', pants: '#4a4238' },
  elderF: { skin: '#f2c9a1', hair: '#cfc6b8', hairStyle: 'bun', shirt: '#a58ea1', pants: '#7a6a58', dress: true },
  teacher: { skin: '#f2c9a1', hair: '#3a3230', hairStyle: 'short', shirt: '#5d5a8f', pants: '#3f4a5a' },
  police: { skin: '#f2c9a1', hair: '#2f2a26', hairStyle: 'short', shirt: '#3d5a80', pants: '#22303f' },
  doctor: { skin: '#f2c9a1', hair: '#4a3c30', hairStyle: 'short', shirt: '#e8e6e0', pants: '#55606b' },
  assistant: { skin: '#f6d3ae', hair: '#6b4a2f', hairStyle: 'short', shirt: '#b5651d', pants: '#4a4238' },
  nurse: { skin: '#f6d3ae', hair: '#3a3230', hairStyle: 'bun', shirt: '#e8e6e0', pants: '#55606b', dress: true },
  narrator: { skin: '#f2c9a1', hair: '#5d4a3a', hairStyle: 'short', shirt: '#8f6f55', pants: '#4a4238' },
};

/**
 * 画面原型 → TTS 声音性别/年龄段。
 * 剧本 cast key（A/B/C…）跨课复用且性别各异，不能进全局性别映射表；
 * 剧场朗读的声音性别一律以画面原型为准（buildCastVoiceMap 消费）。
 */
export const ROLE_VOICE_KIND: Record<string, { gender: 'male' | 'female' | 'neutral'; age: 'child' | 'elder' | 'adult' }> = {
  man1: { gender: 'male', age: 'adult' },
  man2: { gender: 'male', age: 'adult' },
  man3: { gender: 'male', age: 'adult' },
  woman1: { gender: 'female', age: 'adult' },
  woman2: { gender: 'female', age: 'adult' },
  woman3: { gender: 'female', age: 'adult' },
  boy: { gender: 'male', age: 'child' },
  girl: { gender: 'female', age: 'child' },
  elderM: { gender: 'male', age: 'elder' },
  elderF: { gender: 'female', age: 'elder' },
  teacher: { gender: 'male', age: 'adult' },
  police: { gender: 'male', age: 'adult' },
  doctor: { gender: 'male', age: 'adult' },
  assistant: { gender: 'female', age: 'adult' },
  nurse: { gender: 'female', age: 'adult' },
  narrator: { gender: 'neutral', age: 'adult' },
};

/** 背景模板元数据（渲染在 TheaterStage） */
export const BG_NAMES: Record<BgId, string> = {
  street: '街道',
  classroom: '教室',
  home: '家中客厅',
  kitchen: '厨房',
  shop: '商店',
  park: '公园河畔',
  station: '车站',
  office: '办公室',
  stage: '展示台',
  train: '火车车厢',
  bus: '公交车',
  airport: '机场',
  night: '夜晚客厅',
  living: '史密斯家客厅',
  river: '河畔大桥',
};

/** 解析逐句动作串 */
export function parseScriptLines(lines: string): Array<{ key: string; action: LineAction }> {
  return lines
    .split('|')
    .filter(Boolean)
    .map((token) => {
      const [key, action] = token.split(':');
      return { key, action: (action || 'talk') as LineAction };
    });
}

/** 预计时长（秒）：开场 2s + 每句按词数估时 + 句间 0.4s */
export function estimateSeconds(script: LessonScriptV2, wordsPerLine: number[]): number {
  const per = wordsPerLine.map((w) => Math.max(1.6, 0.9 + w * 0.42));
  const total = per.reduce((s, x) => s + x, 0) + (per.length - 1) * 0.4 + 2;
  return Math.round(total);
}

// =====================================================================
// 144 课剧本（按课文逐课编写；lines 句数与课文段落严格一致）
// =====================================================================

export const LESSON_SCRIPTS: Record<number, LessonScriptV2> = {
  1: { id: 1, scene: '街边的手提包', place: '街头', bg: 'street', type: 'dialogue', story: '路人拾到手提包，向失主确认后归还', cast: [['A', '路人', 'man1'], ['B', '失主', 'woman1']], lines: 'A:raise|B:talk|A:raise|B:shake|A:raise|B:nod|B:wave' },
  2: { id: 2, scene: '讲台上的文具', place: '教室', bg: 'classroom', type: 'dialogue', story: '老师拿起文具逐一询问学生是不是他们的', cast: [['A', '老师', 'teacher'], ['B', '学生', 'boy']], lines: 'A:point|B:nod|A:point|B:shake|A:point|B:nod|A:point|B:shake' },
  3: { id: 3, scene: '五号寄存伞', place: '寄存处', bg: 'shop', type: 'dialogue', story: '顾客凭寄存牌取回大衣和伞，发现伞拿错了，服务员换对', cast: [['C', '顾客', 'man2'], ['S', '服务员', 'assistant']], lines: 'C:point|C:raise|C:talk|S:talk|S:raise|C:shake|S:talk|S:raise|C:shake|S:raise|C:nod|C:wave' },
  4: { id: 4, scene: '认识新同学', place: '教室', bg: 'classroom', type: 'dialogue', story: '新同学互相指认衣服、学校和老师', cast: [['A', '同学甲', 'boy'], ['B', '同学乙', 'girl']], lines: 'A:point|B:nod|A:point|B:shake|A:point|B:nod' },
  5: { id: 5, scene: '新同学索菲娅', place: '教室', bg: 'classroom', type: 'dialogue', story: '布莱克老师向全班介绍法国新同学索菲娅，各国同学依次问好', cast: [['B', '布莱克老师', 'teacher'], ['S', '索菲娅', 'woman2'], ['H', '汉斯', 'man2'], ['O', '新同学们', 'boy']], lines: 'B:talk|O:talk|B:talk|B:talk|B:talk|B:point|B:talk|S:wave|B:point|B:talk|O:wave|B:point|B:talk|O:wave|B:point|B:talk|O:wave|B:point|B:talk|O:wave' },
  6: { id: 6, scene: '名车展示会', place: '展示台', bg: 'stage', type: 'drill', story: '主持人依次介绍沃尔沃、标致等八款名车', cast: [['A', '主持人', 'man2']], lines: 'A:point|A:point|A:point|A:point|A:point|A:point|A:point|A:point' },
  7: { id: 7, scene: '新同学罗伯特', place: '教室', bg: 'classroom', type: 'dialogue', story: '新学生罗伯特与索菲娅互相认识，聊国籍与职业', cast: [['R', '罗伯特', 'boy'], ['S', '索菲娅', 'woman2']], lines: 'R:wave|R:talk|S:wave|S:talk|R:talk|S:nod|S:talk|R:shake|S:talk|R:talk|R:talk|S:shake|R:talk|S:talk|S:talk|R:talk' },
  8: { id: 8, scene: '职业大展台', place: '展示台', bg: 'stage', type: 'drill', story: '主持人逐一介绍十种职业', cast: [['A', '主持人', 'woman1']], lines: 'A:point|A:point|A:point|A:point|A:point|A:point|A:point|A:point|A:point|A:point' },
  9: { id: 9, scene: '街头问好', place: '街道', bg: 'street', type: 'dialogue', story: '史蒂文和海伦街头偶遇互问近况，寒暄后道别', cast: [['S', '史蒂文', 'man1'], ['H', '海伦', 'woman3']], lines: 'S:wave|H:wave|S:talk|H:smile|H:talk|S:talk|S:talk|H:talk|H:talk|S:talk|S:wave|S:talk|H:talk|H:wave' },
  10: { id: 10, scene: '街边看人', place: '街道', bg: 'street', type: 'dialogue', story: '两个孩子街头观察路人，点评胖瘦高矮', cast: [['A', '孩子甲', 'boy'], ['B', '孩子乙', 'girl']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  11: { id: 11, scene: '谁的衬衫', place: '教室', bg: 'classroom', type: 'dialogue', story: '老师捡到衬衫挨个确认失主，最后抛还给蒂姆', cast: [['T', '老师', 'teacher'], ['D', '戴夫', 'boy'], ['M', '蒂姆', 'man2']], lines: 'T:point|T:point|D:shake|D:talk|D:point|D:talk|T:point|D:talk|D:talk|T:wave|M:walkin|T:raise|M:talk|T:raise|T:raise|M:talk' },
  12: { id: 12, scene: '失物招领台', place: '展示台', bg: 'stage', type: 'drill', story: '主持人逐一展示失物并说明归属', cast: [['A', '主持人', 'man1']], lines: 'A:point|A:talk|A:point|A:talk|A:point|A:talk|A:point|A:talk' },
  13: { id: 13, scene: '一件新连衣裙', place: '安娜的房间', bg: 'home', type: 'dialogue', story: '安娜邀露西上楼看新连衣裙，还有同色的新帽子', cast: [['L', '露西', 'woman3'], ['A', '安娜', 'woman1']], lines: 'L:talk|A:talk|A:wave|L:talk|A:talk|A:raise|L:talk|L:talk|A:talk|L:talk|A:talk|A:talk|L:talk' },
  14: { id: 14, scene: '颜色问答', place: '展示台', bg: 'stage', type: 'drill', story: '主持人问答衬衫与大衣的颜色', cast: [['A', '主持人', 'man2']], lines: 'A:point|A:talk|A:point|A:talk' },
  15: { id: 15, scene: '海关检查', place: '海关', bg: 'station', type: 'dialogue', story: '海关官员核查丹麦女孩一行人的护照与行李', cast: [['O', '海关官员', 'police'], ['G', '丹麦女孩', 'woman2']], lines: 'G:shake|G:talk|O:talk|G:shake|G:talk|O:raise|G:raise|O:point|G:shake|G:talk|G:talk|O:talk|G:nod|O:talk|G:nod|O:talk|G:wave' },
  16: { id: 16, scene: '国籍与行李', place: '展示台', bg: 'stage', type: 'drill', story: '主持人操练国籍与箱子颜色问答', cast: [['A', '主持人', 'man1']], lines: 'A:talk|A:talk|A:point|A:talk|A:point|A:talk' },
  17: { id: 17, scene: '参观公司', place: '办公室', bg: 'office', type: 'dialogue', story: '杰克逊带理查兹参观公司，介绍勤奋的录入员与懒惰的推销员', cast: [['J', '杰克逊', 'man2'], ['R', '理查兹', 'man1'], ['E', '员工们', 'woman2']], lines: 'J:wave|R:talk|J:point|R:talk|R:point|R:talk|J:talk|J:point|R:talk|R:talk|R:talk|J:talk|J:talk|R:point|J:talk|J:talk' },
  18: { id: 18, scene: '他们是谁', place: '展示台', bg: 'stage', type: 'drill', story: '问答四组职业：警察、录入员、护士、工程师', cast: [['A', '主持人', 'woman3'], ['B', '嘉宾', 'man1']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  19: { id: 19, scene: '公园里的冰淇淋', place: '公园', bg: 'park', type: 'dialogue', story: '孩子们玩耍累渴，妈妈买了冰淇淋让大家开心起来', cast: [['M', '妈妈', 'woman1'], ['C', '孩子们', 'boy'], ['I', '冰淇淋小贩', 'man3']], lines: 'M:talk|C:talk|M:talk|M:talk|C:shake|C:point|C:raise|M:raise|C:talk|M:talk|C:wave' },
  20: { id: 20, scene: '大小与开合', place: '展示台', bg: 'stage', type: 'drill', story: '问答箱子鞋子的大小、门窗的开合', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'woman1']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  21: { id: 21, scene: '拿那本红书', place: '书店', bg: 'shop', type: 'dialogue', story: '先生要书，简两次拿错，最后拿到红皮书', cast: [['M', '先生', 'man1'], ['J', '简', 'woman1']], lines: 'M:talk|J:talk|J:raise|M:shake|M:point|J:raise|M:nod|J:raise|M:talk' },
  22: { id: 22, scene: '哪一个大盒子', place: '展示台', bg: 'stage', type: 'drill', story: '问答"哪一个"：大盒子与空杯子', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'boy']], lines: 'A:talk|B:point|A:talk|B:raise|A:talk|A:talk|B:point|A:talk' },
  23: { id: 23, scene: '架子上的玻璃杯', place: '家中厨房', bg: 'kitchen', type: 'dialogue', story: '先生要架子上的玻璃杯，简找到递给他', cast: [['M', '先生', 'man1'], ['J', '简', 'woman1']], lines: 'M:talk|J:talk|J:raise|M:shake|M:point|J:raise|M:nod|J:raise|M:talk' },
  24: { id: 24, scene: '桌上的茶杯', place: '展示台', bg: 'stage', type: 'drill', story: '问答"哪些"：桌上的茶杯与瓶子', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'man2']], lines: 'A:talk|B:point|A:talk|B:raise|A:talk|A:talk|B:point|A:talk' },
  25: { id: 25, scene: '史密斯太太的厨房', place: '史密斯家厨房', bg: 'kitchen', type: 'narrative', story: '说书人介绍厨房里的冰箱、电炉、桌上的瓶杯', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:point|N:talk|N:point|N:point|N:talk|N:point|N:point|N:point|N:talk|N:point|N:talk' },
  26: { id: 26, scene: '东西在哪里', place: '厨房', bg: 'kitchen', type: 'drill', story: '问答杯子瓶子钢笔书本的位置', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'boy']], lines: 'A:point|B:point|A:point|B:point|A:point|B:point|A:point|B:point' },
  27: { id: 27, scene: '史密斯太太的客厅', place: '史密斯家客厅', bg: 'living', type: 'narrative', story: '说书人介绍客厅里的电视、扶手椅、音响与画', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:point|N:talk|N:point|N:point|N:point|N:point|N:talk|N:point|N:talk|N:point|N:point|N:talk' },
  28: { id: 28, scene: '它们在哪儿', place: '客厅', bg: 'home', type: 'drill', story: '问答书、画、扶手椅的位置', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'girl']], lines: 'A:point|B:point|A:point|B:point|A:point|B:point' },
  29: { id: 29, scene: '整理卧室', place: '卧室', bg: 'home', type: 'dialogue', story: '琼斯夫人指挥艾米开窗、整理衣柜、铺床、掸灰、扫地', cast: [['J', '琼斯夫人', 'woman1'], ['A', '艾米', 'girl']], lines: 'J:wave|J:talk|J:talk|A:talk|J:point|J:point|J:point|J:point|J:point' },
  30: { id: 30, scene: '我该做什么', place: '展示台', bg: 'stage', type: 'drill', story: '祈使句操练：开窗、掸灰、扫地、倒杯、读书、开灯', cast: [['A', '主持人', 'man2'], ['B', '助手', 'boy']], lines: 'A:talk|B:point|A:talk|B:point|A:talk|B:point|B:point|B:point|B:point|B:point|B:point' },
  31: { id: 31, scene: '花园里的萨莉', place: '花园', bg: 'park', type: 'dialogue', story: '杰克向琼播报花园里的萨莉、爬树的蒂姆和追猫的狗（蒂姆句5上场爬树、狗追猫跑动）', cast: [['J', '琼', 'woman3'], ['K', '杰克', 'man1'], ['T', '蒂姆', 'boy']], lines: 'J:talk|K:talk|J:talk|K:talk|J:talk|T:walkin|T:raise|J:talk|J:talk|K:talk|J:talk|K:talk|K:talk|K:talk' },
  32: { id: 32, scene: '正在做什么', place: '展示台', bg: 'stage', type: 'drill', story: '现在进行时问答：打字、做书橱、刮脸、读书、吃面包、跑步', cast: [['A', '主持人', 'woman2']], lines: 'A:point|A:talk|A:point|A:talk|A:point|A:talk|A:point|A:talk|A:point|A:talk|A:point|A:talk' },
  33: { id: 33, scene: '桥上的琼斯一家', place: '河畔', bg: 'river', type: 'narrative', story: '晴日里琼斯一家过桥看船，萨莉看大船、蒂姆看飞机', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:point|N:point|N:point|N:talk|N:point|N:talk|N:point|N:talk' },
  34: { id: 34, scene: '他们在做什么', place: '展示台', bg: 'stage', type: 'drill', story: '现在进行时问答：床上睡着的孩子、上场的男人们交谈、宾客洗衣、狗跑（群体轮换上场）', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman1'], ['M1', '男人甲', 'man1'], ['M2', '男人乙', 'man2']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  35: { id: 35, scene: '我们的村庄', place: '山谷村庄', bg: 'park', type: 'narrative', story: '说书人展示村庄照片：两山之间的河畔、游泳的男孩、学校与公园', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:point|N:talk|N:point|N:talk|N:talk|N:point|N:talk|N:point|N:point|N:talk' },
  36: { id: 36, scene: '进店与出店', place: '商店', bg: 'shop', type: 'drill', story: '方位问答：进店、出店、坐草地、跳墙（进店出店全程在店前）', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'boy']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  37: { id: 37, scene: '粉红色的书橱', place: '家中工作角', bg: 'home', type: 'dialogue', story: '乔治做书橱，向丹要大锤子，要漆成女儿最爱的粉红色', cast: [['D', '丹', 'man1'], ['G', '乔治', 'man2']], lines: 'D:talk|D:talk|G:talk|G:raise|D:raise|G:shake|D:raise|G:talk|D:talk|G:talk|D:talk|G:talk|D:talk|G:talk|G:talk|G:talk' },
  38: { id: 38, scene: '打算与正在', place: '展示台', bg: 'stage', type: 'drill', story: '成对操练"打算做"与"正在做"', cast: [['A', '主持人', 'woman1']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  39: { id: 39, scene: '别摔了花瓶', place: '客厅窗前', bg: 'home', type: 'dialogue', story: '萨姆和彭妮为花瓶放哪儿互相指挥，最后放上架子皆大欢喜', cast: [['S', '萨姆', 'man1'], ['P', '彭妮', 'woman1']], lines: 'S:talk|P:talk|S:talk|S:raise|P:talk|S:raise|P:surprised|P:surprised|P:talk|P:point|S:raise|S:talk|P:talk' },
  40: { id: 40, scene: '如何处理它', place: '展示台', bg: 'stage', type: 'drill', story: '问答"打算怎么处理"锤子、花、信', cast: [['A', '主持人', 'man2']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  41: { id: 41, scene: '彭妮的购物包', place: '厨房餐桌', bg: 'kitchen', type: 'dialogue', story: '彭妮倒出购物包，奶酪面包肥皂巧克力样样有，烟丝不是给萨姆的', cast: [['S', '萨姆', 'man1'], ['P', '彭妮', 'woman1']], lines: 'S:talk|P:talk|S:point|S:talk|P:talk|P:talk|P:talk|P:talk|P:talk|P:talk|P:talk|P:talk|P:talk|S:talk|P:talk' },
  42: { id: 42, scene: '有没有什么东西', place: '展示台', bg: 'stage', type: 'drill', story: 'There be 问答：护照、黄油、牛奶、苹果', cast: [['A', '主持人', 'woman3'], ['B', '嘉宾', 'man3']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  43: { id: 43, scene: '快点沏茶', place: '厨房', bg: 'kitchen', type: 'dialogue', story: '萨姆沏茶找不着茶叶，彭妮提醒就在茶壶后面，水开了', cast: [['P', '彭妮', 'woman1'], ['S', '萨姆', 'man1']], lines: 'P:talk|S:talk|S:point|P:talk|S:talk|P:point|P:talk|S:talk|P:point|P:point|S:talk|S:talk|P:point|P:talk|S:nod|S:raise|P:talk|P:talk' },
  44: { id: 44, scene: '有没有茶具', place: '厨房', bg: 'kitchen', type: 'drill', story: 'There be 问答：牛奶、茶杯、茶壶', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'girl']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  45: { id: 45, scene: '老板的信', place: '办公室', bg: 'office', type: 'dialogue', story: '老板让鲍勃请帕梅拉打信，结果老板的字迹没法认', cast: [['B', '老板', 'man2'], ['O', '鲍勃', 'man1'], ['P', '帕梅拉', 'woman2']], lines: 'B:talk|O:talk|B:talk|O:talk|O:talk|B:talk|B:talk|O:nod|O:talk|P:talk|O:raise|P:talk|P:talk|O:talk|O:talk|P:talk|P:talk|P:talk' },
  46: { id: 46, scene: '你能做到吗', place: '展示台', bg: 'stage', type: 'drill', story: 'Can 问答：抬桌子、放桌上、读信', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'man2']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  47: { id: 47, scene: '一杯黑咖啡', place: '客厅茶座', bg: 'home', type: 'dialogue', story: '克里斯汀请安喝咖啡，安要加糖不加奶，还搭一块饼干', cast: [['C', '克里斯汀', 'woman3'], ['A', '安', 'woman1']], lines: 'C:talk|A:nod|C:talk|A:talk|C:talk|A:talk|C:talk|A:shake|A:talk|A:talk|C:talk|A:nod|C:talk|A:talk' },
  48: { id: 48, scene: '喜欢与想要', place: '展示台', bg: 'stage', type: 'drill', story: 'Do you like/want 问答：啤酒与葡萄酒', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  49: { id: 49, scene: '肉店买肉', place: '肉店', bg: 'shop', type: 'dialogue', story: '伯德夫人买牛肉和肉馅，肉贩坦白自己也不喜欢鸡', cast: [['B', '肉贩', 'assistant'], ['M', '伯德夫人', 'woman1']], lines: 'B:talk|M:talk|B:talk|M:talk|B:point|M:talk|B:point|B:point|M:point|M:raise|B:point|B:talk|M:shake|M:talk|B:talk' },
  50: { id: 50, scene: '他喜欢什么菜', place: '展示台', bg: 'stage', type: 'drill', story: 'Does he like 问答：西红柿、卷心菜、生菜', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'man1']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  51: { id: 51, scene: '希腊的气候', place: '公园长椅', bg: 'park', type: 'dialogue', story: '汉斯问希腊的四季气候，迪米特里如数家珍', cast: [['H', '汉斯', 'man2'], ['D', '迪米特里', 'man3']], lines: 'H:talk|D:talk|H:talk|D:talk|H:talk|D:talk|D:talk|H:talk|D:talk|D:talk|H:talk|D:talk|D:talk|H:talk|D:talk|D:talk' },
  52: { id: 52, scene: '哪国人', place: '展示台', bg: 'stage', type: 'drill', story: '国籍问答：美国与巴西', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:point|B:talk|A:point|B:talk' },
  53: { id: 53, scene: '英国的气候', place: '客厅', bg: 'home', type: 'dialogue', story: '吉姆向汉斯吐槽英国气候：不总宜人但绝对是谈资', cast: [['J', '吉姆', 'man1'], ['H', '汉斯', 'man2']], lines: 'J:talk|H:talk|J:talk|J:talk|J:talk|H:talk|J:talk|J:talk|J:talk|J:talk|J:talk|J:talk|J:talk|J:talk' },
  54: { id: 54, scene: '来自哪里', place: '展示台', bg: 'stage', type: 'drill', story: '国籍问答：澳大利亚与加拿大', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'man2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:point|B:talk' },
  55: { id: 55, scene: '索耶一家的一天', place: '国王街 87 号', bg: 'home', type: 'narrative', story: '说书人讲索耶一家从清晨到夜晚的日常', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk' },
  56: { id: 56, scene: '通常做什么', place: '展示台', bg: 'stage', type: 'drill', story: 'usually 问答：上班、见朋友、看电视', cast: [['A', '主持人', 'woman3'], ['B', '嘉宾', 'man3']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  57: { id: 57, scene: '不寻常的一天', place: '索耶家', bg: 'home', type: 'narrative', story: '平时坐车今天步行、平时客厅喝茶今天花园、平时读报今天读书——处处不寻常', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk' },
  58: { id: 58, scene: '几点钟', place: '展示台', bg: 'stage', type: 'drill', story: '时间问答：八点、八点十分、八点半', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  59: { id: 59, scene: '文具店采购', place: '文具店', bg: 'shop', type: 'dialogue', story: '女士买信封信纸胶水粉笔，最后讨要找零', cast: [['L', '女士', 'woman1'], ['S', '店员', 'assistant']], lines: 'L:talk|S:talk|L:talk|L:talk|S:talk|S:talk|S:talk|S:talk|L:talk|L:talk|S:talk|L:talk|S:talk|S:talk|L:talk|S:talk|L:talk|S:talk|L:talk' },
  60: { id: 60, scene: '下个月度假', place: '展示台', bg: 'stage', type: 'drill', story: 'be going to 问答：度假与时间', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman3']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk' },
  61: { id: 61, scene: '吉米感冒了', place: '威廉斯家卧室', bg: 'home', type: 'dialogue', story: '吉米重感冒卧床，医生检查后让他休一周——他可太开心了', cast: [['F', '威廉斯先生', 'man1'], ['M', '威廉斯太太', 'woman1'], ['D', '医生', 'doctor']], lines: 'F:talk|M:talk|F:talk|M:talk|F:talk|M:talk|F:talk|F:talk|M:talk|M:talk|D:walkin|D:point|D:talk|F:talk|D:talk|M:talk|D:talk|D:talk|F:talk' },
  62: { id: 62, scene: '哪里不舒服', place: '展示台', bg: 'stage', type: 'drill', story: '病症问答：头痛、耳痛、看医生', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'doctor']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  63: { id: 63, scene: '再卧床两天', place: '威廉斯家卧室', bg: 'home', type: 'dialogue', story: '医生复查吉米好转但仍需静养，结果威廉斯先生也感冒了', cast: [['M', '威廉斯太太', 'woman1'], ['D', '医生', 'doctor']], lines: 'M:talk|M:talk|D:talk|M:talk|M:talk|D:talk|D:talk|D:talk|D:talk|D:talk|M:talk|D:talk|M:talk|D:talk|D:talk|D:talk|D:talk|M:talk|M:talk' },
  64: { id: 64, scene: '不要这样做', place: '展示台', bg: 'stage', type: 'drill', story: '否定祈使问答：不要吃药、不要卧床', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'boy']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  65: { id: 65, scene: '给不给钥匙', place: '家中门厅', bg: 'home', type: 'dialogue', story: '吉尔要前门钥匙赴朋友聚会，爸爸不放心，妈妈说她十八岁了不是小孩子', cast: [['J', '吉尔', 'woman2'], ['F', '爸爸', 'man1'], ['M', '妈妈', 'woman1']], lines: 'J:talk|F:talk|F:talk|J:talk|J:talk|F:shake|M:talk|M:talk|M:talk|F:talk|F:raise|F:talk|F:talk|J:nod|J:talk|M:talk|M:wave|M:talk|J:talk|J:walkout' },
  66: { id: 66, scene: '几点了', place: '展示台', bg: 'stage', type: 'drill', story: '时间问答：一点、一点一刻', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'man3']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  67: { id: 67, scene: '街坊寒暄', place: '肉店门口', bg: 'street', type: 'dialogue', story: '两位太太街上相遇，聊吉米病愈和乡间度周末的计划', cast: [['J', '约翰逊太太', 'woman1'], ['W', '威廉斯太太', 'woman2']], lines: 'J:wave|J:talk|W:talk|J:talk|J:shake|J:talk|J:talk|W:talk|J:talk|W:talk|W:talk|J:talk|W:talk|J:talk|J:talk|W:talk|W:talk' },
  68: { id: 68, scene: '什么时候去的', place: '展示台', bg: 'stage', type: 'drill', story: 'was 问答：星期一文具店、星期二面包店', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman1']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  69: { id: 69, scene: '镇边汽车赛', place: '赛车场', bg: 'street', type: 'narrative', story: '一年一度的汽车赛，比利·斯图尔特夺冠；回家路上妻子叮嘱丈夫别开快车', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:point|N:talk|N:talk|N:talk|N:talk|N:point|N:talk|N:talk|N:talk' },
  70: { id: 70, scene: '什么时候在那儿', place: '展示台', bg: 'stage', type: 'drill', story: 'was 问答：星期一与星期二的行程', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'man2']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  71: { id: 71, scene: '讨厌的电话', place: '办公室', bg: 'office', type: 'dialogue', story: '波琳向简吐槽朗·马斯顿一天七个电话，最后假装妈妈接电话才消停', cast: [['J', '简', 'woman3'], ['P', '波琳', 'woman2']], lines: 'J:talk|P:angry|P:talk|P:talk|P:talk|J:talk|P:talk|P:talk|P:talk|P:talk|J:talk|P:talk|P:talk|J:talk|P:talk|J:talk|P:talk' },
  72: { id: 72, scene: '什么时候打的电话', place: '展示台', bg: 'stage', type: 'drill', story: '过去时问答：昨天打电话、前天见面', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman3']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  73: { id: 73, scene: '问路', place: '伦敦街头', bg: 'street', type: 'narrative', story: '米尔斯夫人伦敦迷路问路，对方是只说德语的游客，靠短语手册帮上了忙', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:point|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk' },
  74: { id: 74, scene: '副词表演', place: '展示台', bg: 'stage', type: 'drill', story: '副词造句展示：匆忙刮脸、快吃蛋糕、渴喝水、热情问好', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman1']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk' },
  75: { id: 75, scene: '过时的鞋子', place: '鞋店', bg: 'shop', type: 'dialogue', story: '女士找五码黑鞋没货，店员说这鞋早过时了——女人总是穿不舒服的鞋', cast: [['L', '女士', 'woman1'], ['S', '售货员', 'assistant']], lines: 'L:talk|S:talk|L:talk|S:talk|L:talk|S:talk|S:talk|L:talk|S:talk|L:talk|S:talk|L:talk|S:talk|S:talk|S:talk|S:point|L:talk|S:talk|S:talk' },
  76: { id: 76, scene: '什么时候买的', place: '展示台', bg: 'stage', type: 'drill', story: '过去时问答：上月买车、两天前相遇', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'man3']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  77: { id: 77, scene: '要命的牙痛', place: '牙科诊所', bg: 'office', type: 'dialogue', story: '克罗夫特牙痛欲裂要立刻看牙医——我可以等，牙痛不能等！', cast: [['N', '护士', 'nurse'], ['C', '克罗夫特', 'man2']], lines: 'N:wave|C:talk|N:talk|C:shake|N:talk|C:talk|N:talk|C:talk|N:talk|C:talk|C:talk|N:talk|C:talk' },
  78: { id: 78, scene: '什么时候见过', place: '展示台', bg: 'stage', type: 'drill', story: '过去时问答：前天见面、昨晚通话', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  79: { id: 79, scene: '购物清单', place: '厨房', bg: 'kitchen', type: 'dialogue', story: '卡罗尔列购物清单：茶咖啡糖肉都没了，结果两人钱包都空', cast: [['T', '汤姆', 'man1'], ['C', '卡罗尔', 'woman1']], lines: 'T:talk|C:talk|T:talk|C:talk|C:talk|T:talk|C:talk|C:talk|T:talk|C:talk|T:talk|C:sad|C:smile' },
  80: { id: 80, scene: '有没有奶酪', place: '展示台', bg: 'stage', type: 'drill', story: 'Have you got 问答：奶酪、书、钱', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'man2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  81: { id: 81, scene: '烤牛肉和土豆', place: '餐厅', bg: 'home', type: 'dialogue', story: '萨姆来访，汤姆招待烟酒，聊起午饭——结果晚饭又是烤牛肉和土豆', cast: [['S', '萨姆', 'man1'], ['C', '卡罗尔', 'woman1'], ['T', '汤姆', 'man2']], lines: 'S:wave|S:talk|C:talk|C:talk|C:wave|T:talk|C:talk|T:talk|T:walkin|T:raise|S:shake|T:raise|S:nod|S:talk|T:talk|C:talk|C:talk|T:talk|T:talk|C:talk|T:talk|C:talk|T:talk|C:talk' },
  82: { id: 82, scene: '吃过了吗', place: '展示台', bg: 'stage', type: 'drill', story: '完成时问答：七点吃的早饭、还没吃午饭', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman1']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  83: { id: 83, scene: '度假去', place: '客厅', bg: 'home', type: 'dialogue', story: '汤姆卡罗尔收拾行李明天度假，萨姆今年休过了——在家待着', cast: [['S', '萨姆', 'man1'], ['C', '卡罗尔', 'woman1'], ['T', '汤姆', 'man2']], lines: 'C:wave|C:wave|T:wave|T:talk|T:talk|S:talk|S:talk|S:talk|C:talk|S:talk|S:talk|T:talk|T:talk|C:talk|C:talk|C:talk|C:talk|C:talk|S:talk|T:talk|S:talk|S:talk|C:talk|S:talk' },
  84: { id: 84, scene: '刚做完', place: '展示台', bg: 'stage', type: 'drill', story: '完成时问答：刚吃过午饭、已完成作业', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'boy']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  85: { id: 85, scene: '巴黎之春', place: '电影院门口', bg: 'street', type: 'dialogue', story: '肯刚看了《巴黎之春》，聊起四月去巴黎——天天下雨，就像老伦敦', cast: [['G', '乔治', 'man1'], ['K', '肯', 'man2']], lines: 'G:wave|K:wave|G:talk|K:nod|G:talk|K:talk|K:talk|G:talk|K:talk|G:talk|K:talk|K:talk|K:talk' },
  86: { id: 86, scene: '刚做完什么', place: '展示台', bg: 'stage', type: 'drill', story: '完成时问答：刚完成工作、已退休', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'man1']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  87: { id: 87, scene: '修车厂', place: '修理厂', bg: 'shop', type: 'dialogue', story: '李太太的车撞了路灯柱，送修三年——希望修得好', cast: [['A', '接待员', 'assistant'], ['L', '李太太', 'woman1']], lines: 'A:talk|L:talk|A:talk|L:talk|A:talk|L:talk|A:talk|L:talk|A:talk|L:talk|A:talk' },
  88: { id: 88, scene: '搬新家了吗', place: '展示台', bg: 'stage', type: 'drill', story: '完成时问答：还没搬家、住了十年', cast: [['A', '主持人', 'woman3'], ['B', '嘉宾', 'man3']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  89: { id: 89, scene: '出售的房子', place: '待售住宅', bg: 'home', type: 'dialogue', story: '奈杰尔看房，伊恩住了二十年要退休回乡下——女人们最后总是说了算', cast: [['N', '奈杰尔', 'man1'], ['I', '伊恩', 'elderM']], lines: 'N:talk|N:talk|I:talk|N:talk|I:talk|I:wave|N:talk|I:talk|N:talk|N:talk|I:talk|N:talk|I:talk|I:talk|N:talk|I:talk|N:talk|I:talk|N:talk|N:talk|I:talk' },
  90: { id: 90, scene: '不规则动词表', place: '展示台', bg: 'stage', type: 'drill', story: '完成时与不规则动词过去分词操练', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  91: { id: 91, scene: '可怜的伊恩', place: '街坊门口', bg: 'street', type: 'dialogue', story: '邻居们惦念卖房搬走的伊恩——他本不想搬，可他妻子想', cast: [['C', '凯瑟琳', 'woman1'], ['J', '詹妮', 'woman2'], ['L', '琳达', 'woman3']], lines: 'C:talk|J:talk|J:talk|C:talk|J:talk|J:talk|J:talk|C:talk|C:talk|J:talk|J:talk|J:talk|J:talk|L:talk|L:talk|C:talk|C:talk|J:talk|L:talk|C:sad|C:talk|C:talk|J:talk' },
  92: { id: 92, scene: '什么时候动身', place: '展示台', bg: 'stage', type: 'drill', story: '将来时问答：明天离开、今晚到达', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'man1']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  93: { id: 93, scene: '飞行员邻居', place: '隔壁', bg: 'street', type: 'narrative', story: '新邻居奈杰尔是飞行员，飞遍全球——他妻子通常待在家里', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk' },
  94: { id: 94, scene: '去年明年', place: '展示台', bg: 'stage', type: 'drill', story: '时态对比问答：去年去伦敦、明年去巴黎', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'man3']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  95: { id: 95, scene: '错过的火车', place: '火车站', bg: 'station', type: 'dialogue', story: '乔治肯买票候车去喝酒，回站时车刚走——站钟慢十分钟，下班要等五小时', cast: [['G', '乔治', 'man1'], ['K', '肯', 'man2'], ['S', '车站员', 'assistant']], lines: 'G:talk|G:talk|S:talk|G:talk|S:talk|S:talk|K:talk|G:talk|K:talk|G:talk|K:talk|K:talk|G:talk|S:raise|G:talk|S:talk|G:surprised|G:angry|S:talk|S:talk|G:talk|S:talk' },
  96: { id: 96, scene: '现在几点', place: '展示台', bg: 'stage', type: 'drill', story: '时间问答：三点十分、五点四十五', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'man1']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  97: { id: 97, scene: '拿错的箱子', place: '火车站失物招领', bg: 'station', type: 'dialogue', story: '霍尔先生认领蓝箱子，付了钱才发现拿错了——标签对不上', cast: [['H', '霍尔先生', 'man1'], ['A', '服务员', 'assistant']], lines: 'H:talk|A:talk|H:talk|H:talk|A:point|H:shake|A:point|A:point|H:talk|A:talk|H:talk|H:talk|A:talk|A:raise|H:raise|A:talk|H:talk|A:talk|H:talk|H:talk' },
  98: { id: 98, scene: '箱子是谁的', place: '展示台', bg: 'stage', type: 'drill', story: '物主代词问答：我的、她的', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman1']], lines: 'A:point|B:talk|A:point|B:talk' },
  99: { id: 99, scene: '楼梯摔倒', place: '家中楼梯', bg: 'home', type: 'dialogue', story: '安迪摔下楼梯伤到背起不来，露西扶他并叫医生拍片', cast: [['A', '安迪', 'man1'], ['L', '露西', 'woman1']], lines: 'A:sad|L:talk|A:sad|L:talk|A:nod|A:talk|L:talk|L:talk|L:raise|L:talk|A:talk|A:talk|L:talk|L:raise|L:talk|L:talk' },
  100: { id: 100, scene: '他说什么', place: '展示台', bg: 'stage', type: 'drill', story: '间接引语操练：他说他病了、她说她累了', cast: [['A', '主持人', 'woman3'], ['B', '嘉宾', 'man2']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  101: { id: 101, scene: '吉米的明信片', place: '客厅', bg: 'home', type: 'dialogue', story: '奶奶耳背，彭妮大声转述吉米从苏格兰寄来的明信片', cast: [['G', '奶奶', 'elderF'], ['P', '彭妮', 'woman1']], lines: 'G:talk|P:talk|G:talk|P:talk|P:talk|P:talk|G:talk|P:talk|P:talk|G:talk|P:talk|P:talk|G:talk|G:talk|G:talk|P:talk|P:talk|P:talk|G:talk|G:talk|P:talk' },
  102: { id: 102, scene: '他说他说', place: '展示台', bg: 'stage', type: 'drill', story: '间接引语操练：觉得冷、头疼、马上来、等车', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|B:talk|A:talk|B:talk' },
  103: { id: 103, scene: '法语考试', place: '教室', bg: 'classroom', type: 'dialogue', story: '考后互相打探成绩，旁边哥们对着试卷名字看了三小时一个字没写', cast: [['G', '加里', 'boy'], ['R', '理查德', 'boy']], lines: 'G:talk|R:talk|R:talk|R:talk|R:talk|G:talk|G:talk|R:talk|R:talk|R:talk|R:talk|G:talk|R:talk|R:talk|G:talk|G:talk|G:talk|R:talk|G:talk|G:talk|G:talk' },
  104: { id: 104, scene: '太难与够容易', place: '展示台', bg: 'stage', type: 'drill', story: 'too/very/enough 句型操练', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'girl']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk' },
  105: { id: 105, scene: '周六的邀请', place: '电话两头', bg: 'home', type: 'dialogue', story: '琼斯先生电话邀请聚会，琼斯太太周六要工作来不了', cast: [['M', '琼斯太太', 'woman1'], ['J', '琼斯先生', 'man1']], lines: 'M:wave|J:talk|M:talk|J:talk|M:talk|J:talk|M:talk|J:talk|M:talk|J:talk' },
  106: { id: 106, scene: '电话留言', place: '电话两头', bg: 'home', type: 'drill', story: '电话用语：找人不在、留口信、回电话', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman1']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  107: { id: 107, scene: '合身的裙子', place: '服装店', bg: 'shop', type: 'dialogue', story: '女士试裙嫌小嫌丑，就要蓝裙的尺码——店里最大就是这件', cast: [['L', '女士', 'woman1'], ['S', '店员', 'assistant']], lines: 'L:talk|L:talk|S:point|S:talk|S:talk|S:talk|S:talk|L:talk|L:talk|L:talk|L:talk|L:talk|L:talk|L:talk|L:talk|S:talk|S:talk' },
  108: { id: 108, scene: '比一比', place: '展示台', bg: 'stage', type: 'drill', story: '比较级最高级示范：高矮冷热、人群、箱子', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'boy']], lines: 'A:point|A:talk|A:talk|A:point|A:talk|A:talk|A:point|A:talk|A:talk|A:point|A:talk|A:talk' },
  109: { id: 109, scene: '来杯咖啡', place: '客厅', bg: 'home', type: 'dialogue', story: '鲍勃煮咖啡待简，加不加糖随她，还递上一支烟', cast: [['B', '鲍勃', 'man1'], ['J', '简', 'woman3']], lines: 'B:talk|J:talk|B:talk|B:talk|J:talk|B:talk|B:talk|J:talk|J:talk|B:talk|J:talk|J:talk|J:talk|B:talk|B:talk' },
  110: { id: 110, scene: '多与少', place: '展示台', bg: 'stage', type: 'drill', story: 'more/most/less/least 操练：巧克力、错误、新车餐馆', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'man2']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  111: { id: 111, scene: '最贵的型号', place: '电器行', bg: 'shop', type: 'dialogue', story: '五百镑太贵买不起，便宜的又不如贵的——那就分期付款', cast: [['A', '店员', 'assistant'], ['C', '顾客', 'man1']], lines: 'A:talk|C:talk|A:talk|C:talk|A:talk|C:talk|C:talk|A:talk|C:talk|A:talk|C:talk|C:talk|A:talk|A:talk|A:talk' },
  112: { id: 112, scene: '最难与最无趣', place: '展示台', bg: 'stage', type: 'drill', story: 'the most/the least 操练：测试与书', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'girl']], lines: 'A:talk|A:talk|A:talk|A:point|A:talk|A:talk' },
  113: { id: 113, scene: '公交车上的零钱', place: '公交车', bg: 'bus', type: 'dialogue', story: '买车票两人都没零钱也换不开十镑——你 later 再付吧', cast: [['C', '售票员', 'assistant'], ['M', '乘客', 'man3']], lines: 'C:talk|M:talk|C:talk|M:talk|C:talk|M:talk|C:talk|M:talk|C:talk|M:talk|C:talk|C:talk' },
  114: { id: 114, scene: '我也是', place: '展示台', bg: 'stage', type: 'drill', story: 'So have I / Neither have I 操练：巧克力、信封、蛋糕、饼干', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman3']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  115: { id: 115, scene: '敲敲门', place: '卡罗尔家花园', bg: 'park', type: 'dialogue', story: '海伦吉姆敲门没人应，绕到后门发现大家都在花园午餐喝啤酒', cast: [['H', '海伦', 'woman1'], ['J', '吉姆', 'man1'], ['C', '卡罗尔', 'woman3'], ['T', '汤姆', 'man2']], lines: 'H:talk|J:talk|J:talk|J:talk|H:talk|H:talk|H:point|H:talk|J:talk|H:talk|J:point|J:talk|C:wave|C:wave|T:talk|T:talk|C:talk|J:talk|J:talk|C:talk|C:talk|C:talk|J:talk|T:talk|T:talk|T:raise' },
  116: { id: 116, scene: '刚刚与已经', place: '展示台', bg: 'stage', type: 'drill', story: '完成时副词问答：just/already/never/yet', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'man2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  117: { id: 117, scene: '汤米吞硬币', place: '餐厅', bg: 'kitchen', type: 'narrative', story: '汤米把地上的硬币塞进嘴里吞了，后来又在裤子口袋里找到两枚', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk' },
  118: { id: 118, scene: '那时你在做什么', place: '展示台', bg: 'stage', type: 'drill', story: '过去进行时问答：看电视、做饭、踢球、写信', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman1']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  119: { id: 119, scene: '鹦鹉抓小偷', place: '乔治家', bg: 'home', type: 'narrative', story: '小偷深夜进屋被一声"怎么了"吓跑——原来是鹦鹉亨利的口头禅', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:point|N:talk|N:talk|N:talk' },
  120: { id: 120, scene: '过去完成时', place: '展示台', bg: 'stage', type: 'drill', story: 'had done 操练：卖车、火车已走、批改作业', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'man1']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  121: { id: 121, scene: '戴帽子的男人', place: '书店', bg: 'shop', type: 'dialogue', story: '顾客忘拿词典回店找，店员卡罗琳靠一顶帽子认出了他', cast: [['C', '顾客', 'man1'], ['M', '经理', 'man2'], ['K', '卡罗琳', 'woman2']], lines: 'C:talk|M:talk|C:point|M:talk|C:point|M:talk|M:talk|K:talk|K:talk|M:talk|C:nod|M:talk|C:nod|M:point|K:nod|K:talk' },
  122: { id: 122, scene: '戴帽子的那个人', place: '展示台', bg: 'stage', type: 'drill', story: '关系从句操练：who/whom/which', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman1']], lines: 'A:point|B:talk|A:point|B:talk' },
  123: { id: 123, scene: '澳大利亚的照片', place: '客厅', bg: 'home', type: 'dialogue', story: '比尔展示澳洲之旅照片：同行的人、漂亮的邮轮、说起过的那个人', cast: [['B', '比尔', 'man1'], ['O', '鲍勃', 'man2']], lines: 'B:raise|O:talk|O:talk|B:talk|B:point|O:talk|O:point|B:point' },
  124: { id: 124, scene: '昨天服务的那个人', place: '展示台', bg: 'stage', type: 'drill', story: '定语从句操练：柜台后的女士、修路的工人、昨天买的书', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman2']], lines: 'A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point|B:talk|A:point' },
  125: { id: 125, scene: '两人喝茶', place: '办公室茶水间', bg: 'office', type: 'dialogue', story: '凯特泡茶邀苏珊，苏珊婉拒，想到明天这时还得上班就叹气', cast: [['K', '凯特', 'woman1'], ['S', '苏珊', 'woman2']], lines: 'K:raise|K:talk|S:shake|S:talk|K:talk|S:talk|K:talk|S:talk' },
  126: { id: 126, scene: '明天这时', place: '展示台', bg: 'stage', type: 'drill', story: '将来进行时问答：工作、睡觉、吃晚饭', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman3']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  127: { id: 127, scene: '认出女演员', place: '街头', bg: 'street', type: 'dialogue', story: '莉兹认出著名女演员卡伦·马什，报纸上说她三十五岁了', cast: [['K', '凯特', 'woman1'], ['L', '莉兹', 'woman2']], lines: 'K:point|L:talk|L:talk|K:talk|L:talk|K:talk|K:talk' },
  128: { id: 128, scene: '一定与不可能', place: '展示台', bg: 'stage', type: 'drill', story: 'must be / can\'t be 推测操练：生病、帽子、国籍、年龄', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'man1']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  129: { id: 129, scene: '七十英里的时速', place: '公路', bg: 'street', type: 'dialogue', story: '加里超速被警察拦下，安妮一句话拆台——下次听妻子的准没错', cast: [['A', '安妮', 'woman1'], ['G', '加里', 'man1'], ['P', '警察', 'police']], lines: 'A:talk|A:point|A:talk|A:talk|P:walkin|P:angry|P:talk|G:shake|P:talk|P:talk|G:talk|G:talk|A:talk|A:talk|G:talk|P:raise|P:talk|P:talk|G:talk|G:talk|A:talk|G:talk|A:talk' },
  130: { id: 130, scene: '过去一定不可能', place: '展示台', bg: 'stage', type: 'drill', story: 'must have been / can\'t have been 推测操练', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  131: { id: 131, scene: '别那么肯定', place: '客厅', bg: 'home', type: 'dialogue', story: '罗伊想出国度假又拿不定主意，狗房子花园没人管——最后还是宅家里', cast: [['M', '马丁', 'man2'], ['G', '罗伊', 'man1']], lines: 'M:talk|G:talk|G:talk|G:talk|G:talk|G:talk|M:talk|G:talk|M:talk|G:talk|M:talk|G:talk|G:talk|G:talk|G:talk|G:talk|G:talk|G:talk|G:talk' },
  132: { id: 132, scene: '可能在看书', place: '展示台', bg: 'stage', type: 'drill', story: 'may be / may have been 推测操练', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman1']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  133: { id: 133, scene: '轰动新闻', place: '机场与街头', bg: 'office', type: 'dialogue', story: '女演员马什宣布息影，记者报道，凯特读报给莉兹听', cast: [['R', '记者', 'man3'], ['M', '马什小姐', 'woman2'], ['K', '凯特', 'woman1'], ['L', '莉兹', 'woman3']], lines: 'R:talk|M:talk|R:talk|M:talk|M:talk|M:sad|M:talk|K:talk|K:raise|K:talk|K:talk|K:talk|K:talk|K:talk|K:talk|K:talk|K:talk|L:talk' },
  134: { id: 134, scene: '他说了什么', place: '展示台', bg: 'stage', type: 'drill', story: '间接引语操练：said / told / asked', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'woman1']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  135: { id: 135, scene: '最新报道', place: '机场', bg: 'airport', type: 'dialogue', story: '记者追问是否真退休，马什小姐说要问未婚夫——报道又被改写', cast: [['R', '记者', 'man3'], ['M', '马什小姐', 'woman2']], lines: 'R:talk|M:talk|M:talk|M:talk|M:talk|R:talk|R:talk|R:talk' },
  136: { id: 136, scene: '他说他会来', place: '展示台', bg: 'stage', type: 'drill', story: '间接引语时态操练：would leave / couldn\'t do / might return', cast: [['A', '主持人', 'man2'], ['B', '嘉宾', 'man3']], lines: 'A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk|A:talk' },
  137: { id: 137, scene: '如果中了大奖', place: '客厅', bg: 'home', type: 'dialogue', story: '布莱恩填足球彩票做梦：中了买貂皮大衣，朱莉只想环游世界', cast: [['J', '朱莉', 'woman1'], ['B', '布莱恩', 'man1']], lines: 'J:talk|B:talk|B:talk|J:talk|J:talk|B:talk|J:angry|J:talk|B:talk' },
  138: { id: 138, scene: '如果明天下雨', place: '展示台', bg: 'stage', type: 'drill', story: 'if 条件句操练：打破窗户、赶火车、摔倒、下雨', cast: [['A', '主持人', 'man3'], ['B', '嘉宾', 'woman2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  139: { id: 139, scene: '是你吗约翰', place: '电话两头', bg: 'home', type: 'dialogue', story: '特纳先生电话托约翰转告晚饭迟到，约翰却在办公室加班', cast: [['T', '特纳先生', 'elderM'], ['J', '约翰', 'man1']], lines: 'T:talk|J:talk|T:talk|J:talk|T:talk|T:talk|T:talk|J:talk' },
  140: { id: 140, scene: '他问了我什么', place: '展示台', bg: 'stage', type: 'drill', story: '间接疑问句操练：是否忙、去哪里、在做什么', cast: [['A', '主持人', 'woman2'], ['B', '嘉宾', 'boy']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  141: { id: 141, scene: '萨莉第一次坐火车', place: '火车车厢', bg: 'train', type: 'narrative', story: '四岁的萨莉第一次坐火车，问对面化妆的女士"为什么化妆"——"可你还是丑啊"', cast: [['N', '旁白', 'narrator'], ['S', '萨莉', 'girl'], ['L', '中年女士', 'woman3']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|L:wave|N:talk|N:talk|N:talk|N:talk|S:talk|L:talk|N:talk|S:talk|N:talk' },
  142: { id: 142, scene: '谁做的这件事', place: '展示台', bg: 'stage', type: 'drill', story: '被动语态问答：工作、书、信', cast: [['A', '主持人', 'man1'], ['B', '嘉宾', 'man2']], lines: 'A:talk|B:talk|A:talk|B:talk|A:talk|B:talk' },
  143: { id: 143, scene: '林中的垃圾', place: '树林', bg: 'park', type: 'narrative', story: '美景树林被扔满垃圾，牌子写着"乱扔垃圾者将依法惩处"', cast: [['N', '说书人', 'narrator']], lines: 'N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:talk|N:sad|N:point|N:talk|N:point' },
  144: { id: 144, scene: '被罚的警告', place: '树林', bg: 'park', type: 'drill', story: '被动语态操练：垃圾筐、乱扔垃圾、警告牌', cast: [['A', '主持人', 'woman1'], ['B', '嘉宾', 'man3']], lines: 'A:point|B:talk|A:point|B:talk' },
};
