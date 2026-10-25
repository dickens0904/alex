import React, { useEffect, useRef } from 'react';
import { STYLE_THEMES, transformColor, type StyleId } from '../../data/theater/theaterStyles';

/**
 * 纸片角色（原创语义 SVG，画法借鉴 huashu-art-motion 37/52 号卡：
 * 圆端描边平涂卡通 + 部件分组 + 枢轴动作；儿童情景剧用，不走 AI 生帧路线）
 *
 * 支持 7 种风格主题（theaterStyles）：描边样式/角色配色/动画步进随主题变换。
 * 手臂旋转走关节驱动（SVG 三参数 rotate 绕肩，rAF 逐帧写入），不用 CSS origin 推断。
 */

export interface FigureSpec {
  /** 肤色 */
  skin: string;
  /** 头发颜色 */
  hair: string;
  /** 发型：男短发 / 女丸子头 / 女长发 */
  hairStyle: 'short' | 'bun' | 'long';
  /** 上衣颜色 */
  shirt: string;
  /** 下装颜色 */
  pants: string;
  /** 是否裙装 */
  dress?: boolean;
}

/** 手持道具类型（剧本 SCRIPT_PROPS 引用） */
export type PropKind =
  | 'bag'
  | 'vase'
  | 'umbrella'
  | 'book'
  | 'envelope'
  | 'card'
  | 'suitcase'
  | 'pen'
  | 'pencil'
  | 'watch'
  | 'glasses'
  | 'icecream'
  | 'hammer'
  | 'cup'
  | 'key'
  | 'newspaper'
  | 'photo'
  | 'shirt'
  | 'hat';

/** 表情：台词的情绪态度（眉+嘴形，持续到下一动作） */
export type Emotion = 'none' | 'smile' | 'angry' | 'sad' | 'surprised';

export interface FigureState {
  /** 正在说话（嘴开合 + 身体微动） */
  talking?: boolean;
  /** 朝向：1 朝右，-1 朝左（用 scale 翻转） */
  facing?: 1 | -1;
  /** 手臂动作 */
  gesture?: 'none' | 'wave' | 'raise';
  /** 头部动作 */
  head?: 'none' | 'nod' | 'shake';
  /** 手持道具（挂在手上随手臂一起转动，才是"真的拿着"） */
  heldItem?: PropKind;
  /** 表情（台词情绪） */
  emotion?: Emotion;
  /** 动作臂：right 右手 / left 左手（按角色 hash 稳定分配，避免"全场都在挥右手"） */
  arm?: 'left' | 'right';
}

const PaperFigure: React.FC<{
  spec: FigureSpec;
  state: FigureState;
  width?: number;
  /** 画风主题（默认 paper 纸片描边卡通） */
  theme?: StyleId;
}> = ({ spec, state, width = 220, theme = 'paper' }) => {
  const { talking, facing = 1, gesture = 'none', head = 'none', heldItem, emotion = 'none', arm: armSide = 'right' } = state;
  const s = spec;
  const th = STYLE_THEMES[theme] ?? STYLE_THEMES.paper;
  const strokeWidth = th.stroke.width;
  const strokeColor = th.stroke.width > 0 ? th.stroke.color : 'none';
  // 角色配色按主题变换（HSL）
  const c = {
    skin: transformColor(spec.skin, th),
    hair: transformColor(spec.hair, th),
    shirt: transformColor(spec.shirt, th),
    pants: transformColor(spec.pants, th),
  };

  // ===== 手臂旋转：物理正确的关节驱动 =====
  // 轴心显式指定为肩关节解剖位置（SVG 三参数 rotate(deg cx cy)），
  // 角度用代码逐帧驱动（rAF + 平滑逼近）；步进帧率随主题（橡皮管/像素 12fps）
  const armLRef = useRef<SVGGElement | null>(null);
  const armRRef = useRef<SVGGElement | null>(null);
  const curL = useRef(8);
  const curR = useRef(-8);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    // 动作臂：主臂做手势，副臂静置（手持道具的臂不参与手势，物理合理）
    const actTarget = gesture === 'wave' ? -150 : gesture === 'raise' ? -115 : -8;
    const tick = (now: number) => {
      let t = (now - start) / 1000;
      if (th.stepFps > 0) {
        // 步进动画：老动画"一顿一顿"是风格的一半，不是卡顿
        t = Math.floor(t * th.stepFps) / th.stepFps;
      }
      const swing = gesture === 'wave' ? Math.sin((t * 2 * Math.PI) / 0.7) * 11 : 0;
      const targetL = armSide === 'left' ? actTarget + swing : 8;
      const targetR = armSide === 'right' ? actTarget + swing : -8;
      // 指数平滑：抬臂观感自然
      curL.current += (targetL - curL.current) * 0.18;
      curR.current += (targetR - curR.current) * 0.18;
      armLRef.current?.setAttribute('transform', `rotate(${curL.current.toFixed(2)} 32 70)`);
      armRRef.current?.setAttribute('transform', `rotate(${curR.current.toFixed(2)} 68 70)`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [gesture, armSide, th.stepFps]);

  const hairShape =
    s.hairStyle === 'short' ? (
      // 男短发：头顶弧 + 两侧鬓角
      <path
        d="M28 30 Q30 8 50 8 Q70 8 72 30 L72 24 Q64 18 50 18 Q36 18 28 24 Z"
        fill={c.hair}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    ) : s.hairStyle === 'bun' ? (
      // 女丸子头：头顶发髻 + 包头弧
      <g>
        <circle cx={50} cy={6} r={9} fill={c.hair} stroke={strokeColor} strokeWidth={strokeWidth} />
        <path
          d="M28 30 Q30 8 50 8 Q70 8 72 30 L72 22 Q64 15 50 15 Q36 15 28 22 Z"
          fill={c.hair}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
    ) : (
      // 女长发：包头弧 + 两侧垂发到肩
      <path
        d="M27 26 Q28 6 50 6 Q72 6 73 26 L75 62 Q68 66 66 56 L66 30 Q58 22 50 22 Q42 22 34 30 L34 56 Q32 66 25 62 Z"
        fill={c.hair}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    );

  // 身体：裙装画梯形裙，裤装画上衣+两腿
  const body = s.dress ? (
    <g>
      <path
        d="M32 60 L68 60 L80 128 L20 128 Z"
        fill={c.shirt}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* 裙摆暗面（两层明暗） */}
      <path d="M20 128 L80 128 L77 118 L23 118 Z" fill="rgba(0,0,0,0.14)" stroke="none" />
    </g>
  ) : (
    <g>
      <rect x={30} y={58} width={40} height={64} rx={10} fill={c.shirt} stroke={strokeColor} strokeWidth={strokeWidth} />
      {/* 下摆暗面 */}
      <rect x={30} y={110} width={40} height={12} rx={6} fill="rgba(0,0,0,0.14)" stroke="none" />
    </g>
  );

  const legs = s.dress ? (
    <g>
      <rect x={38} y={126} width={10} height={54} rx={5} fill={c.skin} stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x={52} y={126} width={10} height={54} rx={5} fill={c.skin} stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x={34} y={176} width={17} height={9} rx={4.5} fill="#5d4a3a" stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x={49} y={176} width={17} height={9} rx={4.5} fill="#5d4a3a" stroke={strokeColor} strokeWidth={strokeWidth} />
    </g>
  ) : (
    <g>
      <rect x={36} y={118} width={12} height={62} rx={6} fill={c.pants} stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x={52} y={118} width={12} height={62} rx={6} fill={c.pants} stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x={32} y={176} width={19} height={9} rx={4.5} fill="#5d4a3a" stroke={strokeColor} strokeWidth={strokeWidth} />
      <rect x={49} y={176} width={19} height={9} rx={4.5} fill="#5d4a3a" stroke={strokeColor} strokeWidth={strokeWidth} />
    </g>
  );

  // 手臂渲染：SVG 三参数 rotate 显式绕肩关节 (x,70)，角度由 rAF 逐帧写入 ref
  const armPath = (x: number) => (
    <g>
      <line x1={x} y1={70} x2={x} y2={108} stroke={strokeColor} strokeWidth={9} strokeLinecap="round" />
      <line
        x1={x}
        y1={72}
        x2={x}
        y2={104}
        stroke={strokeColor === 'none' ? c.shirt : c.shirt}
        strokeWidth={strokeWidth > 0 ? 6 : 7}
        strokeLinecap="round"
      />
      <circle cx={x} cy={110} r={6.5} fill={c.skin} stroke={strokeColor} strokeWidth={strokeWidth} />
    </g>
  );
  const propSvg = (held: PropKind, x: number) => {
    const tc = (hex: string) => transformColor(hex, th);
    const sw = strokeColor === 'none' ? 'none' : strokeColor;
    const line = sw === 'none' ? '#3a3230' : sw;
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
        return null;
    }
  };
  const armGroup = (x: number, ref: React.RefObject<SVGGElement>, held?: PropKind) => (
    <g ref={ref}>
      {armPath(x)}
      {held && propSvg(held, x)}
    </g>
  );

  // 头部动作：nod 上下 / shake 左右（CSS keyframes，见 theater.css）
  const headClass = head === 'nod' ? 'tf-head-nod' : head === 'shake' ? 'tf-head-shake' : '';

  return (
    <svg
      width={width}
      height={width * 1.9}
      viewBox="0 0 100 190"
      className={`tf-figure ${talking ? 'tf-talking' : ''}`}
      style={{ transform: `scaleX(${facing})` }}
    >
      {/* 呼吸浮动层 */}
      <g className="tf-breathe">
        {legs}
        {body}
        {/* 头组（nod/shake 动画作用于此） */}
        <g className={headClass}>
          <circle cx={50} cy={32} r={23} fill={c.skin} stroke={strokeColor} strokeWidth={strokeWidth} />
          {hairShape}
          {/* 眉毛：随表情变化（angry 压眉 / sad 挑眉 / surprised 高挑） */}
          {emotion === 'angry' && (
            <g stroke="#3a3230" strokeWidth={2.4} strokeLinecap="round">
              <path d="M37 21 L46 24" fill="none" />
              <path d="M63 21 L54 24" fill="none" />
            </g>
          )}
          {emotion === 'sad' && (
            <g stroke="#3a3230" strokeWidth={2.4} strokeLinecap="round">
              <path d="M37 23 L46 19" fill="none" />
              <path d="M63 23 L54 19" fill="none" />
            </g>
          )}
          {emotion === 'surprised' && (
            <g stroke="#3a3230" strokeWidth={2.4} strokeLinecap="round">
              <path d="M37 17 L46 16" fill="none" />
              <path d="M63 17 L54 16" fill="none" />
            </g>
          )}
          {/* 眼睛：大眼白 + 小点瞳孔 */}
          <g className="tf-face">
            <ellipse cx={42} cy={30} rx={5.5} ry={6} fill="#fff" stroke={strokeColor === 'none' ? '#3a3230' : strokeColor} strokeWidth={2} />
            <ellipse cx={58} cy={30} rx={5.5} ry={6} fill="#fff" stroke={strokeColor === 'none' ? '#3a3230' : strokeColor} strokeWidth={2} />
            <circle cx={43.5} cy={31} r={2.1} fill="#3a3230" />
            <circle cx={59.5} cy={31} r={2.1} fill="#3a3230" />
          </g>
          {/* 嘴：表情优先（哭笑弧线/惊叫圆嘴/生气平嘴），无表情时 talking 开合 */}
          {emotion === 'smile' ? (
            <path d="M43 41 Q50 47.5 57 41" fill="none" stroke={strokeColor === 'none' ? '#3a3230' : strokeColor} strokeWidth={2.6} strokeLinecap="round" />
          ) : emotion === 'sad' ? (
            <path d="M43 46 Q50 40 57 46" fill="none" stroke={strokeColor === 'none' ? '#3a3230' : strokeColor} strokeWidth={2.6} strokeLinecap="round" />
          ) : emotion === 'angry' ? (
            <path d="M42 44 L58 43.4" fill="none" stroke={strokeColor === 'none' ? '#3a3230' : strokeColor} strokeWidth={2.6} strokeLinecap="round" />
          ) : emotion === 'surprised' ? (
            <ellipse cx={50} cy={43} rx={4.6} ry={5.6} fill="#a8503f" stroke={strokeColor === 'none' ? 'none' : strokeColor} strokeWidth={1.6} />
          ) : (
            <ellipse
              className="tf-mouth"
              cx={50}
              cy={43}
              rx={5}
              ry={talking ? 3.6 : 1.4}
              fill="#a8503f"
              stroke={strokeColor === 'none' ? 'none' : strokeColor}
              strokeWidth={strokeWidth > 0 ? 1.6 : 0}
            />
          )}
        </g>
        {/* 双臂都在头之后绘制（即画面最上层）：挥舞/举手的臂必须在头前面，
            不被头遮住；静置臂垂在身侧与头不重叠，无遮挡副作用 */}
        {armGroup(32, armLRef)}
        {armGroup(68, armRRef, heldItem)}
      </g>
    </svg>
  );
};

export default PaperFigure;
