/**
 * 构建后处理：将 src/assets 复制到 dist/renderer/assets
 * 确保生产环境中的图片、字体等静态资源可用
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const src = path.join(projectRoot, 'src', 'assets');
const dest = path.join(projectRoot, 'dist', 'renderer', 'assets');

function copyDirSync(srcDir, destDir) {
  let count = 0;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      count += copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

if (fs.existsSync(src)) {
  // 如果目标已存在，先删除再复制（避免残留旧文件）
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  const count = copyDirSync(src, dest);
  console.log('Assets copied: ' + count + ' files to ' + dest);
} else {
  console.warn('Warning: src/assets directory not found, skipping asset copy');
}
