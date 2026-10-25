/**
 * 剧场适配层：把 theaterScripts 的 144 课剧本转换为舞台渲染结构
 * - 站位：按出场人数均分舞台（1 人居中、2 人对峙、3-4 人横排），左半朝右、右半朝左
 * - 手袋等道具：lessonId 1 特判（A 持有 → 第 7 句起 B 持有）
 */
import type { FigureSpec, PropKind } from './PaperFigure';
import {
  LESSON_SCRIPTS,
  ROLE_PRESETS,
  SCRIPT_SCENES,
  SCRIPT_WEATHER,
  parseScriptLines,
  type BgId,
  type LessonScriptV2,
  type LineAction,
  type ShotKind,
  type WeatherKind,
} from '../../data/theater/theaterScripts';

export type { LineAction };

export interface StageRole {
  key: string;
  name: string;
  x: number;
  facing: 1 | -1;
  figure: FigureSpec;
}

export interface StageConfig {
  script: LessonScriptV2;
  roles: StageRole[];
  /** 台词 key → 站位（旁白 N 也映射到说书人位） */
  keyToRole: Record<string, StageRole>;
  /** cast key → 画面原型名（man1/woman2/narrator…），供声音性别判定 */
  roleById: Record<string, string>;
  /** 每句的动作：key → action */
  lineActions: Array<Record<string, LineAction>>;
  /** 本课手持道具：逐句 [道具, 持有者]（undefined = 放下/不在手上） */
  prop?: { perLine: Array<{ item: PropKind; owner: string | undefined } | undefined> };
  /** 分场（编译后，from 升序；未编排分场的课 = 单场全课） */
  scenes: StageScene[];
}

/** 道具编排计划：单道具课用 item+ownerPerLine；道具逐句变化的课（如 L2 文具）用 perLine */
export interface LessonPropPlan {
  item?: PropKind;
  ownerPerLine?: Array<string | undefined>;
  perLine?: Array<[PropKind, string | undefined] | undefined>;
}

/** 一场戏：背景/地点/在场角色/镜头基调 */
export interface StageScene {
  from: number;
  bg: BgId;
  place: string;
  /** 在场 cast key；null = 全员在场 */
  present: string[] | null;
  /** 镜头基调：wide 全景 / medium 中景跟说话者 / close 特写 */
  shot: ShotKind;
}

/** 取第 idx 句所在场（线性扫，每课场数 ≤5） */
export function sceneAt(config: StageConfig, idx: number): StageScene {
  let cur = config.scenes[0];
  for (const s of config.scenes) {
    if (idx >= s.from) cur = s;
    else break;
  }
  return cur;
}

/** 取第 idx 句的天气：句级触发（SCRIPT_WEATHER）优先，缺省无天气 */
export function weatherAt(config: StageConfig, idx: number): WeatherKind | undefined {
  return SCRIPT_WEATHER[config.script.id]?.[Math.max(0, idx)];
}

/** 按人数分配站位（舞台宽 1600，人高约 420） */
function seatRoles(count: number): Array<{ x: number; facing: 1 | -1 }> {
  if (count <= 0) return [];
  if (count === 1) return [{ x: 800, facing: 1 }];
  if (count === 2) return [{ x: 560, facing: 1 }, { x: 1060, facing: -1 }];
  if (count === 3) return [{ x: 400, facing: 1 }, { x: 800, facing: 1 }, { x: 1200, facing: -1 }];
  const xs = [330, 620, 980, 1270];
  const mid = 800;
  return xs.slice(0, count).map((x) => ({ x, facing: x < mid ? (1 as const) : (-1 as const) }));
}

export function getStageConfig(lessonId: number): StageConfig | null {
  const script = LESSON_SCRIPTS[lessonId];
  if (!script) return null;
  const seats = seatRoles(script.cast.length);
  const roles: StageRole[] = script.cast.map(([key, name, role], i) => ({
    key,
    name,
    x: seats[i]?.x ?? 800,
    facing: seats[i]?.facing ?? 1,
    figure: ROLE_PRESETS[role] ?? ROLE_PRESETS.man1,
  }));
  const keyToRole: Record<string, StageRole> = {};
  const roleById: Record<string, string> = {};
  roles.forEach((r, i) => {
    keyToRole[r.key] = r;
    roleById[r.key] = script.cast[i]?.[2] ?? 'man1';
  });
  // 旁白 N：无 cast 时占第一个位（说书人），有 cast 时也允许（说书人额外位）
  const parsed = parseScriptLines(script.lines);
  const lineActions = parsed.map((p) => {
    const map: Record<string, LineAction> = {};
    map[p.key] = p.action;
    return map;
  });
  // 手持道具：按课编排（perLine 统一输出：逐句 {item, owner}；undefined = 放下）
  const plan = SCRIPT_PROPS[lessonId];
  const prop = plan
    ? {
        perLine: parsed.map((_, i): { item: PropKind; owner: string | undefined } | undefined => {
          if (plan.perLine) {
            const e = plan.perLine[i];
            return e ? { item: e[0], owner: e[1] } : undefined;
          }
          const owner = plan.ownerPerLine?.[i];
          return plan.item && owner ? { item: plan.item, owner } : undefined;
        }),
      }
    : undefined;
  // 分场：优先用编排表；未编排的课按课型生成默认镜头节奏——
  //   dialogue/drill = 开场全景定场（第 0 句）→ 对白中景（第 2 句起，说话推近）
  //   narrative = 全景单场（说书人讲故事的画面靠分场背景切换）
  const overrides = SCRIPT_SCENES[lessonId];
  let scenes: StageScene[];
  if (overrides) {
    scenes = overrides
      .map((s) => ({
        from: s.from,
        bg: s.bg ?? script.bg,
        place: s.place ?? script.place,
        present: s.present ?? null,
        shot: s.shot ?? ('medium' as ShotKind),
      }))
      .sort((a, b) => a.from - b.from);
    if (scenes[0].from !== 0) {
      scenes.unshift({ from: 0, bg: script.bg, place: script.place, present: null, shot: 'wide' });
    }
  } else if (script.type === 'narrative') {
    scenes = [{ from: 0, bg: script.bg, place: script.place, present: null, shot: 'wide' }];
  } else {
    const secondFrom = Math.min(2, Math.max(1, lineActions.length - 1));
    scenes = [
      { from: 0, bg: script.bg, place: script.place, present: null, shot: 'wide' },
      { from: secondFrom, bg: script.bg, place: script.place, present: null, shot: 'medium' },
    ];
  }
  return { script, roles, keyToRole, roleById, lineActions, prop, scenes };
}

/**
 * 手持道具编排表：对白核心围绕"手持/递接物品"的课逐课编排。
 * 单道具课用 item+ownerPerLine；道具逐句变化（L2 文具四连问）用 perLine。
 * 道具作为子元素挂在持有者手臂上随臂转动（PaperFigure propSvg）。
 */
export const SCRIPT_PROPS: Record<number, LessonPropPlan> = {
  // L1 街边的手提包：前 6 句路人拿，确认失主后归还原主
  1: { item: 'bag', ownerPerLine: ['A', 'A', 'A', 'A', 'A', 'A', 'B'] },
  // L11 谁的衬衫：老师全程拿着衬衫对质 → [14] Catch! 抛还给蒂姆
  11: {
    item: 'shirt',
    ownerPerLine: ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'M'],
  },
  // L15 海关检查：[7] Are these your cases? 官员指箱子 → [10] 女孩出示
  15: {
    item: 'suitcase',
    ownerPerLine: [undefined, undefined, undefined, undefined, undefined, undefined, 'O', 'O', 'O', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
  },
  // L2 讲台上的文具：老师逐句拿 pen→pencil→book→watch 询问学生（道具跟台词走）
  2: {
    perLine: [
      ['pen', 'A'], ['pen', 'A'],
      ['pencil', 'A'], ['pencil', 'A'],
      ['book', 'A'], ['book', 'A'],
      ['watch', 'A'], ['watch', 'A'],
    ],
  },
  // L3 五号寄存伞：寄存处递伞（[4] Here's your umbrella 起归顾客）
  3: { item: 'umbrella', ownerPerLine: ['S', 'S', 'S', 'S', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C'] },
  // L19 公园里的冰淇淋：[7] 妈妈把甜筒递给孩子们
  19: {
    perLine: [
      undefined, undefined, undefined, undefined, undefined, undefined,
      ['icecream', 'M'], ['icecream', 'C'], ['icecream', 'C'], ['icecream', 'C'], undefined,
    ],
  },
  // L21 拿那本红书：简两本两本地拿给先生看，[8] 先生接过
  21: { item: 'book', ownerPerLine: [undefined, 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'M'] },
  // L23 架子上的玻璃杯：简取杯递给先生，[8] 先生端着
  23: { item: 'glasses', ownerPerLine: [undefined, 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'M'] },
  // L37 做书架：[3] 乔治要锤子 → [4-5] 丹挑选 → [6] 递过去，乔治一直拿着
  37: {
    perLine: [
      undefined, undefined, undefined, undefined, ['hammer', 'D'], ['hammer', 'D'],
      ['hammer', 'G'], ['hammer', 'G'], ['hammer', 'G'], ['hammer', 'G'], ['hammer', 'G'],
      ['hammer', 'G'], ['hammer', 'G'], ['hammer', 'G'], ['hammer', 'G'], ['hammer', 'G'],
    ],
  },
  // L39 别摔了花瓶：彭妮先拿 → [3] 递给萨姆折腾 → [10] 放上架子放下
  39: {
    item: 'vase',
    ownerPerLine: ['P', 'P', 'P', 'S', 'S', 'S', 'S', 'S', 'S', 'S', undefined, undefined, undefined],
  },
  // L41 彭妮的购物包：[0-1] 彭妮拎包 → [2] 放到椅子上（倒出东西聊）
  41: { item: 'bag', ownerPerLine: ['P', 'P', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined] },
  // L45 老板的信：信在老板手里 → [10] 鲍勃转交帕梅拉
  45: {
    item: 'envelope',
    ownerPerLine: [
      'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
      'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    ],
  },
  // L47 一杯黑咖啡：[3] 安接过咖啡杯
  47: { item: 'cup', ownerPerLine: [undefined, undefined, undefined, 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'] },
  // L65 给不给钥匙：[10] 爸爸递钥匙，吉尔拿着走出画面
  65: { item: 'key', ownerPerLine: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J'] },
  // L97 拿错的箱子：[4] 服务员搬出箱子对质 → [8] 霍尔先生接过细看
  97: {
    perLine: [
      undefined, undefined, undefined, undefined,
      ['suitcase', 'A'], ['suitcase', 'A'], ['suitcase', 'A'], ['suitcase', 'A'],
      ['suitcase', 'H'], ['suitcase', 'H'], ['suitcase', 'H'], ['suitcase', 'H'],
      ['suitcase', 'H'], ['suitcase', 'H'], ['suitcase', 'H'], ['suitcase', 'H'],
      ['suitcase', 'H'], ['suitcase', 'H'], ['suitcase', 'H'], ['suitcase', 'H'],
    ],
  },
  // L101 吉米的明信片：彭妮全程拿着读给耳背的奶奶听
  101: {
    item: 'card',
    ownerPerLine: Array.from({ length: 21 }, () => 'P'),
  },
  // L109 来杯咖啡：[2] 鲍勃端上咖啡 → [10] 简续杯自己端着
  109: {
    perLine: [
      undefined, undefined, ['cup', 'B'], ['cup', 'B'], ['cup', 'B'], ['cup', 'B'],
      ['cup', 'B'], ['cup', 'B'], ['cup', 'B'], ['cup', 'B'],
      ['cup', 'J'], ['cup', 'J'], ['cup', 'J'], ['cup', 'J'], ['cup', 'J'],
    ],
  },
  // L123 澳大利亚的照片：[0] 比尔递照片 → [1] 鲍勃接过去看
  123: {
    perLine: [
      ['photo', 'B'], ['photo', 'O'], ['photo', 'O'], ['photo', 'O'],
      ['photo', 'O'], ['photo', 'O'], ['photo', 'O'], ['photo', 'O'],
    ],
  },
  // L121 戴帽子的男人：[10] 顾客拿出帽子 → [12] 戴上（从手中消失）
  121: {
    perLine: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      ['hat', 'C'], ['hat', 'C'], undefined, undefined, undefined, undefined, undefined,
    ],
  },
  // L133 轰动新闻：[8] 凯特买回报纸念给莉兹听
  133: {
    perLine: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      ['newspaper', 'K'], ['newspaper', 'K'], ['newspaper', 'K'], ['newspaper', 'K'],
      ['newspaper', 'K'], ['newspaper', 'K'], ['newspaper', 'K'], ['newspaper', 'K'],
      ['newspaper', 'K'], undefined,
    ],
  },
};
