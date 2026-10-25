/** 分场编排校验：from/句界/present/shot 合法 + walkin 句必须在场 */
import { LESSON_SCRIPTS, SCRIPT_SCENES, parseScriptLines } from '../src/data/theater/theaterScripts';
import { completeLessons } from '../src/data/lessons/completeLessons';
import { getStageConfig, sceneAt } from '../src/components/theater/scenes';

const BG_IDS = new Set(['street', 'classroom', 'home', 'kitchen', 'shop', 'park', 'station', 'office', 'stage', 'train', 'bus', 'airport', 'night', 'living', 'river']);
const SHOTS = new Set(['wide', 'medium', 'close']);
let bad = 0;

// 1) 编排表静态校验
for (const [idStr, scenes] of Object.entries(SCRIPT_SCENES)) {
  const id = Number(idStr);
  const script = LESSON_SCRIPTS[id];
  const lineCount = parseScriptLines(script.lines).length;
  const castKeys = new Set(script.cast.map((c) => c[0]));
  if (scenes[0].from !== 0) { console.log(`✗ L${id} 首场 from≠0`); bad++; }
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    if (i > 0 && s.from <= scenes[i - 1].from) { console.log(`✗ L${id} 场${i} from 不递增`); bad++; }
    if (s.from >= lineCount) { console.log(`✗ L${id} 场${i} from=${s.from} 越句界(${lineCount})`); bad++; }
    if (s.bg && !BG_IDS.has(s.bg)) { console.log(`✗ L${id} 场${i} bg 非法 ${s.bg}`); bad++; }
    if (s.shot && !SHOTS.has(s.shot)) { console.log(`✗ L${id} 场${i} shot 非法 ${s.shot}`); bad++; }
    for (const k of s.present ?? []) {
      if (!castKeys.has(k)) { console.log(`✗ L${id} 场${i} present "${k}" ∉ cast`); bad++; }
    }
  }
}

// 2) 全 144 课编译校验：句数齐 + scenes 覆盖到末句 + walkin/walkout 在场
for (const lesson of completeLessons) {
  const id = lesson.id;
  const script = LESSON_SCRIPTS[id];
  if (!script) { console.log(`✗ L${id} 无剧本`); bad++; continue; }
  const paraCount = lesson.content.text.paragraphs.length;
  const cfg = getStageConfig(id);
  if (!cfg) { console.log(`✗ L${id} 配置为空`); bad++; continue; }
  if (cfg.lineActions.length !== paraCount) { console.log(`✗ L${id} 句数 剧本=${cfg.lineActions.length} 课文=${paraCount}`); bad++; }
  if (cfg.scenes[cfg.scenes.length - 1].from > paraCount - 1) { console.log(`✗ L${id} 末场 from 越界`); bad++; }
  const castKeys = new Set(script.cast.map((c) => c[0]));
  cfg.lineActions.forEach((acts, i) => {
    const sc = sceneAt(cfg, i);
    for (const [k, a] of Object.entries(acts)) {
      if (!castKeys.has(k)) { console.log(`✗ L${id} 句${i} key "${k}" ∉ cast`); bad++; }
      if ((a === 'walkin' || a === 'walkout') && sc.present && !sc.present.includes(k)) {
        console.log(`✗ L${id} 句${i} ${a} 但 "${k}" 不在该场 present`);
        bad++;
      }
    }
  });
}

console.log(bad === 0 ? '✅ 144 课编排全部合法' : `❌ ${bad} 处问题`);
