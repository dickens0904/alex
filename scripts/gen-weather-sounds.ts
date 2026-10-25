/**
 * 重新生成天气音效（ffmpeg 滤镜链合成，44.1kHz 高质量版）
 *   rain    6s 循环 —— 双层粉噪声（高频沙沙 + 低频雨幕）+ 雨滴颤动 + 循环淡入淡出
 *   wind    8s 循环 —— 棕噪声深低通 + 0.32Hz 阵风起伏（呼—呼—）
 *   thunder 4.7s    —— 两次棕噪声爆鸣（快起慢衰）+ aecho 滚动回声
 * 输出 src/assets/sounds/weather-*.wav（构建时随 assets 拷贝）。
 * 运行：npx tsx scripts/gen-weather-sounds.ts（需本机 ffmpeg）
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const OUT = path.resolve(__dirname, '../src/assets/sounds');
fs.mkdirSync(OUT, { recursive: true });
const file = (n: string) => path.join(OUT, `weather-${n}.wav`);

const rain = `anoisesrc=colour=pink:r=44100:a=0.55:d=6,highpass=f=1400,lowpass=f=9500,tremolo=f=11:d=0.3[s1];` +
  `anoisesrc=colour=pink:r=44100:a=0.5:d=6,lowpass=f=800[s2];` +
  `[s1][s2]amix=inputs=2:duration=first,afade=t=in:st=0:d=0.35,afade=t=out:st=5.6:d=0.4[aout]`;

const wind = `anoisesrc=colour=brown:r=44100:a=0.9:d=8,lowpass=f=650,highpass=f=70,tremolo=f=0.32:d=0.88,` +
  `afade=t=in:st=0:d=0.5,afade=t=out:st=7.5:d=0.5[aout]`;

const thunder = `anoisesrc=colour=brown:r=44100:a=0.95:d=2.2,lowpass=f=170,afade=t=in:st=0:d=0.06,afade=t=out:st=0.2:d=1.9[b1];` +
  `anoisesrc=colour=brown:r=44100:a=0.8:d=2.2,lowpass=f=140,afade=t=in:st=0:d=0.08,afade=t=out:st=0.3:d=1.7,adelay=2500:all=1[b2];` +
  `[b1][b2]amix=inputs=2:duration=longest,aecho=0.75:0.55:90|180:0.42|0.22,volume=1.5[aout]`;

const jobs: Array<[string, string]> = [
  ['rain', rain],
  ['wind', wind],
  ['thunder', thunder],
];
for (const [name, filter] of jobs) {
  execSync(`ffmpeg -y -loglevel error -filter_complex "${filter}" -map "[aout]" "${file(name)}"`);
  console.log(`weather-${name}.wav: ${Math.round(fs.statSync(file(name)).size / 1024)}KB`);
}
console.log('天气音效（ffmpeg 版）生成完毕 →', OUT);
