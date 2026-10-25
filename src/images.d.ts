// 静态图片资源以 import 方式引入（webpack file-loader 处理）
// 注意：必须是无 import/export 的纯声明脚本文件，否则通配符 ambient declaration 不生效
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
