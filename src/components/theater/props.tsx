/**
 * 舞台层道具渲染（TheaterStage 飞行/递接动画用）
 *
 * 与 PaperFigure 内的 propSvg 使用同一套道具绘制代码（17 种手持道具，
 * 颜色经主题 HSL 变换、描边随主题）。PaperFigure 内的副本负责"静态挂手臂"，
 * 本模块负责"递接瞬间在两人手坐标之间飞行"。改动道具造型需两处同步。
 */
import React from 'react';
import { transformColor, type StyleTheme } from '../../data/theater/theaterStyles';
import type { PropKind } from './PaperFigure';

/** 以 (x,110) 为手部锚点绘制道具（与 PaperFigure 手部坐标一致） */
export function renderStageProp(held: PropKind, x: number, th: StyleTheme): React.ReactElement {
  const tc = (hex: string) => transformColor(hex, th);
  const sw = th.stroke.width > 0 ? th.stroke.color : 'none';
  const line = sw === 'none' ? '#3a3230' : sw;
  const strokeColor = sw;
  const strokeWidth = th.stroke.width;
  switch (held) {
    case 'bag':
      return (
        <g>
          <path
            d={`M${x - 9} 112 Q${x} 103 ${x + 9} 112`}
            fill="none"
            stroke={line}
            strokeWidth={strokeWidth > 0 ? strokeWidth * 0.85 : 2.6}
            strokeLinecap="round"
          />
          <path
            d={`M${x - 12} 113 L${x + 12} 113 L${x + 9.5} 137 L${x - 9.5} 137 Z`}
            fill={tc('#b5651d')}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <path d={`M${x - 9.5} 137 L${x + 9.5} 137 L${x + 8.6} 130 L${x - 8.6} 130 Z`} fill="rgba(0,0,0,0.14)" />
        </g>
      );
    case 'vase':
      return (
        <g>
          <path
            d={`M${x - 13} 116 Q${x - 16} 136 ${x - 8} 150 L${x + 8} 150 Q${x + 16} 136 ${x + 13} 116 Z`}
            fill={tc('#d96f5e')}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <rect x={x - 7} y={109} width={14} height={9} rx={2} fill={tc('#c9564a')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <path d={`M${x - 8} 132 Q${x} 139 ${x + 8} 132`} stroke={tc('#f3d1c0')} strokeWidth={2.4} fill="none" />
        </g>
      );
    case 'umbrella':
      return (
        <g transform={`rotate(16 ${x} 110)`}>
          <rect x={x - 4} y={74} width={8} height={70} rx={4} fill={tc('#4f6d7a')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d={`M${x - 4} 144 q0 9 9 9`} stroke={line} strokeWidth={3.2} fill="none" strokeLinecap="round" />
          <path d={`M${x - 4} 82 h8 M${x - 4} 96 h8 M${x - 4} 110 h8`} stroke={tc('#7db3cc')} strokeWidth={2} />
        </g>
      );
    case 'book':
      return (
        <g>
          <path
            d={`M${x - 20} 112 Q${x - 10} 104 ${x} 110 Q${x + 10} 104 ${x + 20} 112 L${x + 20} 132 Q${x + 10} 126 ${x} 130 Q${x - 10} 126 ${x - 20} 132 Z`}
            fill={tc('#faf3e6')}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <line x1={x} y1={110} x2={x} y2={130} stroke={line} strokeWidth={2.2} />
          <path d={`M${x - 14} 116 h8 M${x - 14} 122 h9 M${x + 6} 116 h8 M${x + 6} 122 h9`} stroke={tc('#b8a67f')} strokeWidth={1.6} />
        </g>
      );
    case 'envelope':
      return (
        <g>
          <rect x={x - 18} y={112} width={36} height={25} rx={2} fill={tc('#f3ead9')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d={`M${x - 18} 113 L${x} 127 L${x + 18} 113`} stroke={line} strokeWidth={2.2} fill="none" />
          <circle cx={x + 11} cy={132} r={3.4} fill={tc('#c9564a')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'card':
      return (
        <g>
          <rect x={x - 17} y={112} width={34} height={24} rx={2} fill={tc('#e8f4fb')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={x + 6} y={116} width={8} height={10} fill={tc('#d96f5e')} stroke={line} strokeWidth={1.2} />
          <path d={`M${x - 12} 119 h13 M${x - 12} 124 h16 M${x - 12} 129 h14`} stroke={line} strokeWidth={1.6} />
        </g>
      );
    case 'suitcase':
      return (
        <g>
          <path d={`M${x - 8} 116 v-7 h16 v7`} stroke={line} strokeWidth={3.2} fill="none" />
          <rect x={x - 17} y={116} width={34} height={42} rx={6} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={x - 17} y1={131} x2={x + 17} y2={131} stroke={tc('#6b4a2f')} strokeWidth={2.4} />
          <rect x={x - 5} y={122} width={10} height={7} rx={2} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'pen':
      return (
        <g transform={`rotate(-28 ${x} 110)`}>
          <rect x={x - 2.4} y={86} width={4.8} height={26} rx={2} fill={tc('#22303f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={x - 2.4} y={110} width={4.8} height={14} fill={tc('#c8a878')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <path d={`M${x - 2.4} 124 L${x} 132 L${x + 2.4} 124 Z`} fill={tc('#8a7f6f')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'pencil':
      return (
        <g transform={`rotate(26 ${x} 110)`}>
          <rect x={x - 2.6} y={80} width={5.2} height={5} fill={tc('#d96f5e')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={x - 2.6} y={85} width={5.2} height={31} fill={tc('#e0a458')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <path d={`M${x - 2.6} 116 L${x} 126 L${x + 2.6} 116 Z`} fill={tc('#e8d9b8')} stroke={line} strokeWidth={1.3} />
          <path d={`M${x - 1.4} 126 l1.4 4 l1.4 -4 Z`} fill="#3a3230" />
        </g>
      );
    case 'watch':
      return (
        <g>
          <rect x={x - 9} y={100} width={18} height={20} rx={4} fill={tc('#4f6d7a')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <circle cx={x} cy={110} r={11} fill={tc('#e8f4fb')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={x} y1={110} x2={x} y2={103} stroke={line} strokeWidth={1.8} strokeLinecap="round" />
          <line x1={x} y1={110} x2={x + 5} y2={112} stroke={line} strokeWidth={1.8} strokeLinecap="round" />
        </g>
      );
    case 'glasses':
      return (
        <g>
          <path
            d={`M${x - 9} 112 L${x - 7} 136 L${x + 7} 136 L${x + 9} 112 Z`}
            fill={tc('#cfe8f5')}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <path d={`M${x - 8} 120 h16 M${x - 7.5} 127 h15`} stroke={tc('#9ecbe0')} strokeWidth={2} />
        </g>
      );
    case 'icecream':
      return (
        <g>
          <circle cx={x - 4} cy={112} r={7} fill={tc('#f3d1c0')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <circle cx={x + 4} cy={114} r={7} fill={tc('#a8503f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <circle cx={x} cy={106} r={7} fill={tc('#f7e8a0')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <path d={`M${x - 8} 118 L${x} 146 L${x + 8} 118 Z`} fill={tc('#e0a458')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d={`M${x - 8} 118 l16 0 M${x - 5} 127 l10 0`} stroke={tc('#b8823f')} strokeWidth={1.6} />
        </g>
      );
    case 'hammer':
      return (
        <g transform={`rotate(-35 ${x} 110)`}>
          <rect x={x - 2.8} y={98} width={5.6} height={40} rx={2.5} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={x - 12} y={86} width={24} height={13} rx={3} fill={tc('#55606b')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
        </g>
      );
    case 'cup':
      return (
        <g>
          <path d={`M${x - 10} 112 L${x - 8} 132 L${x + 8} 132 L${x + 10} 112 Z`} fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d={`M${x + 10} 116 q8 2 0 12`} stroke={line} strokeWidth={2.6} fill="none" />
          <path d={`M${x - 7} 118 h14`} stroke={tc('#7a4a3a')} strokeWidth={2.4} />
        </g>
      );
    case 'key':
      return (
        <g transform={`rotate(20 ${x} 110)`}>
          <circle cx={x} cy={100} r={5.5} fill="none" stroke={tc('#c8a878')} strokeWidth={3.2} />
          <rect x={x - 1.6} y={105} width={3.2} height={26} rx={1.5} fill={tc('#c8a878')} stroke={line} strokeWidth={1.2} />
          <path d={`M${x + 1.6} 122 h6 M${x + 1.6} 128 h5`} stroke={tc('#c8a878')} strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    case 'newspaper':
      return (
        <g>
          <rect x={x - 20} y={104} width={40} height={34} rx={2} fill={tc('#f3ead9')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={x - 16} y={108} width={22} height={9} fill={tc('#55606b')} />
          <path d={`M${x - 16} 122 h32 M${x - 16} 127 h32 M${x - 16} 132 h20`} stroke={tc('#b8a67f')} strokeWidth={1.8} />
        </g>
      );
    case 'photo':
      return (
        <g>
          <rect x={x - 18} y={106} width={36} height={30} rx={2} fill={tc('#ffffff')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={x - 14} y={110} width={28} height={16} fill={tc('#8fbc78')} stroke={tc('#7db3cc')} strokeWidth={1.6} />
          <circle cx={x + 8} cy={115} r={3.5} fill={tc('#f7e8a0')} />
          <path d={`M${x - 12} 132 h18`} stroke={tc('#b8a67f')} strokeWidth={1.6} />
        </g>
      );
    case 'shirt':
      return (
        <g>
          <path
            d={`M${x - 16} 112 L${x - 8} 108 L${x} 114 L${x + 8} 108 L${x + 16} 112 L${x + 13} 140 L${x - 13} 140 Z`}
            fill={tc('#f7f3ea')}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <path d={`M${x - 8} 108 L${x} 114 L${x + 8} 108`} fill="none" stroke={line} strokeWidth={2} />
        </g>
      );
    case 'hat':
      return (
        <g>
          <path
            d={`M${x - 13} 114 Q${x - 11} 100 ${x} 100 Q${x + 11} 100 ${x + 13} 114 Z`}
            fill={tc('#3d5a80')}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <ellipse cx={x} cy={116} rx={21} ry={5.5} fill={tc('#3d5a80')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d={`M${x - 8} 108 Q${x} 103 ${x + 8} 108`} fill="none" stroke={tc('#9ebd77')} strokeWidth={2.4} />
        </g>
      );
    default:
      return <g />;
  }
}

/**
 * 地面/墙上舞台物品（以 (0,0) 为底部中心向上画，外层按 size/100 缩放摆放）。
 * 与手挂道具（renderStageProp）不同：这些是大件布景（箱/鞋/窗/门/茶壶/书橱），
 * 随台词出现在场景中并留存（TheaterStage SCRIPT_STAGE_ITEMS 层）。
 *
 * 尺寸语义：size = 物品世界高度（人物高约 418）。各 case 的局部绘制高不一，
 * 由 NORMALIZE 系数统一归一到"局部高 100"，保证 size 即最终世界高度。
 */
const NORMALIZE: Record<string, number> = {
  shoes: 2.9, teapot: 1.75, book: 2.9, plate: 4.5, dish: 2.9, bread: 2.6, cake: 1.6,
  chocolate: 5.5, biscuit: 3.1, cheese: 3.3, jam: 2.1, butter: 5, sugar: 2, apple: 2.1,
  letter: 4.2, ticket: 6.2, passport: 3.6, money: 5, coat: 1.2, blouse: 2,
  dog: 1.55, cat: 1.4, bird: 2.4, soap: 2.9, cup: 2.4, kettle: 1.65, glass: 1.8,
  tea: 1.4, coffee: 1.55, beer: 1.2, suitcase: 1.5, hat: 1.75, shirt: 1.8, bag: 1.3,
  photo: 1.7, newspaper: 1.85, stereo: 1.4, bed: 1.3, table: 1.25, desk: 1.25,
  hammer: 1.3, tie: 1.1, milk: 1.05, wine: 1.05, bottle: 1.1, television: 1.1,
  radio: 1.1, car: 1.15, bookcase: 0.77, wardrobe: 0.54, fridge: 0.53,
  lamp: 0.85, cupboard: 0.88, door: 0.93, swimmer: 2.3, aeroplane: 0.7,
  sleeping: 1.3, basin: 3.3,
};
export { NORMALIZE };

export function renderFloorItem(
  kind:
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
    | 'swimmer' | 'aeroplane' | 'sleeping' | 'basin',
  th: StyleTheme,
): React.ReactElement {
  const drawn = drawFloorItem(kind, th);
  const k = NORMALIZE[kind];
  return k ? <g transform={`scale(${k})`}>{drawn}</g> : drawn;
}

function drawFloorItem(
  kind: Parameters<typeof renderFloorItem>[0],
  th: StyleTheme,
): React.ReactElement {
  const tc = (hex: string) => transformColor(hex, th);
  const sw = th.stroke.width > 0 ? th.stroke.color : 'none';
  const line = sw === 'none' ? '#3a3230' : sw;
  const strokeColor = sw;
  const strokeWidth = th.stroke.width;
  switch (kind) {
    case 'box':
      // 大纸箱：瓦楞箱体 + 胶带（高约 100）
      return (
        <g>
          <path d="M-52 -92 L-44 -100 L44 -100 L52 -92 L52 0 L-52 0 Z" fill={tc('#c8955e')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M0 -96 L0 0 M-52 -92 L0 -60 L52 -92" fill="none" stroke={line} strokeWidth={2.4} />
          <rect x={-16} y={-58} width={32} height={22} rx={3} fill={tc('#f3ead9')} stroke={line} strokeWidth={1.8} />
        </g>
      );
    case 'shoes':
      // 一双鞋（侧面小鞋 ×2，高约 36）
      return (
        <g>
          <path d="M-46 -14 Q-46 -34 -24 -34 Q-6 -34 -2 -16 L-2 -14 Q0 -4 -8 -4 L-40 -4 Q-46 -4 -46 -14 Z" fill={tc('#a8503f')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-40 -4 h34" stroke={tc('#f3d1c0')} strokeWidth={2.4} />
          <path d="M22 -12 Q22 -30 42 -30 Q58 -30 62 -14 L62 -12 Q64 -4 56 -4 L28 -4 Q22 -4 22 -12 Z" fill={tc('#c9564a')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M28 -4 h30" stroke={tc('#f3d1c0')} strokeWidth={2.4} />
        </g>
      );
    case 'window':
      // 开着的窗：双扇内开（能看到窗外天空）
      return (
        <g>
          <rect x={-70} y={-100} width={140} height={100} fill="#cfe8f5" stroke={line} strokeWidth={strokeWidth} />
          <path d="M-70 -100 L-96 -8 L-70 -18 Z" fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M70 -100 L96 -8 L70 -18 Z" fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x={-70} y={-100} width={140} height={100} fill="none" stroke={line} strokeWidth={strokeWidth} />
          <line x1={0} y1={-100} x2={0} y2={0} stroke={line} strokeWidth={3} />
          <circle cx={-34} cy={-70} r={10} fill={tc('#f7e8a0')} opacity={0.8} />
        </g>
      );
    case 'door':
      // 关着的门：门框 + 门板 + 把手
      return (
        <g>
          <rect x={-64} y={-108} width={128} height={108} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-54} y={-100} width={108} height={100} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-40} y={-86} width={36} height={72} rx={4} fill="none" stroke={line} strokeWidth={2.4} />
          <rect x={4} y={-86} width={36} height={72} rx={4} fill="none" stroke={line} strokeWidth={2.4} />
          <circle cx={44} cy={-50} r={6} fill={tc('#f7e8a0')} stroke={line} strokeWidth={2} />
        </g>
      );
    case 'teapot':
      // 茶壶：壶身 + 壶嘴 + 柄
      return (
        <g>
          <ellipse cx={0} cy={-24} rx={30} ry={24} fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-28 -34 Q-48 -40 -46 -18" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
          <path d="M28 -32 Q48 -30 40 -14" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
          <rect x={-10} y={-56} width={20} height={10} rx={3} fill={tc('#46787a')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <ellipse cx={0} cy={-8} rx={34} ry={7} fill={tc('#46787a')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
        </g>
      );
    case 'bookcase':
      // 粉红色书橱：外框 + 三层格（L37 乔治做的那个）
      return (
        <g>
          <rect x={-55} y={-130} width={110} height={130} fill={tc('#e8a0b4')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={-55} y1={-88} x2={55} y2={-88} stroke={line} strokeWidth={3} />
          <line x1={-55} y1={-44} x2={55} y2={-44} stroke={line} strokeWidth={3} />
          <line x1={0} y1={-130} x2={0} y2={-88} stroke={line} strokeWidth={2.4} />
          <g fill={tc('#f3ead9')} stroke={line} strokeWidth={1.6}>
            <rect x={-46} y={-116} width={12} height={26} />
            <rect x={-28} y={-112} width={12} height={22} />
            <rect x={22} y={-114} width={14} height={24} />
            <rect x={-44} y={-72} width={14} height={26} />
            <rect x={28} y={-74} width={12} height={28} />
            <rect x={-40} y={-30} width={12} height={24} />
            <rect x={30} y={-28} width={14} height={22} />
          </g>
        </g>
      );
    case 'book':
      // 摊开的书（立在地面展示）
      return (
        <g>
          <path
            d={`M-40 -30 Q-20 -42 0 -34 Q20 -42 40 -30 L40 -4 Q20 -12 0 -6 Q-20 -12 -40 -4 Z`}
            fill={tc('#faf3e6')}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <line x1={0} y1={-34} x2={0} y2={-6} stroke={line} strokeWidth={2.4} />
          <path d={`M-32 -24 h20 M-32 -16 h22 M12 -24 h20 M12 -16 h22`} stroke={tc('#b8a67f')} strokeWidth={1.8} />
        </g>
      );
    case 'clock':
      // 圆挂钟（高约 96）
      return (
        <g>
          <circle cx={0} cy={-48} r={48} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={0} cy={-48} r={40} fill={tc('#f4f2ec')} stroke={line} strokeWidth={2.4} />
          <g stroke={line} strokeWidth={2.4} strokeLinecap="round">
            <path d="M0 -84 v7 M0 -12 v7 M-33 -48 h7 M7 -48 h7" />
          </g>
          <line x1={0} y1={-48} x2={0} y2={-70} stroke={line} strokeWidth={3} strokeLinecap="round" />
          <line x1={0} y1={-48} x2={15} y2={-42} stroke={line} strokeWidth={3} strokeLinecap="round" />
          <circle cx={0} cy={-48} r={3.4} fill={line} />
        </g>
      );
    case 'table':
      // 餐桌（宽 160 高 80）
      return (
        <g>
          <rect x={-80} y={-80} width={160} height={13} rx={5} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-74} y={-67} width={14} height={67} fill={tc('#8a6a42')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={60} y={-67} width={14} height={67} fill={tc('#8a6a42')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
        </g>
      );
    case 'desk':
      // 书桌（宽 140 高 80，侧板式）
      return (
        <g>
          <rect x={-70} y={-80} width={140} height={12} rx={4} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-70} y={-68} width={14} height={68} fill={tc('#8a7f6f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={56} y={-68} width={14} height={68} fill={tc('#8a7f6f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={-40} y={-52} width={80} height={34} rx={3} fill={tc('#9a8f7f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
        </g>
      );
    case 'chair':
      // 椅子（高 100 宽 70）
      return (
        <g>
          <rect x={-28} y={-100} width={56} height={48} rx={8} fill={tc('#c98686')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-35} y={-55} width={70} height={12} rx={4} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-32} y={-43} width={9} height={43} fill={tc('#8a6a42')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={23} y={-43} width={9} height={43} fill={tc('#8a6a42')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
        </g>
      );
    case 'armchair':
      // 扶手椅（高 95 宽 100）
      return (
        <g>
          <rect x={-40} y={-95} width={80} height={50} rx={14} fill={tc('#c98686')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-50} y={-62} width={16} height={46} rx={7} fill={tc('#d49a9a')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={34} y={-62} width={16} height={46} rx={7} fill={tc('#d49a9a')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-40} y={-30} width={80} height={24} rx={8} fill={tc('#b57474')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-44} y={-8} width={10} height={8} fill={tc('#8a6a42')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={34} y={-8} width={10} height={8} fill={tc('#8a6a42')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
        </g>
      );
    case 'bed':
      // 床（侧视，宽 190 高 75）
      return (
        <g>
          <rect x={-95} y={-75} width={16} height={75} rx={4} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-95} y={-40} width={182} height={22} rx={6} fill={tc('#e8e2d0')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-88} y={-54} width={34} height={16} rx={7} fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={-48} y={-46} width={135} height={12} rx={5} fill={tc('#7fb069')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={-92} y={-18} width={9} height={18} fill={tc('#6b4a2f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={78} y={-18} width={9} height={18} fill={tc('#6b4a2f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
        </g>
      );
    case 'wardrobe':
      // 大衣柜（高 180 宽 110）
      return (
        <g>
          <rect x={-58} y={-186} width={116} height={10} rx={3} fill={tc('#6b4a2f')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-55} y={-176} width={110} height={176} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={0} y1={-176} x2={0} y2={0} stroke={line} strokeWidth={3} />
          <circle cx={-9} cy={-88} r={4.5} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.6} />
          <circle cx={9} cy={-88} r={4.5} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.6} />
        </g>
      );
    case 'cupboard':
      // 碗柜（高 110 宽 100）
      return (
        <g>
          <rect x={-54} y={-114} width={108} height={10} rx={3} fill={tc('#8a6a42')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-50} y={-104} width={100} height={104} fill={tc('#c8955e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={0} y1={-104} x2={0} y2={0} stroke={line} strokeWidth={2.6} />
          <circle cx={-8} cy={-52} r={4} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.4} />
          <circle cx={8} cy={-52} r={4} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'television':
      // 电视机（宽 110 高 90）
      return (
        <g>
          <rect x={-55} y={-88} width={110} height={72} rx={8} fill={tc('#4a4238')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-45} y={-79} width={90} height={54} rx={4} fill={tc('#9ecbe0')} stroke={line} strokeWidth={2} />
          <path d="M-38 -40 Q-10 -66 30 -46" fill="none" stroke={tc('#cfe8f5')} strokeWidth={3} />
          <rect x={-16} y={-16} width={32} height={9} fill={tc('#3a3230')} />
          <ellipse cx={0} cy={-5} rx={34} ry={6} fill={tc('#3a3230')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
        </g>
      );
    case 'radio':
      // 收音机（宽 90 高 60，带天线）
      return (
        <g>
          <line x1={20} y1={-52} x2={44} y2={-92} stroke={line} strokeWidth={3} strokeLinecap="round" />
          <rect x={-45} y={-52} width={90} height={52} rx={8} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={-20} cy={-26} r={16} fill={tc('#c8b088')} stroke={line} strokeWidth={2.2} />
          <circle cx={-20} cy={-26} r={6} fill={tc('#6b4a2f')} />
          <circle cx={22} cy={-26} r={12} fill={tc('#f7e8a0')} stroke={line} strokeWidth={2.2} />
          <line x1={12} y1={-26} x2={32} y2={-26} stroke={line} strokeWidth={2} />
        </g>
      );
    case 'lamp':
      // 落地灯（高 120）
      return (
        <g>
          <ellipse cx={0} cy={-4} rx={26} ry={6} fill={tc('#55606b')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={-3} y={-88} width={6} height={84} fill={tc('#55606b')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <path d="M-32 -120 L32 -120 L24 -86 L-24 -86 Z" fill={tc('#f7e8a0')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
        </g>
      );
    case 'stereo':
      // 音响（宽 100 高 70）
      return (
        <g>
          <rect x={-50} y={-70} width={100} height={70} rx={6} fill={tc('#55606b')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={-24} cy={-33} r={21} fill={tc('#2f3a4a')} stroke={line} strokeWidth={2.2} />
          <circle cx={-24} cy={-33} r={8} fill={tc('#4a5a6a')} />
          <circle cx={24} cy={-33} r={21} fill={tc('#2f3a4a')} stroke={line} strokeWidth={2.2} />
          <circle cx={24} cy={-33} r={8} fill={tc('#4a5a6a')} />
          <rect x={-42} y={-64} width={30} height={6} rx={2} fill={tc('#f7e8a0')} />
        </g>
      );
    case 'fridge':
      // 冰箱（高 190 宽 70）
      return (
        <g>
          <rect x={-35} y={-190} width={70} height={190} rx={8} fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={-35} y1={-128} x2={35} y2={-128} stroke={line} strokeWidth={2.6} />
          <rect x={22} y={-172} width={7} height={32} rx={3} fill={tc('#b8b4aa')} stroke={line} strokeWidth={1.4} />
          <rect x={22} y={-118} width={7} height={38} rx={3} fill={tc('#b8b4aa')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'milk':
      // 牛奶瓶（高 88，白瓶蓝标）
      return (
        <g>
          <path d="M-7 -88 L7 -88 L7 -66 Q22 -56 22 -30 L22 -8 Q22 0 14 0 L-14 0 Q-22 0 -22 -8 L-22 -30 Q-22 -56 -7 -66 Z" fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x={-10} y={-92} width={20} height={8} rx={3} fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={-18} y={-42} width={36} height={20} rx={3} fill={tc('#a9d6ef')} stroke={line} strokeWidth={1.6} />
        </g>
      );
    case 'beer':
      // 啤酒瓶（高 78，棕瓶黄标）
      return (
        <g>
          <path d="M-6 -78 L6 -78 L6 -60 Q18 -52 18 -28 L18 -7 Q18 0 11 0 L-11 0 Q-18 0 -18 -7 L-18 -28 Q-18 -52 -6 -60 Z" fill={tc('#8a5a2b')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x={-9} y={-82} width={18} height={7} rx={2.5} fill={tc('#c8a878')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={-15} y={-38} width={30} height={18} rx={3} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.6} />
        </g>
      );
    case 'wine':
      // 葡萄酒瓶（高 92，深绿瓶红标）
      return (
        <g>
          <path d="M-5 -92 L5 -92 L5 -68 Q19 -58 19 -30 L19 -7 Q19 0 12 0 L-12 0 Q-19 0 -19 -7 L-19 -30 Q-19 -58 -5 -68 Z" fill={tc('#3d5a48')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x={-7} y={-96} width={14} height={9} rx={2} fill={tc('#a8503f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={-14} y={-40} width={28} height={20} rx={3} fill={tc('#d96f5e')} stroke={line} strokeWidth={1.6} />
        </g>
      );
    case 'bottle':
      // 水瓶（高 88，蓝水）
      return (
        <g>
          <path d="M-7 -88 L7 -88 L7 -64 Q21 -55 21 -30 L21 -8 Q21 0 13 0 L-13 0 Q-21 0 -21 -8 L-21 -30 Q-21 -55 -7 -64 Z" fill={tc('#cfe8f5')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x={-10} y={-92} width={20} height={8} rx={3} fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <path d="M-19 -30 L19 -30 L19 -8 Q19 0 13 0 L-13 0 Q-19 0 -19 -8 Z" fill={tc('#9ecbe0')} />
        </g>
      );
    case 'tea':
      // 茶杯+茶托（高 60，琥珀茶色）
      return (
        <g>
          <ellipse cx={0} cy={-5} rx={34} ry={8} fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-20 -48 L-17 -14 Q-16 -10 -10 -10 L10 -10 Q16 -10 17 -14 L20 -48 Z" fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M20 -44 Q30 -40 22 -28" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <ellipse cx={0} cy={-44} rx={19} ry={5} fill={tc('#c8823c')} stroke={line} strokeWidth={1.6} />
          <path d="M-8 -60 Q-11 -66 -8 -72 M4 -60 Q1 -66 4 -72" fill="none" stroke={tc('#b8b4aa')} strokeWidth={2.2} strokeLinecap="round" />
        </g>
      );
    case 'coffee':
      // 咖啡杯（高 58，深咖啡）
      return (
        <g>
          <path d="M-19 -42 L-16 -12 Q-15 -8 -9 -8 L9 -8 Q15 -8 16 -12 L19 -42 Z" fill={tc('#d96f5e')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M19 -38 Q29 -34 21 -24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <ellipse cx={0} cy={-39} rx={18} ry={4.6} fill={tc('#5a3a24')} stroke={line} strokeWidth={1.6} />
          <path d="M-7 -52 Q-10 -58 -7 -64 M5 -52 Q2 -58 5 -64" fill="none" stroke={tc('#b8b4aa')} strokeWidth={2.2} strokeLinecap="round" />
        </g>
      );
    case 'kettle':
      // 水壶（高 60）
      return (
        <g>
          <ellipse cx={0} cy={-26} rx={29} ry={25} fill={tc('#8a9ea8')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-26 -36 Q-46 -40 -44 -18" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
          <path d="M-14 -48 Q0 -62 14 -48" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <ellipse cx={0} cy={-6} rx={32} ry={6} fill={tc('#6f828c')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
        </g>
      );
    case 'glass':
      // 玻璃杯（高 56）
      return (
        <g>
          <path d="M-15 -56 L-12 -8 Q-11 0 -3 0 L3 0 Q11 0 12 -8 L15 -56 Z" fill={tc('#cfe8f5')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-13.5 -44 L13.5 -44 L12 -14 L-12 -14 Z" fill={tc('#9ecbe0')} opacity={0.75} />
          <ellipse cx={0} cy={-54} rx={15} ry={4} fill={tc('#e8f4fb')} stroke={line} strokeWidth={1.6} />
        </g>
      );
    case 'plate':
      // 白盘子（高 22）
      return (
        <g>
          <ellipse cx={0} cy={-11} rx={42} ry={13} fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <ellipse cx={0} cy={-13} rx={26} ry={7} fill="none" stroke={tc('#c8bca8')} strokeWidth={2} />
        </g>
      );
    case 'dish':
      // 一盘菜（盘+食物，高 34）
      return (
        <g>
          <ellipse cx={0} cy={-11} rx={42} ry={13} fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-28 -14 Q-24 -32 0 -32 Q24 -32 28 -14 Z" fill={tc('#c8823c')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <circle cx={-10} cy={-26} r={4} fill={tc('#7fb069')} />
          <circle cx={8} cy={-28} r={4} fill={tc('#a8503f')} />
        </g>
      );
    case 'bread':
      // 面包（高 38）
      return (
        <g>
          <path d="M-42 -12 Q-42 -38 -14 -38 L22 -38 Q42 -38 42 -20 Q42 -10 30 -10 L-34 -10 Q-42 -10 -42 -12 Z" fill={tc('#d9a05e')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-24 -34 L-20 -16 M-6 -36 L-2 -14 M12 -36 L16 -16" stroke={tc('#b8823f')} strokeWidth={2.6} strokeLinecap="round" />
        </g>
      );
    case 'cake':
      // 双层蛋糕（高 58）
      return (
        <g>
          <ellipse cx={0} cy={-7} rx={44} ry={11} fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-30} y={-34} width={60} height={26} rx={4} fill={tc('#f3d1c0')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-20} y={-52} width={40} height={19} rx={4} fill={tc('#e8a0b4')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-30 -18 Q0 -8 30 -18" fill="none" stroke={tc('#faf3e6')} strokeWidth={3} />
          <circle cx={0} cy={-58} r={5} fill={tc('#a8503f')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'chocolate':
      // 巧克力排（高 18）
      return (
        <g>
          <rect x={-32} y={-18} width={64} height={18} rx={3} fill={tc('#5a3a24')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <g stroke={tc('#7a5638')} strokeWidth={1.8}>
            <path d="M-16 -18 V0 M0 -18 V0 M16 -18 V0 M-32 -9 H32" />
          </g>
        </g>
      );
    case 'biscuit':
      // 两块饼干（高 32）
      return (
        <g>
          <circle cx={-13} cy={-16} r={16} fill={tc('#d9a05e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={13} cy={-13} r={13} fill={tc('#c88a4a')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <g fill={tc('#5a3a24')}>
            <circle cx={-17} cy={-20} r={2.2} /><circle cx={-8} cy={-12} r={2.2} /><circle cx={-16} cy={-9} r={2} />
            <circle cx={10} cy={-16} r={1.8} /><circle cx={16} cy={-10} r={1.8} />
          </g>
        </g>
      );
    case 'cheese':
      // 奶酪楔（高 30）
      return (
        <g>
          <path d="M-38 -8 L34 -30 L34 -8 Z" fill={tc('#f7d24a')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-38 -8 L34 -8 L34 0 L-38 0 Z" fill={tc('#e8bf35')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <circle cx={8} cy={-20} r={4} fill={tc('#e8bf35')} />
          <circle cx={22} cy={-16} r={3} fill={tc('#e8bf35')} />
        </g>
      );
    case 'jam':
      // 果酱罐（高 48）
      return (
        <g>
          <rect x={-19} y={-40} width={38} height={40} rx={6} fill={tc('#c9564a')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-21} y={-48} width={42} height={10} rx={3} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={-13} y={-32} width={26} height={16} rx={2} fill={tc('#f3ead9')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'butter':
      // 黄油块（高 20）
      return (
        <g>
          <rect x={-30} y={-20} width={60} height={20} rx={3} fill={tc('#f7e8a0')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-22} y={-14} width={44} height={8} rx={2} fill={tc('#f4f2ec')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'sugar':
      // 糖罐（高 44）
      return (
        <g>
          <path d="M-26 -8 Q-30 -38 0 -38 Q30 -38 26 -8 Z" fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <ellipse cx={0} cy={-40} rx={20} ry={6} fill={tc('#d9b98a')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <circle cx={0} cy={-46} r={4} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
        </g>
      );
    case 'apple':
      // 苹果（高 48）
      return (
        <g>
          <circle cx={0} cy={-24} r={24} fill={tc('#c9564a')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M0 -46 Q2 -54 8 -56" fill="none" stroke={tc('#6b4a2f')} strokeWidth={3} strokeLinecap="round" />
          <path d="M4 -52 Q16 -58 20 -48 Q10 -44 4 -52 Z" fill={tc('#7fb069')} stroke={line} strokeWidth={1.4} />
        </g>
      );
    case 'letter':
      // 信件（立着的信封，高 24）
      return (
        <g>
          <rect x={-30} y={-24} width={60} height={24} rx={2} fill={tc('#f3ead9')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-30 -23 L0 -6 L30 -23" fill="none" stroke={line} strokeWidth={2.2} />
          <circle cx={20} cy={-6} r={3.4} fill={tc('#c9564a')} stroke={line} strokeWidth={1.2} />
        </g>
      );
    case 'ticket':
      // 车票（高 16）
      return (
        <g>
          <rect x={-34} y={-16} width={68} height={16} rx={2} fill={tc('#e8f4fb')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={20} y1={-16} x2={20} y2={0} stroke={line} strokeWidth={1.6} strokeDasharray="3 3" />
          <path d="M-26 -10 h32 M-26 -5 h24" stroke={tc('#55606b')} strokeWidth={1.8} />
        </g>
      );
    case 'passport':
      // 护照（高 28）
      return (
        <g>
          <rect x={-21} y={-28} width={42} height={28} rx={3} fill={tc('#3d5a80')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={0} cy={-16} r={7} fill="none" stroke={tc('#f7e8a0')} strokeWidth={2.2} />
          <path d="M-10 -5 h20" stroke={tc('#f7e8a0')} strokeWidth={2} />
        </g>
      );
    case 'money':
      // 钞票（高 20）
      return (
        <g>
          <rect x={-42} y={-20} width={84} height={20} rx={3} fill={tc('#7fae8f')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <ellipse cx={0} cy={-10} rx={16} ry={8} fill="none" stroke={tc('#f4f2ec')} strokeWidth={2} />
          <circle cx={0} cy={-10} r={4} fill={tc('#f4f2ec')} opacity={0.8} />
        </g>
      );
    case 'coat':
      // 长外套（高 84）
      return (
        <g>
          <path d="M-24 -78 L-11 -84 L0 -76 L11 -84 L24 -78 L20 0 L-20 0 Z" fill={tc('#55606b')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-11 -84 L0 -76 L11 -84" fill="none" stroke={line} strokeWidth={2.2} />
          <line x1={0} y1={-76} x2={0} y2={0} stroke={line} strokeWidth={2} />
          <circle cx={-5} cy={-58} r={2.4} fill={tc('#f7e8a0')} />
          <circle cx={-5} cy={-40} r={2.4} fill={tc('#f7e8a0')} />
          <circle cx={-5} cy={-22} r={2.4} fill={tc('#f7e8a0')} />
        </g>
      );
    case 'blouse':
      // 女衬衫（高 50）
      return (
        <g>
          <path d="M-17 -46 L-9 -50 L0 -44 L9 -50 L17 -46 L14 0 L-14 0 Z" fill={tc('#e8a0b4')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-9 -50 L0 -44 L9 -50" fill="none" stroke={line} strokeWidth={1.8} />
        </g>
      );
    case 'dog':
      // 小狗（侧视，高 64 宽 90）
      return (
        <g>
          <path d="M36 -42 Q50 -54 46 -66" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
          <ellipse cx={6} cy={-36} rx={32} ry={17} fill={tc('#d9a05e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={-30} cy={-48} r={14} fill={tc('#d9a05e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-38 -56 Q-48 -66 -40 -42 Z" fill={tc('#8a5a2b')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinejoin="round" />
          <circle cx={-34} cy={-51} r={2} fill="#3a3230" />
          <circle cx={-42} cy={-44} r={2.6} fill="#3a3230" />
          <g fill={tc('#b8823f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7}>
            <rect x={-18} y={-22} width={7} height={22} rx={3} />
            <rect x={-4} y={-22} width={7} height={22} rx={3} />
            <rect x={12} y={-22} width={7} height={22} rx={3} />
            <rect x={26} y={-22} width={7} height={22} rx={3} />
          </g>
        </g>
      );
    case 'cat':
      // 坐猫（高 70）
      return (
        <g>
          <path d="M24 -20 Q40 -26 38 -8" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" />
          <path d="M-22 0 Q-30 -40 -6 -46 Q22 -50 24 -22 Q26 0 12 0 Z" fill={tc('#8a8a92')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <circle cx={-8} cy={-50} r={13} fill={tc('#8a8a92')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-18 -58 L-16 -70 L-8 -60 Z M2 -60 L8 -70 L12 -58 Z" fill={tc('#8a8a92')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinejoin="round" />
          <circle cx={-12} cy={-50} r={1.8} fill="#3a3230" />
          <circle cx={-4} cy={-50} r={1.8} fill="#3a3230" />
          <path d="M-16 -45 h5 M-8 -45 h5" stroke="#3a3230" strokeWidth={1.2} />
        </g>
      );
    case 'bird':
      // 小鸟（高 42）
      return (
        <g>
          <ellipse cx={0} cy={-22} rx={19} ry={14} fill={tc('#e0a458')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={14} cy={-32} r={9} fill={tc('#e0a458')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M22 -33 L31 -31 L22 -28 Z" fill={tc('#c9564a')} stroke={line} strokeWidth={1.2} />
          <circle cx={16} cy={-34} r={1.8} fill="#3a3230" />
          <path d="M-8 -26 Q2 -34 8 -24 Q-2 -16 -8 -26 Z" fill={tc('#c8823c')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <path d="M-4 -8 L-4 0 M4 -8 L4 0" stroke={line} strokeWidth={2.2} strokeLinecap="round" />
        </g>
      );
    case 'car':
      // 小汽车（侧视，宽 220 高 88）
      return (
        <g>
          <path d="M-108 -26 L-100 -48 L-52 -52 L-30 -82 L38 -82 L72 -50 L104 -44 L110 -26 Q112 -14 100 -14 L-98 -14 Q-110 -14 -108 -26 Z" fill={tc('#c9564a')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-24 -76 L-2 -76 L-2 -54 L-42 -54 Z M8 -76 L32 -76 L56 -54 L8 -54 Z" fill={tc('#cfe8f5')} stroke={line} strokeWidth={2} strokeLinejoin="round" />
          <circle cx={-64} cy={-16} r={17} fill={tc('#3a3230')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={-64} cy={-16} r={7} fill={tc('#b8b4aa')} />
          <circle cx={62} cy={-16} r={17} fill={tc('#3a3230')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={62} cy={-16} r={7} fill={tc('#b8b4aa')} />
          <circle cx={98} cy={-34} r={4} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.2} />
        </g>
      );
    case 'train':
      // 火车头（侧视，宽 220 高 104）
      return (
        <g>
          <rect x={-30} y={-104} width={18} height={30} fill={tc('#3a4a52')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={-100} y={-88} width={54} height={62} rx={5} fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-46} y={-64} width={124} height={38} rx={16} fill={tc('#46787a')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-88} y={-80} width={26} height={22} rx={3} fill={tc('#cfe8f5')} stroke={line} strokeWidth={2} />
          <rect x={-106} y={-30} width={196} height={16} rx={4} fill={tc('#3a4a52')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <g fill={tc('#2f2a26')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8}>
            <circle cx={-72} cy={-14} r={14} /><circle cx={-24} cy={-14} r={14} />
            <circle cx={24} cy={-14} r={14} /><circle cx={72} cy={-14} r={14} />
          </g>
        </g>
      );
    case 'ship':
      // 轮船（侧视，宽 220 高 98）
      return (
        <g>
          <rect x={-8} y={-98} width={18} height={28} rx={3} fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-46} y={-70} width={92} height={34} rx={4} fill={tc('#f4f2ec')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <g fill={tc('#9ecbe0')} stroke={line} strokeWidth={1.6}>
            <rect x={-36} y={-62} width={20} height={16} /><rect x={-10} y={-62} width={20} height={16} /><rect x={16} y={-62} width={20} height={16} />
          </g>
          <path d="M-108 -36 L108 -36 L84 0 L-84 0 Z" fill={tc('#d96f5e')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-118 -2 Q-100 -10 -84 -2 Q-66 6 -50 -2 Q-34 -10 -18 -2" fill="none" stroke={tc('#9ecbe0')} strokeWidth={4} strokeLinecap="round" />
        </g>
      );
    case 'flower':
      // 盆花（高 100）
      return (
        <g>
          <line x1={0} y1={-40} x2={0} y2={-78} stroke={tc('#5d8a3a')} strokeWidth={4} strokeLinecap="round" />
          <path d="M0 -62 Q-16 -68 -20 -56 Q-8 -52 0 -62 Z" fill={tc('#7fb069')} stroke={line} strokeWidth={1.4} />
          <g fill={tc('#e8a0b4')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8}>
            <circle cx={-10} cy={-86} r={9} /><circle cx={10} cy={-86} r={9} />
            <circle cx={-8} cy={-96} r={9} /><circle cx={8} cy={-96} r={9} />
          </g>
          <circle cx={0} cy={-90} r={7} fill={tc('#f7e8a0')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <path d="M-18 -34 L18 -34 L13 0 L-13 0 Z" fill={tc('#c8763c')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x={-21} y={-40} width={42} height={9} rx={3} fill={tc('#a85a28')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
        </g>
      );
    case 'soap':
      // 香皂（高 34）
      return (
        <g>
          <ellipse cx={0} cy={-11} rx={30} ry={11} fill={tc('#e8a0b4')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <ellipse cx={0} cy={-15} rx={22} ry={6} fill={tc('#f3d1c0')} opacity={0.7} />
          <circle cx={24} cy={-26} r={5} fill="none" stroke={tc('#9ecbe0')} strokeWidth={2} />
          <circle cx={32} cy={-34} r={3} fill="none" stroke={tc('#9ecbe0')} strokeWidth={1.6} />
        </g>
      );
    case 'tie':
      // 领带（高 90）
      return (
        <g>
          <path d="M-9 -90 L9 -90 L6 -76 L-6 -76 Z" fill={tc('#a8503f')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-6 -76 L6 -76 L14 -20 L0 -2 L-14 -20 Z" fill={tc('#c9564a')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-6 -66 h12 M-7 -52 h14 M-9 -38 h18" stroke={tc('#8a3a30')} strokeWidth={2} />
        </g>
      );
    case 'cup':
      // 空杯子（高 48）
      return (
        <g>
          <path d="M-19 -42 L-16 -10 Q-15 -6 -9 -6 L9 -6 Q15 -6 16 -10 L19 -42 Z" fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M19 -38 Q29 -34 21 -24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <ellipse cx={0} cy={-40} rx={18} ry={4.6} fill={tc('#7fb3c8')} stroke={line} strokeWidth={1.6} />
        </g>
      );
    case 'pencil':
      // 大铅笔（高 100）
      return (
        <g>
          <rect x={-7} y={-100} width={14} height={13} fill={tc('#d96f5e')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <rect x={-7} y={-87} width={14} height={62} fill={tc('#e0a458')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-7 -25 L0 0 L7 -25 Z" fill={tc('#e8d9b8')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} />
          <path d="M-3.5 -12 L0 0 L3.5 -12 Z" fill="#3a3230" />
        </g>
      );
    case 'hammer':
      // 锤子（高 74）
      return (
        <g>
          <rect x={-6} y={-64} width={12} height={64} rx={4} fill={tc('#a8794e')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-30} y={-76} width={60} height={16} rx={4} fill={tc('#55606b')} stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      );
    case 'suitcase':
      // 手提箱（高 66）
      return (
        <g>
          <path d="M-12 -66 v-8 h24 v8" fill="none" stroke={line} strokeWidth={3.2} />
          <rect x={-36} y={-66} width={72} height={66} rx={8} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1={-36} y1={-38} x2={36} y2={-38} stroke={tc('#6b4a2f')} strokeWidth={2.6} />
          <rect x={-10} y={-58} width={20} height={12} rx={3} fill={tc('#f7e8a0')} stroke={line} strokeWidth={1.5} />
        </g>
      );
    case 'hat':
      // 帽子（高 34）
      return (
        <g>
          <path d="M-22 -30 Q-20 -48 0 -48 Q20 -48 22 -30 Z" fill={tc('#3d5a80')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <ellipse cx={0} cy={-30} rx={40} ry={9} fill={tc('#3d5a80')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-14 -40 Q0 -47 14 -40" fill="none" stroke={tc('#9ebd77')} strokeWidth={2.6} />
        </g>
      );
    case 'shirt':
      // 衬衫（高 60）
      return (
        <g>
          <path d="M-28 -50 L-14 -56 L0 -48 L14 -56 L28 -50 L24 0 L-24 0 Z" fill={tc('#f7f3ea')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-14 -56 L0 -48 L14 -56" fill="none" stroke={line} strokeWidth={2.2} />
        </g>
      );
    case 'bag':
      // 手提包立在地上（高 62）
      return (
        <g>
          <path d="M-14 -62 Q0 -78 14 -62" fill="none" stroke={line} strokeWidth={3.2} strokeLinecap="round" />
          <path d="M-24 -62 L24 -62 L19 0 L-19 0 Z" fill={tc('#b5651d')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M-19 -14 L19 -14 L18 -7 L-18 -7 Z" fill="rgba(0,0,0,0.14)" />
        </g>
      );
    case 'photo':
      // 立着的照片（高 58）
      return (
        <g>
          <rect x={-32} y={-58} width={64} height={58} rx={3} fill={tc('#ffffff')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-26} y={-52} width={52} height={34} fill={tc('#8fbc78')} stroke={tc('#7db3cc')} strokeWidth={1.8} />
          <circle cx={14} cy={-42} r={6} fill={tc('#f7e8a0')} />
          <path d="M-22 -12 h30" stroke={tc('#b8a67f')} strokeWidth={2} />
        </g>
      );
    case 'newspaper':
      // 立着的报纸（高 54）
      return (
        <g>
          <rect x={-34} y={-54} width={68} height={54} rx={2} fill={tc('#f3ead9')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-28} y={-48} width={38} height={14} fill={tc('#55606b')} />
          <path d="M-28 -28 h56 M-28 -20 h56 M-28 -12 h38 M14 -20 h14" stroke={tc('#b8a67f')} strokeWidth={2.2} />
        </g>
      );
    case 'swimmer':
      // 游泳者（河面横渡：头+划水双臂+身体+水波，高 42）
      return (
        <g>
          {/* 水波（身体没入水中） */}
          <path d="M-46 -8 Q-38 -16 -30 -8 Q-22 -16 -14 -8 M-2 -8 Q6 -16 14 -8 Q22 -16 30 -8 M40 -8 Q48 -16 56 -8" fill="none" stroke={tc('#e8f4fb')} strokeWidth={3.4} strokeLinecap="round" />
          {/* 身体（半没入，前倾划水姿） */}
          <path d="M-30 -26 Q-10 -34 14 -28 L20 -14 Q-2 -20 -24 -14 Z" fill={tc('#c9564a')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinejoin="round" />
          {/* 头（抬起换气） */}
          <circle cx={-34} cy={-30} r={10} fill={tc('#f2c9a1')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-42 -36 Q-36 -42 -28 -38" fill="none" stroke={tc('#4a3c30')} strokeWidth={3} strokeLinecap="round" />
          {/* 划水双臂（一前一后） */}
          <path d="M-14 -28 Q-2 -40 10 -32" fill="none" stroke={tc('#f2c9a1')} strokeWidth={5} strokeLinecap="round" />
          <path d="M16 -26 Q28 -18 38 -24" fill="none" stroke={tc('#f2c9a1')} strokeWidth={5} strokeLinecap="round" />
        </g>
      );
    case 'aeroplane':
      // 飞机（侧视平飞：机身+主翼+尾翼+舷窗，高 46）
      return (
        <g>
          <ellipse cx={0} cy={-24} rx={46} ry={13} fill={tc('#ffffff')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-8 -30 L-26 -56 L-10 -56 L10 -30 Z" fill={tc('#d8e8f4')} stroke={strokeColor} strokeWidth={strokeWidth * 0.9} strokeLinejoin="round" />
          <path d="M-30 -20 L-44 -4 L-34 -4 L-20 -20 Z" fill={tc('#d8e8f4')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinejoin="round" />
          <path d="M20 -32 L34 -48 L44 -48 L34 -30 Z" fill={tc('#d8e8f4')} stroke={strokeColor} strokeWidth={strokeWidth * 0.8} strokeLinejoin="round" />
          <g fill={tc('#9ecbe0')}>
            <circle cx={-6} cy={-26} r={3.4} /><circle cx={6} cy={-26} r={3.4} /><circle cx={18} cy={-26} r={3.4} />
          </g>
          <path d="M-46 -24 L-56 -22 L-46 -20 Z" fill={tc('#a8503f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.6} />
        </g>
      );
    case 'sleeping':
      // 床上睡着的孩子（床+被子隆起+露出的头+Zzz，高 78）
      return (
        <g>
          <rect x={-95} y={-75} width={16} height={75} rx={4} fill={tc('#8a5a36')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x={-95} y={-40} width={182} height={22} rx={6} fill={tc('#e8e2d0')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx={-62} cy={-52} r={13} fill={tc('#f2c9a1')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M-70 -56 Q-66 -62 -58 -60" fill="none" stroke={tc('#5d4a3a')} strokeWidth={3.4} strokeLinecap="round" />
          <path d="M-72 -50 Q-68 -47 -63 -48" fill="none" stroke="#3a3230" strokeWidth={2} strokeLinecap="round" />
          <path d="M-44 -40 Q-36 -68 -8 -66 Q28 -64 36 -40 Z" fill={tc('#7fb069')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x={-92} y={-18} width={9} height={18} fill={tc('#6b4a2f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <rect x={78} y={-18} width={9} height={18} fill={tc('#6b4a2f')} stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
          <g fill={tc('#55606b')} stroke={line} strokeWidth={1.6}>
            <path d="M20 -78 L30 -90 L24 -90 L34 -102" fill="none" strokeWidth={2.6} />
            <path d="M36 -74 L44 -84 L39 -84 L48 -94" fill="none" strokeWidth={2.2} />
          </g>
        </g>
      );
    case 'basin':
      // 洗衣盆（盆+水+泡沫，高 32）
      return (
        <g>
          <path d="M-34 -26 L34 -26 L26 0 L-26 0 Z" fill={tc('#5e9ea0')} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <ellipse cx={0} cy={-26} rx={34} ry={8} fill={tc('#cfe8f5')} stroke={strokeColor} strokeWidth={strokeWidth} />
          <g fill={tc('#ffffff')} stroke={line} strokeWidth={1.4}>
            <circle cx={-12} cy={-30} r={6} /><circle cx={0} cy={-33} r={7.5} /><circle cx={12} cy={-30} r={5.5} />
          </g>
        </g>
      );
    default:
      return <g />;
  }
}
