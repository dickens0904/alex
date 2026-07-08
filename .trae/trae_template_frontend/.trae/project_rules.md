# 前端项目开发全局规则（Trae AI必须严格遵守）

## 一、基础编码规范
- 编程语言：TypeScript 5.0+
- 编码规范：严格遵循ESLint和Prettier配置
- 变量命名：
  - camelCase（变量/函数/方法）
  - PascalCase（组件/类/接口/类型）
  - UPPER_SNAKE_CASE（常量）
- 行长度：最大120字符
- 导入顺序：React相关→第三方库→本地组件→样式文件
- 注释要求：
  - 所有公共组件/函数/接口必须有JSDoc注释
  - 复杂逻辑必须添加行内注释说明意图
  - TODO/FIXME注释必须关联issue编号
- 错误处理：
  - 所有异步操作必须有try/catch处理
  - Promise必须有catch处理，禁止未处理的Promise rejection
  - 错误信息必须用户友好，便于调试

## 二、技术栈与依赖约束
- 框架：React 18+
- 构建工具：Vite 5+
- 语言：TypeScript 5.0+（严格模式strict: true）
- 路由：React Router 6+
- 状态管理：Zustand 4+
- 样式：Tailwind CSS 3+ + CSS Modules
- 请求：Axios 1+
- 表单：React Hook Form + Zod
- 测试：Vitest + React Testing Library
- 代码质量：ESLint + Prettier + TypeScript严格检查

## 三、React最佳实践
- 优先使用函数组件和Hooks，禁止使用类组件（除非必要）
- 禁止在循环、条件语句中调用Hooks
- 复杂状态逻辑抽离为自定义Hooks
- 组件拆分原则：单一职责，单个组件不超过300行
- Props传递：
  - 禁止透传props（{...props}）除非明确知道所有属性
  - Props必须有TypeScript类型定义
  - 可选Props必须有默认值
- 状态管理：
  - 组件内状态用useState，跨组件状态用Zustand
  - 避免状态提升过度
  - 避免不必要的重渲染（使用memo、useMemo、useCallback）

## 四、TypeScript规范
- 禁止使用`any`类型，必须使用具体类型或`unknown`
- 禁止使用`Object`类型，使用`Record<string, unknown>`
- 所有函数必须有参数和返回值的类型定义
- 组件Props必须定义interface
- 优先使用type而不是interface（除非需要扩展）
- 枚举使用const enum
- 严格模式下，所有变量必须有明确类型

## 五、目录结构与组织
```
src/
├── components/        # 通用组件
│   ├── Button/
│   │   ├── index.tsx
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.css
├── hooks/             # 自定义Hooks
├── pages/             # 页面组件
├── services/          # API服务
├── store/             # 状态管理
├── types/             # 通用类型定义
├── utils/             # 工具函数
└── assets/            # 静态资源
```
- 每个组件独立文件夹，包含组件文件、测试文件、样式文件
- 单个文件不超过500行
- 每个模块职责单一
- 循环依赖必须通过依赖注入解决

## 六、样式规范
- 优先使用Tailwind CSS工具类
- 复杂样式使用CSS Modules
- 禁止使用内联样式（除非动态样式）
- 响应式设计优先使用Tailwind的断点
- 主题色使用CSS变量，支持暗色模式
- 禁止硬编码颜色和尺寸，使用设计token

## 七、API与请求规范
- 所有API请求统一封装在services目录
- 请求拦截器统一处理认证和错误
- 响应拦截器统一处理数据格式
- 所有请求必须有超时时间
- 分页、排序、筛选参数统一格式
- 取消请求：组件卸载时自动取消 pending 请求

## 八、安全要求
- 所有用户输入必须进行验证和清洗
- XSS防护：使用React的默认转义，禁止使用dangerouslySetInnerHTML除非必要
- CSRF防护：使用token验证
- 敏感信息禁止存储在localStorage，使用sessionStorage或加密存储
- 路由权限验证，禁止未授权访问
- 禁止在前端硬编码API密钥或敏感配置

## 九、测试要求
- 单元测试覆盖率不低于70%
- 核心业务逻辑覆盖率必须达到100%
- 测试用例必须覆盖正常情况、边界情况和异常情况
- 每个组件至少有一个渲染测试
- 每个Hook至少有一个测试用例
- 禁止测试实现细节，测试行为

## 十、Trae AI行为准则（最高优先级）
1. 当你不确定时，**永远提问而不是猜测**
2. 生成代码前必须先理解现有代码的结构和风格
3. 不要修改你不理解的代码
4. 所有修改必须有明确的理由
5. 如果发现代码中有bug，优先修复而不是绕过
6. 严格遵守本文件中的所有规则，如有冲突以本文件为准
7. 不要生成任何与当前任务无关的代码
8. 生成的代码必须能够直接运行，不能有语法错误
9. 生成的TypeScript代码必须通过类型检查
