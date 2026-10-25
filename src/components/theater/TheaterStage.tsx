import React, { useEffect, useRef, useState } from 'react';
import PaperFigure, { type FigureState, type PropKind } from './PaperFigure';
import { renderStageProp, renderFloorItem } from './props';
import { sceneAt, weatherAt, type StageConfig, type StageRole, type LineAction } from './scenes';
import { speakerHash } from '../../data/voiceAssignment';
import { STYLE_THEMES, type StyleId } from '../../data/theater/theaterStyles';
import { SCRIPT_STAGE_ITEMS } from '../../data/theater/theaterScripts';
import { layoutBubble } from './bubbleLayout';

/**
 * 舞台：九类场景背景 + 多角色站位 + 台词气泡 + 风格主题（SVG 1600×900）
 * 背景均为简化布景（地面 + 标志物），统一暖色平涂描边风格；
 * 风格主题控制：角色配色/描边、舞台滤镜、纹理 overlay、贴纸白边强度、动画步进
 */

interface StageProps {
  config: StageConfig;
  /** 当前句序号（-1 无） */
  curIdx: number;
  /** 每句的角色动作映射（由调用方从 lineActions 取） */
  curActions: Record<string, LineAction>;
  /** 当前句英文（气泡内容） */
  bubbleText: string;
  /** 当前说话台词 key（旁白为 N） */
  speakerKey: string | null;
  /** 画风主题 */
  theme?: StyleId;
}

/* ---------- 背景部件 ---------- */

const Sky = () => (
  <g>
    <rect x={0} y={0} width={1600} height={560} fill="url(#tf-sky)" />
    <defs>
      <linearGradient id="tf-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a9d6ef" />
        <stop offset="100%" stopColor="#e8f4fb" />
      </linearGradient>
    </defs>
    <g fill="#ffffff" opacity={0.85}>
      <ellipse cx={300} cy={110} rx={90} ry={34} />
      <ellipse cx={380} cy={130} rx={70} ry={26} />
      <ellipse cx={1250} cy={90} rx={100} ry={32} />
    </g>
  </g>
);

const Ground = ({ color = '#e9d9b8', edge = '#d9c49c' }: { color?: string; edge?: string }) => (
  <g>
    <rect x={0} y={560} width={1600} height={340} fill={color} />
    <rect x={0} y={560} width={1600} height={26} fill={edge} />
  </g>
);

const Windows = ({ x, y, cols, rows }: { x: number; y: number; cols: number; rows: number }) => (
  <g fill="#efe6d2">
    {Array.from({ length: rows }).map((_, r) =>
      Array.from({ length: cols }).map((_, c) => (
        <rect key={`${r}-${c}`} x={x + c * 58} y={y + r * 62} width={30} height={38} rx={3} />
      ))
    )}
  </g>
);

function Backdrop({ bg }: { bg: string }) {
  switch (bg) {
    case 'classroom':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#f3ead9" />
          {/* 黑板 */}
          <rect x={520} y={140} width={560} height={300} rx={10} fill="#3e5c46" stroke="#7a5c3a" strokeWidth={10} />
          <g stroke="#e8e2d0" strokeWidth={4} strokeLinecap="round" opacity={0.8}>
            <path d="M570 210 q60 -18 120 0 t120 0" fill="none" />
            <path d="M570 270 h260" fill="none" />
            <path d="M570 330 h180" fill="none" />
          </g>
          {/* 讲台桌 */}
          <rect x={660} y={600} width={280} height={140} rx={10} fill="#a8794e" stroke="#3a3230" strokeWidth={3} />
          <Ground color="#c8b088" edge="#b89a70" />
        </g>
      );
    case 'home':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#f5e6cf" />
          {/* 窗 */}
          <rect x={180} y={140} width={300} height={260} rx={8} fill="#a9d6ef" stroke="#7a5c3a" strokeWidth={10} />
          <line x1={330} y1={140} x2={330} y2={400} stroke="#7a5c3a" strokeWidth={8} />
          {/* 电视柜 */}
          <rect x={1080} y={330} width={300} height={200} rx={8} fill="#4a4238" stroke="#3a3230" strokeWidth={3} />
          <rect x={1120} y={360} width={220} height={140} rx={6} fill="#2f2a26" />
          {/* 沙发 */}
          <rect x={620} y={520} width={380} height={170} rx={24} fill="#c98686" stroke="#3a3230" strokeWidth={3} />
          <rect x={620} y={470} width={380} height={90} rx={20} fill="#d49a9a" stroke="#3a3230" strokeWidth={3} />
          {/* 墙上画 */}
          <rect x={700} y={160} width={150} height={110} rx={6} fill="#8fbc78" stroke="#7a5c3a" strokeWidth={6} />
          <Ground color="#c8a878" edge="#b89868" />
        </g>
      );
    case 'kitchen':
      // L25 课文方位：冰箱 white 在右 / 电炉 blue 在左 / 桌在中间 / 桌上瓶+杯
      // （Ground 先画，家具立在地面上不被遮挡）
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#eef3f0" />
          <Ground color="#dcd2c0" edge="#c8bca8" />
          {/* 橱柜 */}
          <rect x={80} y={120} width={1440} height={160} rx={8} fill="#d9b98a" stroke="#7a5c3a" strokeWidth={8} />
          {/* 冰箱（白色，课文：on the right） */}
          <rect x={1090} y={360} width={200} height={340} rx={10} fill="#f4f2ec" stroke="#3a3230" strokeWidth={3} />
          <line x1={1090} y1={452} x2={1290} y2={452} stroke="#3a3230" strokeWidth={3} />
          <rect x={1252} y={392} width={14} height={44} rx={4} fill="#b8b4aa" />
          <rect x={1252} y={470} width={14} height={44} rx={4} fill="#b8b4aa" />
          {/* 电炉（蓝色，课文：on the left） */}
          <rect x={210} y={380} width={250} height={320} rx={10} fill="#5e9ea0" stroke="#3a3230" strokeWidth={3} />
          <circle cx={280} cy={446} r={27} fill="none" stroke="#e8f4fb" strokeWidth={4} />
          <circle cx={392} cy={446} r={27} fill="none" stroke="#e8f4fb" strokeWidth={4} />
          <rect x={238} y={520} width={88} height={54} rx={6} fill="#46787a" />
          <rect x={344} y={520} width={88} height={54} rx={6} fill="#46787a" />
          {/* 餐桌（房间中间）+ 桌上空瓶与干净杯子（L25 [8][10]；避开人物站位放两端） */}
          <rect x={620} y={620} width={380} height={130} rx={10} fill="#a8794e" stroke="#3a3230" strokeWidth={3} />
          <path d={`M682 596 L678 552 Q678 544 686 544 Q694 544 694 552 L690 596 Z`} fill="#9ecbe0" stroke="#3a3230" strokeWidth={2.6} />
          <rect x={680} y={540} width={12} height={10} rx={2} fill="#7db3cc" stroke="#3a3230" strokeWidth={2} />
          <path d={`M916 578 L908 622 L946 622 L938 578 Z`} fill="#f4f2ec" stroke="#3a3230" strokeWidth={2.6} />
        </g>
      );
    case 'living':
      // L27 课文方位：电视 near window / 桌在中间+报纸 / 扶手椅 near table / 音响 near door / 挂画 on wall
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#f5e6cf" />
          <Ground color="#c8a878" edge="#b89868" />
          {/* 窗 */}
          <rect x={150} y={130} width={320} height={260} rx={8} fill="#a9d6ef" stroke="#7a5c3a" strokeWidth={10} />
          <line x1={310} y1={130} x2={310} y2={390} stroke="#7a5c3a" strokeWidth={8} />
          {/* 电视柜+电视（紧邻窗）+ 柜上杂志 */}
          <rect x={520} y={330} width={300} height={200} rx={8} fill="#4a4238" stroke="#3a3230" strokeWidth={3} />
          <rect x={560} y={360} width={220} height={140} rx={6} fill="#2f2a26" />
          <g fill="#e0a458" stroke="#3a3230" strokeWidth={2}>
            <rect x={548} y={306} width={110} height={16} rx={3} />
            <rect x={680} y={306} width={110} height={16} rx={3} />
          </g>
          {/* 挂画 ×2（on the wall） */}
          <rect x={920} y={150} width={150} height={110} rx={6} fill="#8fbc78" stroke="#7a5c3a" strokeWidth={6} />
          <rect x={1120} y={170} width={130} height={96} rx={6} fill="#c98686" stroke="#7a5c3a" strokeWidth={6} />
          {/* 桌（中间）+ 桌上报纸 */}
          <rect x={880} y={600} width={330} height={126} rx={10} fill="#a8794e" stroke="#3a3230" strokeWidth={3} />
          <rect x={930} y={566} width={120} height={34} rx={4} fill="#f3ead9" stroke="#7a5c3a" strokeWidth={2.6} />
          <rect x={942} y={574} width={96} height={7} fill="#b8a67f" />
          {/* 扶手椅 ×2（紧邻桌） */}
          <g fill="#c98686" stroke="#3a3230" strokeWidth={3}>
            <rect x={1280} y={500} width={120} height={100} rx={18} />
            <rect x={1280} y={580} width={130} height={90} rx={16} />
            <rect x={1440} y={500} width={110} height={100} rx={18} />
            <rect x={1440} y={580} width={120} height={90} rx={16} />
          </g>
          {/* 门 + 音响（紧邻门）+ 音响上的书 */}
          <rect x={1470} y={180} width={110} height={300} rx={6} fill="#8a5a36" stroke="#3a3230" strokeWidth={3} />
          <circle cx={1556} cy={330} r={7} fill="#f7e8a0" />
          <rect x={1300} y={220} width={130} height={120} rx={8} fill="#55606b" stroke="#3a3230" strokeWidth={3} />
          <circle cx={1338} cy={280} r={22} fill="#2f3a4a" />
          <circle cx={1394} cy={280} r={22} fill="#2f3a4a" />
          <g fill="#e0a458" stroke="#3a3230" strokeWidth={2}>
            <rect x={1312} y={196} width={46} height={14} rx={3} />
            <rect x={1368} y={196} width={46} height={14} rx={3} />
          </g>
        </g>
      );
    case 'river':
      // L33 课文元素：小船 on the river / 大船过桥下 / 蒂姆看飞机 / 桥上的人家
      return (
        <g>
          <Sky />
          <Ground color="#b5d18f" edge="#9ebd77" />
          {/* 河 */}
          <path d="M0 620 Q500 590 900 625 T1600 615 L1600 900 L0 900 Z" fill="#9ecbe0" stroke="#7db3cc" strokeWidth={4} />
          {/* 桥（跨河，琼斯一家走在上面） */}
          <rect x={280} y={520} width={1040} height={34} rx={6} fill="#a8794e" stroke="#3a3230" strokeWidth={4} />
          <g stroke="#8a6a42" strokeWidth={8}>
            <line x1={360} y1={554} x2={360} y2={640} />
            <line x1={520} y1={554} x2={520} y2={650} />
            <line x1={680} y1={554} x2={680} y2={656} />
            <line x1={840} y1={554} x2={840} y2={656} />
            <line x1={1000} y1={554} x2={1000} y2={650} />
            <line x1={1160} y1={554} x2={1160} y2={640} />
          </g>
          <rect x={280} y={492} width={1040} height={14} rx={6} fill="#c8955e" stroke="#3a3230" strokeWidth={3} />
          {/* 大船（ship，正从桥下通过） */}
          <g>
            <path d={`M1050 690 L1330 690 L1300 742 L1090 742 Z`} fill="#d96f5e" stroke="#3a3230" strokeWidth={3.5} />
            <rect x={1130} y={636} width={130} height={56} rx={6} fill="#f4f2ec" stroke="#3a3230" strokeWidth={3} />
            <rect x={1170} y={596} width={44} height={42} rx={4} fill="#5e9ea0" stroke="#3a3230" strokeWidth={3} />
          </g>
          {/* 小船 ×2（boats on the river） */}
          <g stroke="#3a3230" strokeWidth={3}>
            <path d={`M300 760 L440 760 L414 792 L330 792 Z`} fill="#e0a458" />
            <path d={`M560 820 L660 820 L640 846 L582 846 Z`} fill="#7fb069" />
          </g>
          {/* 飞机（aeroplane flying over the river） */}
          <g transform="translate(1180 210) rotate(-8)">
            <ellipse cx={0} cy={0} rx={92} ry={20} fill="#ffffff" stroke="#3a3230" strokeWidth={3.5} />
            <path d="M-18 -2 L-64 -52 L-30 -54 L14 -4 Z" fill="#d8e8f4" stroke="#3a3230" strokeWidth={3} />
            <path d="M-14 8 L-48 44 L-18 44 L10 8 Z" fill="#d8e8f4" stroke="#3a3230" strokeWidth={3} />
            <path d="M-88 -6 L-104 -18 L-96 2 Z" fill="#3a3230" />
            <circle cx={60} cy={-6} r={9} fill="#a9d6ef" stroke="#3a3230" strokeWidth={2.4} />
          </g>
        </g>
      );
    case 'shop':
      return (
        <g>
          <Sky />
          {/* 店面雨棚 */}
          <rect x={0} y={0} width={1600} height={900} fill="#f3e6d2" />
          <rect x={0} y={120} width={1600} height={90} fill="#d96f5e" stroke="#3a3230" strokeWidth={4} />
          <g stroke="#3a3230" strokeWidth={2} opacity={0.25}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <line key={i} x1={i * 170} y1={120} x2={i * 170 + 85} y2={210} />
            ))}
          </g>
          {/* 柜台 */}
          <rect x={240} y={620} width={1120} height={150} rx={10} fill="#a8794e" stroke="#3a3230" strokeWidth={3} />
          <rect x={240} y={620} width={1120} height={30} fill="#c8955e" />
          {/* 货架 */}
          <g fill="#c8955e" stroke="#3a3230" strokeWidth={3}>
            <rect x={120} y={300} width={300} height={24} rx={4} />
            <rect x={120} y={420} width={300} height={24} rx={4} />
            <rect x={1180} y={300} width={300} height={24} rx={4} />
            <rect x={1180} y={420} width={300} height={24} rx={4} />
          </g>
          <Ground color="#dcd2c0" edge="#c8bca8" />
        </g>
      );
    case 'park':
      return (
        <g>
          <Sky />
          {/* 远山 */}
          <path d="M0 480 Q400 320 800 460 T1600 440 L1600 560 L0 560 Z" fill="#a8c686" />
          {/* 树 */}
          <g>
            <rect x={240} y={470} width={24} height={100} rx={10} fill="#8a5a36" stroke="#3a3230" strokeWidth={3} />
            <circle cx={252} cy={420} r={85} fill="#7fb069" stroke="#3a3230" strokeWidth={3.5} />
            <rect x={1330} y={480} width={24} height={95} rx={10} fill="#8a5a36" stroke="#3a3230" strokeWidth={3} />
            <circle cx={1342} cy={432} r={78} fill="#8fbd78" stroke="#3a3230" strokeWidth={3.5} />
          </g>
          {/* 河 */}
          <path d="M0 640 Q500 600 900 640 T1600 630 L1600 900 L0 900 Z" fill="#9ecbe0" stroke="#7db3cc" strokeWidth={4} />
          <g stroke="#c8e4f0" strokeWidth={4} opacity={0.7}>
            <path d="M200 700 h120" /><path d="M700 740 h140" /><path d="M1150 700 h120" />
          </g>
          <Ground color="#b5d18f" edge="#9ebd77" />
        </g>
      );
    case 'station':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#e8e6e0" />
          {/* 站牌 */}
          <rect x={700} y={150} width={200} height={70} rx={8} fill="#3d5a80" stroke="#3a3230" strokeWidth={3} />
          <text x={800} y={198} textAnchor="middle" fontSize={34} fontWeight={700} fill="#fff">STATION</text>
          {/* 时钟 */}
          <circle cx={800} cy={330} r={64} fill="#fff" stroke="#3a3230" strokeWidth={5} />
          <line x1={800} y1={330} x2={800} y2={292} stroke="#3a3230" strokeWidth={5} strokeLinecap="round" />
          <line x1={800} y1={330} x2={826} y2={344} stroke="#3a3230" strokeWidth={5} strokeLinecap="round" />
          {/* 火车车厢 */}
          <rect x={80} y={470} width={500} height={180} rx={14} fill="#5e9ea0" stroke="#3a3230" strokeWidth={3} />
          <rect x={1020} y={470} width={500} height={180} rx={14} fill="#5e9ea0" stroke="#3a3230" strokeWidth={3} />
          <g fill="#e8f4fb" stroke="#3a3230" strokeWidth={3}>
            <rect x={120} y={505} width={90} height={70} rx={6} /><rect x={250} y={505} width={90} height={70} rx={6} /><rect x={380} y={505} width={90} height={70} rx={6} />
            <rect x={1060} y={505} width={90} height={70} rx={6} /><rect x={1190} y={505} width={90} height={70} rx={6} /><rect x={1320} y={505} width={90} height={70} rx={6} />
          </g>
          <Ground color="#c8bca8" edge="#b0a48e" />
        </g>
      );
    case 'office':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#eef0f4" />
          {/* 窗 */}
          <rect x={140} y={130} width={380} height={280} rx={8} fill="#a9d6ef" stroke="#55606b" strokeWidth={10} />
          <line x1={330} y1={130} x2={330} y2={410} stroke="#55606b" strokeWidth={8} />
          {/* 办公桌 ×2 */}
          <rect x={640} y={600} width={340} height={130} rx={10} fill="#8a7f6f" stroke="#3a3230" strokeWidth={3} />
          <rect x={680} y={560} width={240} height={44} rx={6} fill="#55606b" />
          <rect x={1080} y={600} width={340} height={130} rx={10} fill="#8a7f6f" stroke="#3a3230" strokeWidth={3} />
          <rect x={1120} y={560} width={240} height={44} rx={6} fill="#55606b" />
          {/* 公告板 */}
          <rect x={640} y={140} width={330} height={220} rx={8} fill="#faf3e6" stroke="#7a5c3a" strokeWidth={8} />
          <g stroke="#c8a878" strokeWidth={5}><path d="M680 200 h250 M680 250 h200 M680 300 h230" /></g>
          <Ground color="#d5d0c4" edge="#c2bcb0" />
        </g>
      );
    case 'stage':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#2f3a4a" />
          {/* 展台地板 */}
          <ellipse cx={800} cy={790} rx={700} ry={90} fill="#3d4a5c" />
          {/* 追光灯 */}
          <path d="M800 -50 L520 900 L1080 900 Z" fill="#f7e8a0" opacity={0.14} />
          {/* 星幕 */}
          <g fill="#e8f4fb" opacity={0.5}>
            {[[120, 90], [320, 160], [560, 70], [1040, 110], [1300, 80], [1480, 180], [860, 200]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 2 ? 5 : 8} />
            ))}
          </g>
          {/* 展台台阶 */}
          <rect x={420} y={740} width={760} height={50} rx={12} fill="#55606b" stroke="#2f3a4a" strokeWidth={4} />
          <Ground color="#3d4a5c" edge="#2f3a4a" />
        </g>
      );
    case 'train':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#eef0e8" />
          {/* 行李架 */}
          <rect x={60} y={100} width={1480} height={54} rx={26} fill="#c8b088" stroke="#7a5c3a" strokeWidth={6} />
          <rect x={200} y={64} width={150} height={44} rx={10} fill="#8a5a36" stroke="#3a3230" strokeWidth={3} />
          <rect x={1200} y={64} width={170} height={44} rx={10} fill="#4f6d7a" stroke="#3a3230" strokeWidth={3} />
          {/* 车窗 ×3：窗外移动的田野 */}
          <g stroke="#55606b" strokeWidth={12} fill="#cfe8f5">
            <rect x={120} y={210} width={340} height={230} rx={10} />
            <rect x={630} y={210} width={340} height={230} rx={10} />
            <rect x={1140} y={210} width={340} height={230} rx={10} />
          </g>
          <g fill="#a8c686" opacity={0.9}>
            <path d="M140 420 L260 320 L380 420 Z" />
            <path d="M660 420 L790 330 L910 420 Z" />
            <path d="M1170 420 L1300 315 L1430 420 Z" />
          </g>
          <circle cx={1420} cy={260} r={40} fill="#f7e8a0" opacity={0.85} />
          {/* 座椅排 */}
          <g fill="#5e9ea0" stroke="#3a3230" strokeWidth={3}>
            <rect x={130} y={640} width={300} height={40} rx={14} />
            <rect x={130} y={540} width={300} height={110} rx={16} />
            <rect x={640} y={640} width={300} height={40} rx={14} />
            <rect x={640} y={540} width={300} height={110} rx={16} />
            <rect x={1150} y={640} width={300} height={40} rx={14} />
            <rect x={1150} y={540} width={300} height={110} rx={16} />
          </g>
          <Ground color="#d5d0c4" edge="#c2bcb0" />
        </g>
      );
    case 'bus':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#e8f0e4" />
          {/* 大前窗 + 侧窗：窗外街景 */}
          <g stroke="#55606b" strokeWidth={12} fill="#cfe8f5">
            <rect x={100} y={170} width={420} height={260} rx={12} />
            <rect x={600} y={170} width={300} height={260} rx={12} />
            <rect x={960} y={170} width={300} height={260} rx={12} />
          </g>
          <g fill="#d8c9a8" opacity={0.9}>
            <rect x={140} y={300} width={110} height={130} />
            <rect x={280} y={330} width={90} height={100} />
            <rect x={1000} y={310} width={100} height={120} />
          </g>
          {/* 投币箱 + 扶手横杆 */}
          <rect x={1180} y={330} width={130} height={200} rx={14} fill="#3d5a80" stroke="#3a3230" strokeWidth={3} />
          <circle cx={1245} cy={380} r={22} fill="#e8e6e0" stroke="#3a3230" strokeWidth={3} />
          <rect x={90} y={470} width={1420} height={20} rx={10} fill="#c8a878" stroke="#7a5c3a" strokeWidth={4} />
          <g stroke="#6b7280" strokeWidth={10} strokeLinecap="round">
            <path d="M260 490 v90" /><path d="M760 490 v90" /><path d="M1180 490 v90" />
          </g>
          <Ground color="#d5d0c4" edge="#c2bcb0" />
        </g>
      );
    case 'airport':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#eaf2f8" />
          {/* 航班信息牌 */}
          <rect x={480} y={110} width={640} height={130} rx={12} fill="#22303f" stroke="#3a3230" strokeWidth={4} />
          <text x={800} y={172} textAnchor="middle" fontSize={44} fontWeight={700} fill="#f7e8a0">DEPARTURES</text>
          <g fill="#9ecbe0"><rect x={540} y={192} width={130} height={22} rx={4} /><rect x={720} y={192} width={170} height={22} rx={4} /><rect x={940} y={192} width={120} height={22} rx={4} /></g>
          {/* 大玻璃幕墙 + 停机坪飞机 */}
          <g stroke="#9ebd77" strokeWidth={8} fill="#cfe8f5">
            <rect x={70} y={300} width={700} height={280} rx={10} />
            <rect x={830} y={300} width={700} height={280} rx={10} />
          </g>
          <g opacity={0.9}>
            <ellipse cx={1150} cy={430} rx={190} ry={44} fill="#ffffff" stroke="#7db3cc" strokeWidth={4} />
            <path d="M1150 430 L1330 380 L1330 430 Z" fill="#e8f4fb" stroke="#7db3cc" strokeWidth={4} />
            <rect x={1120} y={340} width={26} height={70} rx={8} fill="#d96f5e" />
          </g>
          <g fill="#d8c9a8"><rect x={130} y={420} width={120} height={150} /><rect x={300} y={450} width={90} height={120} /></g>
          {/* 值机柜台 */}
          <rect x={240} y={640} width={1120} height={140} rx={10} fill="#a8794e" stroke="#3a3230" strokeWidth={3} />
          <rect x={240} y={640} width={1120} height={28} fill="#c8955e" />
          <Ground color="#d5d0c4" edge="#c2bcb0" />
        </g>
      );
    case 'night':
      return (
        <g>
          <rect x={0} y={0} width={1600} height={900} fill="#3a4258" />
          {/* 夜空窗 */}
          <rect x={180} y={130} width={320} height={280} rx={8} fill="#1f2637" stroke="#55606b" strokeWidth={10} />
          <line x1={340} y1={130} x2={340} y2={410} stroke="#55606b" strokeWidth={8} />
          <g fill="#e8f4fb" opacity={0.8}>
            {[[240, 190], [300, 250], [270, 330], [420, 220], [450, 320]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={4} />
            ))}
          </g>
          <circle cx={440} cy={200} r={34} fill="#f7e8a0" opacity={0.9} />
          {/* 台灯暖光 */}
          <rect x={1180} y={430} width={16} height={120} fill="#6b5a4a" />
          <path d="M1140 430 L1236 430 L1216 380 L1160 380 Z" fill="#e0a458" stroke="#3a3230" strokeWidth={3} />
          <path d="M1120 560 L1260 560 L1220 460 L1160 460 Z" fill="#f7e8a0" opacity={0.18} />
          {/* 沙发剪影 + 挂画 */}
          <rect x={620} y={520} width={380} height={170} rx={24} fill="#4a4258" stroke="#2f2a26" strokeWidth={3} />
          <rect x={620} y={470} width={380} height={90} rx={20} fill="#565068" />
          <rect x={700} y={160} width={150} height={110} rx={6} fill="#55606b" stroke="#2f2a26" strokeWidth={6} />
          <Ground color="#4a4a58" edge="#3f3f4c" />
        </g>
      );
    case 'street':
    default:
      return (
        <g>
          <Sky />
          <g fill="#d8c9a8" stroke="#b8a67f" strokeWidth={3}>
            <rect x={90} y={330} width={190} height={230} rx={6} />
            <rect x={320} y={390} width={140} height={170} rx={6} />
            <rect x={1180} y={360} width={170} height={200} rx={6} />
            <rect x={1390} y={310} width={130} height={250} rx={6} />
          </g>
          <Windows x={120} y={360} cols={3} rows={3} />
          <Windows x={1215} y={390} cols={2} rows={2} />
          <g>
            <rect x={832} y={300} width={12} height={330} rx={6} fill="#6b7280" stroke="#3a3230" strokeWidth={3} />
            <path d="M838 310 Q838 250 900 250" fill="none" stroke="#6b7280" strokeWidth={10} strokeLinecap="round" />
            <ellipse cx={912} cy={252} rx={30} ry={16} fill="#f7e8a0" stroke="#3a3230" strokeWidth={3} />
          </g>
          <g>
            <rect x={1400} y={520} width={26} height={110} rx={10} fill="#8a5a36" stroke="#3a3230" strokeWidth={3} />
            <circle cx={1413} cy={470} r={92} fill="#7fb069" stroke="#3a3230" strokeWidth={3.5} />
          </g>
          <Ground />
          <g stroke="#dcc9a2" strokeWidth={3}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1={i * 200 + 100} y1={560} x2={i * 200 - 60} y2={900} />
            ))}
          </g>
        </g>
      );
  }
}

/* ---------- 主舞台 ---------- */

const TheaterStage: React.FC<StageProps> = ({ config, curIdx, curActions, bubbleText, speakerKey, theme = 'paper' }) => {
  const { roles, keyToRole } = config;
  const th = STYLE_THEMES[theme] ?? STYLE_THEMES.paper;
  // 当前场：随 curIdx 落在哪个分场区间（curIdx=-1 未开始按首场）
  const scene = sceneAt(config, Math.max(0, curIdx));

  // ---- 分场转场：背景交叉淡变 + 黑场脉冲（同景换时也有效） ----
  const [bgLayer, setBgLayer] = useState<{ cur: string; prev: string | null }>({ cur: scene.bg, prev: null });
  const [dimKey, setDimKey] = useState(0);
  const prevSceneRef = useRef({ from: scene.from, bg: scene.bg });
  useEffect(() => {
    const prev = prevSceneRef.current;
    if (scene.from === prev.from && scene.bg === prev.bg) return;
    prevSceneRef.current = { from: scene.from, bg: scene.bg };
    setBgLayer((s) => ({ cur: scene.bg, prev: s.cur !== scene.bg ? s.cur : null }));
    setDimKey((k) => k + 1);
    const t = setTimeout(() => setBgLayer((s) => ({ ...s, prev: null })), 1000);
    return () => clearTimeout(t);
  }, [scene.from, scene.bg]);

  // ---- 分场轮换：本场新进场的角色（上一场不在场）自动播走入动画 ----
  const presentKeys = new Set(scene.present ?? config.roles.map((r) => r.key));
  const prevPresentRef = useRef<Set<string> | null>(null);
  const justEntered = new Set<string>();
  if (prevPresentRef.current) {
    for (const k of presentKeys) {
      if (!prevPresentRef.current.has(k)) justEntered.add(k);
    }
  }
  useEffect(() => {
    prevPresentRef.current = presentKeys;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.from]);

  // ---- 镜头：按场的镜头基调取景，说话者推近（名牌渐隐）；wide 场锁定全景 ----
  const speakerRole = speakerKey ? keyToRole[speakerKey] : null;
  const bubbleLay = layoutBubble(bubbleText || ' ', { narr: speakerKey === 'N' });
  const camOn = config.script.type !== 'narrative' && !!speakerRole && curIdx >= 0 && scene.shot !== 'wide';
  // close 遇超长气泡（>200px 高）自动降级 medium，防特写裁掉气泡顶
  const shot = camOn && scene.shot === 'close' && bubbleLay.bh <= 200 ? 'close' : camOn ? 'medium' : 'wide';
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nametagRefs = useRef<Array<SVGGElement | null>>([]);
  const vbRef = useRef({ x: 0, y: 0, w: 1600, h: 900 });
  useEffect(() => {
    let raf = 0;
    // medium 1200×768 含气泡区（顶≈105）与角色全身 + 地面物品（底 845）；close 1000×562 贴近说话者
    const target =
      shot === 'close' && speakerRole
        ? { x: Math.min(Math.max(speakerRole.x - 500, 0), 600), y: 20, w: 1000, h: 562 }
        : shot === 'medium' && speakerRole
          ? { x: Math.min(Math.max(speakerRole.x - 600, 0), 400), y: 100, w: 1200, h: 768 }
          : { x: 0, y: 0, w: 1600, h: 900 };
    const tick = () => {
      const vb = vbRef.current;
      vb.x += (target.x - vb.x) * 0.09;
      vb.y += (target.y - vb.y) * 0.09;
      vb.w += (target.w - vb.w) * 0.09;
      vb.h += (target.h - vb.h) * 0.09;
      svgRef.current?.setAttribute('viewBox', `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`);
      // 名牌：全景可见，越接近特写越隐（说话人靠气泡尾巴指认）
      const tagOp = Math.max(0, Math.min(1, (vb.w - 1200) / 400));
      for (const el of nametagRefs.current) el?.setAttribute('opacity', tagOp.toFixed(2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shot, speakerRole]);

  // ---- 在场过滤：分场标注 present 时，不在场角色隐藏 ----
  const visibleRoles = scene.present ? roles.filter((r) => scene.present!.includes(r.key)) : roles;
  const speakerVisible = !scene.present || (speakerKey != null && scene.present.includes(speakerKey));
  const activeSpeakerRole = speakerVisible ? speakerRole : null;

  // ---- 道具递接：持有者变化的句，道具从上一持有者手飞到新持有者手（物理递送） ----
  const idx0 = Math.max(0, curIdx);
  const propCur = config.prop?.perLine[idx0];
  const propPrev = config.prop?.perLine[Math.max(0, idx0 - 1)];
  const isTransfer = !!(propCur && propPrev && propCur.item === propPrev.item && propCur.owner !== propPrev.owner);
  const flyRef = useRef<SVGGElement | null>(null);
  useEffect(() => {
    if (!isTransfer || !propCur || !propPrev) return;
    const hand = (key?: string) => {
      const r = key ? keyToRole[key] : null;
      return r ? { x: r.x + 39.6 * r.facing, y: 637 } : null;
    };
    const from = hand(propPrev.owner);
    const to = hand(propCur.owner);
    if (!from || !to) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = () => {
      const t = Math.min(1, (performance.now() - t0) / 900);
      const e = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const x = from.x + (to.x - from.x) * e;
      const y = 637 - Math.sin(t * Math.PI) * 46; // 抛物线弧
      flyRef.current?.setAttribute('transform', `translate(${x.toFixed(1)} ${(y - 242).toFixed(1)})`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [curIdx, isTransfer]);

  // ---- 天气：句级触发（台词谈到 wind/rain 时天空出形象 + 音效） ----
  const weather = weatherAt(config, curIdx);
  const weatherRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const prev = weatherRef.current;
    if (prev) {
      prev.pause();
      weatherRef.current = null;
    }
    if (!weather || weather === 'sun') return;
    const a = new Audio(`./assets/sounds/weather-${weather}.wav`);
    a.volume = 0.24;
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (weather === 'thunder') {
      // 雷雨：随机间隔滚动重播（真实雷雨的雷声不会准时准点）
      const roll = () => {
        a.currentTime = 0;
        void a.play().catch(() => {});
        timer = setTimeout(roll, 1800 + Math.random() * 2600);
      };
      roll();
    } else {
      a.loop = true;
      void a.play().catch(() => {});
    }
    weatherRef.current = a;
    return () => {
      if (timer) clearTimeout(timer);
      a.pause();
    };
  }, [weather]);

  const figureState = (role: StageRole): FigureState => {
    const g = curActions[role.key] ?? 'none';
    const isSpeaking = speakerKey === role.key;
    const arm: 'none' | 'wave' | 'raise' =
      g === 'wave' ? 'wave' : g === 'raise' || g === 'point' ? 'raise' : 'none';
    // 手持道具：挂在角色手臂上随臂转动；递接瞬间全员空手（道具在空中飞行）
    const pe = config.prop?.perLine[curIdx >= 0 ? curIdx : 0];
    const heldItem = pe && pe.owner === role.key && !isTransfer ? pe.item : undefined;
    // 表情：smile/angry/sad/surprised 作为动作 token 写在剧本里
    const emotion =
      g === 'smile' || g === 'angry' || g === 'sad' || g === 'surprised' ? g : 'none';
    // 动作臂按角色 key hash 稳定分配——同课角色动不同的手，不全场挥右手
    const armSide = speakerHash(role.key) % 2 === 0 ? 'right' : 'left';
    return {
      talking: isSpeaking,
      facing: role.facing,
      gesture: arm,
      head: isSpeaking && (g === 'nod' || g === 'shake') ? g : 'none',
      heldItem,
      emotion: emotion as FigureState['emotion'],
      arm: armSide as FigureState['arm'],
    };
  };

  return (
    <svg ref={svgRef} viewBox="0 0 1600 900" className="tf-stage-svg">
      <defs>
        {/* 角色贴纸白边：把角色从任何背景色里剥出来（防融合）；强度随主题 */}
        <filter id="tf-sticker" x="-15%" y="-15%" width="130%" height="130%">
          <feMorphology in="SourceAlpha" operator="dilate" radius={th.sticker || 0.01} result="dil" />
          <feFlood floodColor="#ffffff" result="white" />
          <feComposite in="white" in2="dil" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* 风格纹理：水彩纸纹 / 胶片颗粒 */}
        <filter id="tf-turb" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={th.overlay === 'watercolor' ? '0.012 0.09' : '0.9'}
            numOctaves={2}
            seed={7}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values={
              th.overlay === 'watercolor'
                ? '0 0 0 0 0.55  0 0 0 0 0.48  0 0 0 0 0.38  0 0 0 0.35 0'
                : '0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0 0.24  0 0 0 0.18 0'
            }
          />
        </filter>
        {/* 本戴点（波普） */}
        <pattern id="tf-halftone" width={14} height={14} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx={7} cy={7} r={2.6} fill="#111111" opacity={0.10} />
        </pattern>
        {/* 方格（像素） */}
        <pattern id="tf-grid" width={22} height={22} patternUnits="userSpaceOnUse">
          <path d="M22 0 H0 V22" fill="none" stroke="#000000" strokeWidth={1.4} opacity={0.12} />
        </pattern>
      </defs>
      {/* 背景：整体按主题滤镜（角色自身配色已变换，不再叠加）；跨场时旧景交叉淡出 */}
      <g filter={th.stageFilter !== 'none' ? th.stageFilter : undefined}>
        {bgLayer.prev && (
          <g key={`prev-${bgLayer.prev}`} className="tf-bg tf-bg-leaving">
            <Backdrop bg={bgLayer.prev} />
          </g>
        )}
        <g key={bgLayer.cur} className="tf-bg tf-bg-entering">
          <Backdrop bg={bgLayer.cur} />
        </g>
      </g>
      {/* 风格纹理 overlay */}
      {th.overlay === 'halftone' && <rect x={0} y={0} width={1600} height={900} fill="url(#tf-halftone)" />}
      {th.overlay === 'grid' && <rect x={0} y={0} width={1600} height={900} fill="url(#tf-grid)" />}
      {(th.overlay === 'watercolor' || th.overlay === 'grain' || th.overlay === 'fiber') && (
        <rect
          x={0}
          y={0}
          width={1600}
          height={900}
          filter="url(#tf-turb)"
          opacity={th.overlay === 'watercolor' ? 0.5 : th.overlay === 'fiber' ? 0.4 : 0.55}
          style={{ mixBlendMode: 'multiply' }}
        />
      )}

      {/* 天气层：rain 雨丝 / wind 风线飘叶 / thunder 乌云闪电 / sun 暖阳（配雨/风/雷声） */}
      {weather === 'rain' && (
        <g opacity={0.6} pointerEvents="none">
          {Array.from({ length: 26 }).map((_, i) => (
            <line
              key={i}
              className="tf-raindrop"
              style={{ animationDelay: `${(i % 9) * 0.13}s` }}
              x1={((i * 137) % 1560) + 30}
              y1={((i * 61) % 260) - 40}
              x2={((i * 137) % 1560) + 22}
              y2={((i * 61) % 260) - 12}
              stroke="#a9d6ef"
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
        </g>
      )}
      {weather === 'wind' && (
        <g opacity={0.75} pointerEvents="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              className="tf-windline"
              style={{ animationDelay: `${i * 0.55}s` }}
              d={`M-100 ${150 + i * 90} q90 -16 180 0 t180 0`}
              fill="none"
              stroke="#b8d4e8"
              strokeWidth={5}
              strokeLinecap="round"
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <ellipse
              key={`leaf${i}`}
              className="tf-leaf"
              style={{ animationDelay: `${i * 0.8}s` }}
              cx={-30}
              cy={480 + (i % 3) * 80}
              rx={13}
              ry={7}
              fill="#a8c686"
              stroke="#8fbd78"
              strokeWidth={2}
            />
          ))}
        </g>
      )}
      {weather === 'thunder' && (
        <g opacity={0.92} pointerEvents="none">
          <g fill="#3a4258" opacity={0.88}>
            <ellipse cx={380} cy={70} rx={190} ry={62} />
            <ellipse cx={800} cy={52} rx={250} ry={72} />
            <ellipse cx={1230} cy={75} rx={210} ry={64} />
          </g>
          <path className="tf-bolt" d="M790 118 L746 268 L806 258 L766 412 L868 246 L806 258 L846 118 Z" fill="#f7e8a0" />
        </g>
      )}
      {weather === 'sun' && (
        <g opacity={0.85} pointerEvents="none">
          <circle cx={1400} cy={92} r={46} fill="#f7e8a0" stroke="#f0c040" strokeWidth={4} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={1400 + Math.cos(a) * 58}
                y1={92 + Math.sin(a) * 58}
                x2={1400 + Math.cos(a) * 76}
                y2={92 + Math.sin(a) * 76}
                stroke="#f0c040"
                strokeWidth={5}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      )}

      {/* 舞台留存物品：台词讲到的物品出现并留存（Ground 之后、角色之前，在人物"身后地面"）；
          run 标记的动态物品（狗追猫/游泳横渡）在内层 tf-run/tf-swim 包装 g 上做位移动画 */}
      {(SCRIPT_STAGE_ITEMS[config.script.id] ?? [])
        .filter((e) => e.line <= idx0)
        .map((e, i) => {
          // 颜色教学：hue/brightness 按课文颜色调物品色
          const filters = [
            e.hue ? `hue-rotate(${e.hue}deg)` : '',
            e.brightness !== undefined ? `brightness(${e.brightness})` : '',
          ].filter(Boolean).join(' ');
          return (
            <g key={`${e.item}-${e.line}-${i}`} transform={`translate(${e.x} ${e.y}) scale(${(e.size / 100).toFixed(3)})`} pointerEvents="none">
              <g className="tf-item-appear">
                <g
                  style={filters ? { filter: filters } : undefined}
                  className={
                    e.run === 1
                      ? e.item === 'swimmer' || e.item === 'aeroplane'
                        ? 'tf-swim-r'
                        : 'tf-run-r'
                      : e.run === -1
                        ? e.item === 'swimmer' || e.item === 'aeroplane'
                          ? 'tf-swim-l'
                          : 'tf-run-l'
                        : ''
                  }
                >
                  {renderFloorItem(e.item, th)}
                </g>
              </g>
            </g>
          );
        })}

      {/* 角色（在场过滤 + 走位 + 站位底座阴影 + 名牌）：present 外隐藏；walkin/walkout 整组平移；
          分场 present 新进场的角色自动播走入动画（群体轮换上场） */}
      {visibleRoles.map((r, vi) => {
        const st = figureState(r);
        const isSpeaking = speakerKey === r.key;
        const act = curActions[r.key] ?? 'none';
        const walkCls = act === 'walkin' || justEntered.has(r.key) ? ' tf-walkin' : act === 'walkout' ? ' tf-walkout' : '';
        return (
          <g key={r.key} className={`tf-actor${isSpeaking ? ' tf-actor-speaking' : ''}${walkCls}`}>
            {/* 脚底接触阴影：加重让角色"站得住" */}
            <ellipse cx={r.x + 8} cy={802} rx={86} ry={14} fill="rgba(0,0,0,0.22)" />
            {/* 贴纸白边滤镜：角色与背景的视觉分离层（强度随主题，pixel/rubberhose 关闭） */}
            <g
              filter={th.sticker > 0 ? 'url(#tf-sticker)' : undefined}
              transform={`translate(${r.x - 110}, 395)`}
            >
              <PaperFigure spec={r.figure} state={st} width={220} theme={theme} />
            </g>
            <g ref={(el) => { nametagRefs.current[vi] = el; }}>
              <rect
                x={r.x - 62}
                y={812}
                width={124}
                height={44}
                rx={22}
                fill={isSpeaking ? '#f5b041' : '#ffffff'}
                stroke="#3a3230"
                strokeWidth={3}
              />
              <text
                x={r.x}
                y={842}
                textAnchor="middle"
                fontSize={26}
                fontWeight={700}
                fill={isSpeaking ? '#ffffff' : '#3a3230'}
              >
                {r.name}
              </text>
            </g>
          </g>
        );
      })}

      {/* 飞行道具：递接瞬间从上一持有者手飞向新持有者手（抛物线，不凭空出现/消失） */}
      {isTransfer && propCur && (
        <g ref={flyRef} transform={`translate(${(keyToRole[propPrev?.owner ?? '']?.x ?? 800) + 39.6} 395)`} pointerEvents="none">
          <g transform="scale(2.2)">{renderStageProp(propCur.item, 0, th)}</g>
        </g>
      )}

      {/* 跨场黑场脉冲：暗一下表达"换场"（同景换时/异景切换都生效） */}
      {dimKey > 0 && (
        <rect key={dimKey} x={-100} y={-100} width={1800} height={1100} fill="#1a1512" className="tf-dim" />
      )}

      {/* 台词气泡（旁白句用顶部灰条区分；长句按单词折行+字号降档，底边锚定往上生长） */}
      {speakerKey && bubbleText && activeSpeakerRole && (
        <g className="tf-bubble">
          {(() => {
            const narr = speakerKey === 'N';
            const r = activeSpeakerRole;
            const lay = layoutBubble(bubbleText, { narr });
            const { bw, bh, lines, fontSize, lineH, firstBaseline } = lay;
            // 对白气泡底边锚定在 248（原单行布局的底边），长气泡向上生长；旁白顶置
            const by = narr ? 60 : Math.max(36, 248 - bh);
            const bx = Math.min(Math.max(r.x - bw / 2, 40), 1560 - bw);
            const dir = r.facing === 1 ? 1 : -1;
            const tailX = r.x;
            const bottomY = by + bh;
            const textX = bx + bw / 2;
            return (
              <g>
                {!narr && (
                  <path
                    d={`M${tailX - 16 * dir} ${bottomY} L${tailX} ${bottomY + 34} L${tailX + 16 * dir} ${bottomY} Z`}
                    fill="#ffffff"
                    stroke="#3a3230"
                    strokeWidth={3}
                  />
                )}
                <rect
                  x={bx}
                  y={by}
                  width={bw}
                  height={bh}
                  rx={26}
                  fill={narr ? '#f3ead9' : '#ffffff'}
                  stroke="#3a3230"
                  strokeWidth={3.5}
                />
                <text
                  x={textX}
                  y={by + firstBaseline}
                  textAnchor="middle"
                  fontSize={fontSize}
                  fontWeight={700}
                  fill={narr ? '#8a6d3b' : '#2c3e50'}
                >
                  {lines.map((ln, i) => (
                    <tspan key={i} x={textX} dy={i === 0 ? 0 : lineH}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })()}
        </g>
      )}
    </svg>
  );
};

export default TheaterStage;
