# Vue3 H5 项目模板

## 项目简介
这是一个基于 Vue 3 + TypeScript 的移动端 H5 项目模板，集成了当前前端开发的最佳实践和主流技术栈，适用于快速开发高质量的移动端 Web 应用。

## 技术栈

### 环境
- **Node.js v22.20.0**：JavaScript 运行环境，用于执行服务器端代码
- **npm 10.9.3**：快速、节省磁盘空间的包管理工具，用于安装项目依赖
- **pnpm 10.18.3**：快速、节省磁盘空间的包管理工具，用于安装项目依赖

### 核心框架
- **Vue 3.5**：渐进式 JavaScript 框架，提供响应式数据绑定和组件化开发
- **TypeScript 5.9**：静态类型检查，增强代码可维护性和开发体验
- **Vite 7.1**：下一代前端构建工具，提供极速的开发体验和优化的构建输出

### UI 与样式
- **Vant 4.9**：轻量级移动端 UI 组件库，提供丰富的移动端交互组件
- **UnoCSS**：即时按需的原子 CSS 引擎，提供高效的样式开发体验
- **SCSS**：CSS 预处理器，增强 CSS 的可维护性和扩展性
- **postcss-px-to-viewport**：自动将 px 转换为 vw 单位，实现移动端适配

### 状态管理与路由
- **Pinia 3.0**：Vue 官方推荐的状态管理库，支持 TypeScript 类型推导
- **Vue Router 4.6**：Vue 官方路由管理器，提供单页应用的路由功能

### 国际化
- **Vue I18n 11.1**：Vue 的国际化插件，支持多语言切换功能

### 网络请求
- **Axios 1.1**：基于 Promise 的 HTTP 客户端，用于发送网络请求
- **Mock.js 1.1**：生成随机数据，拦截 Ajax 请求，用于开发环境模拟数据
- **vite-plugin-mock 3.0**：基于 Vite 的 mock 插件，支持热更新

### 开发工具与规范
- **ESLint 9.3**：代码检查工具，确保代码质量和一致性
- **Prettier 3.6**：代码格式化工具，保持代码风格统一
- **Vue-tsc 3.1**：Vue 的 TypeScript 编译器，提供类型检查
- **Husky 8.0**：Git 钩子工具，用于在 Git 操作时执行脚本
- **Commitizen 4.3**：交互式 Commit 工具，规范 Git 提交信息格式
- **Commitlint 20.1**：Commit 信息校验工具，确保提交信息符合规范

## 项目结构

```
src/
├── api/             # API 请求相关文件
│   ├── config/      # API 配置文件
│   ├── mock/        # Mock 数据 API
│   └── user/        # 用户相关 API
├── assets/          # 静态资源文件
│   └── styles/      # 样式文件
├── components/      # 公共组件
│   ├── NumberFlip/  # 数字翻转动画组件
│   └── PickerLang/  # 语言选择器组件
├── locales/         # 国际化配置
│   ├── index.ts     # 国际化配置入口
│   └── lang/        # 语言文件（中文、英文、葡萄牙语）
├── mock/            # 模拟数据目录
│   └── mock.ts      # Mock 数据配置
├── plugins/         # 插件配置
│   ├── index.ts     # 插件入口
│   └── vanIcon.ts   # Vant 图标配置
├── router/          # 路由配置
│   └── index.ts     # 路由配置入口
├── store/           # 状态管理
│   ├── index.ts     # Pinia 配置入口
│   └── modules/     # 状态模块
├── types/           # TypeScript 类型定义
│   ├── auto-imports.d.ts  # 自动导入类型定义
│   └── components.d.ts    # 组件类型定义
├── utils/           # 工具函数
│   ├── request.ts   # Axios 请求封装
│   └── vantLocale.ts # Vant 组件国际化配置
├── views/           # 页面视图
│   └── home/        # 首页视图
├── App.vue          # 根组件
└── main.ts          # 应用入口文件

项目根目录重要文件/目录：
├── .husky/          # Husky Git 钩子配置
│   ├── _/           # Husky 内部文件
│   ├── commit-msg   # Commit message 钩子，用于校验提交信息格式
│   └── pre-commit   # Pre-commit 钩子，用于提交前代码检查
├── commitlint.config.cjs  # Commitlint 配置文件，定义提交信息规范
├── git-push-script.js     # Git 推送脚本，集成 Commitizen
├── package.json           # 项目配置文件，包含依赖和脚本
└── README.md              # 项目说明文档
```

## 核心功能特性

### 1. 自动导入系统
- 自动导入 Vue 的 Composition API（如 ref、reactive、computed 等）
- 自动导入 Vue Router、Pinia、Vue I18n 相关 API
- 自动注册 Vant UI 组件
- 生成 TypeScript 类型声明文件，提供完整的 IDE 类型提示

### 2. 移动端适配
- 基于 `postcss-px-to-viewport` 的移动端适配方案
- 以 375px 为基准视口宽度，自动将 px 转换为 vw 单位
- 支持排除特定选择器（如 Vant 组件），避免重复转换

### 3. 国际化支持
- 支持中文（zh-CN）、英文（en）和葡萄牙语（pt）三种语言
- 语言设置保存在 localStorage 中，持久化用户偏好
- Vant 组件库也支持多语言切换
- 提供语言选择器组件，方便用户切换语言

### 4. Mock 数据集成
- 基于 Vite 的 mock 插件，支持热更新 mock 文件
- 开发环境下自动拦截 API 请求，返回模拟数据
- 便于在后端接口未完成时进行前端开发和调试

### 5. 统一的插件管理
- 通过 plugins/index.ts 统一管理所有插件的挂载
- 支持路由、状态管理、图标、国际化等插件的集中配置

### 6. API 请求封装
- 基于 Axios 的请求拦截器和响应拦截器
- 统一的错误处理和数据处理逻辑
- 支持多环境配置（开发、测试、生产）

### 7. Git 提交规范
- 集成 Husky，自动在 Git 操作时执行检查脚本
- 集成 Commitizen，提供交互式 Git 提交界面
- 集成 Commitlint，校验提交信息是否符合规范
- Pre-commit 钩子：提交前自动执行 ESLint 代码检查和 Prettier 代码格式化
- Commit-msg 钩子：提交时校验 Commit 信息格式

## 开发指南

### 环境要求
- **Node.js 20.x** 版本（推荐使用 Node.js 20.19.0）
- pnpm 包管理器（推荐）

### 安装依赖
```bash
pnpm install
```

### 开发环境启动
```bash
pnpm dev
```
启动后会自动打开浏览器，访问 http://localhost:5174/

### 构建生产版本
```bash
pnpm build
```
构建产物位于 dist 目录

### 类型检查
```bash
pnpm type-check
```

### 代码格式化
```bash
pnpm format
```

### 代码检查
```bash
pnpm lint
```

### 规范化提交
```bash
pnpm commit
```
使用 Commitizen 交互式界面生成符合规范的 Commit 信息

### 推送代码
```bash
pnpm push
```
使用自定义脚本推送代码到远程仓库

### 预发布合并代码
```bash
pnpm pre-release
```
使用自定义脚本合并并版本记录到远程仓库

## 配置说明

### 1. Vite 配置
配置文件位于 vite.config.ts，主要配置包括：
- 插件配置（Vue、UnoCSS、自动导入、Mock 等）
- 路径别名（@ 指向 src 目录）
- CSS 预处理器和 PostCSS 插件配置
- 服务器配置

### 2. 移动端适配配置
在 vite.config.ts 中配置 postcss-px-to-viewport：
```typescript
postcss: {
  plugins: [
    autoprefixer(),
    pxToViewport({
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 6,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['ignore-', 'van-'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      landscape: false,
    }),
  ],
},
```

### 3. 国际化配置
在 src/locales/index.ts 中配置 Vue I18n：
- 引入各语言文件
- 设置默认语言
- 配置全局注入
- 语言切换逻辑

### 4. Git 提交规范配置
- **Husky 配置**：在 .husky 目录下配置 Git 钩子
  - pre-commit：提交前执行 `pnpm lint` 进行代码检查和格式化
  - commit-msg：提交时使用 commitlint 校验提交信息格式
- **Commitizen 配置**：在 package.json 中配置 commitizen 路径
- **Commitlint 配置**：使用 @commitlint/config-conventional 规范

### 5. 代码格式化配置
- **Prettier 配置**：在 .prettierrc.json 中配置代码格式化规则
  - 使用单引号
  - 不使用分号
  - 设置打印宽度为100字符
- **ESLint 配置**：在 eslint.config.ts 中配置代码检查规则
  - 结合 Prettier 和 Vue TypeScript 规则
  - 关闭多词组件名校验

## 使用示例

### 1. 页面开发
在 views 目录下创建新的 Vue 组件，然后在 router/index.ts 中配置路由：

```typescript
// router/index.ts
{
  path: '/example',
  name: 'Example',
  component: () => import('@/views/example/index.vue'),
}
```

### 2. API 请求
使用封装好的 request 工具发送 API 请求：

```typescript
import request from '@/utils/request'

export const fetchData = () => {
  return request.get('/api/data')
}
```

### 3. 组件开发
在 components 目录下创建可复用的 Vue 组件，组件会自动注册到全局。

### 4. 国际化使用
在模板中使用 $t 函数进行翻译：

```vue
<template>
  <div>{{ $t('home.title') }}</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
// 切换语言
locale.value = 'en'
</script>
```

## 最佳实践

### 1. 组件设计
- 遵循单一职责原则，一个组件只做一件事
- 使用 Composition API 编写逻辑清晰的组件
- 提供完整的 TypeScript 类型定义

### 2. 状态管理
- 使用 Pinia 进行全局状态管理
- 按功能模块划分 store
- 使用 TypeScript 定义 state、getters、actions 的类型

### 3. 国际化
- 在 lang 目录下添加新的语言文件
- 使用语义化的键名组织翻译文本
- 对于复杂的国际化需求，使用命名空间

### 4. 性能优化
- 使用 Vue 3 的 Composition API 减少不必要的响应式数据
- 合理使用 v-memo、v-once 等指令优化渲染性能
- 懒加载路由和组件

### 5. Git 提交规范
- 使用 `pnpm commit` 命令进行规范化提交
- 遵循 Conventional Commits 规范
- 提交信息应清晰描述变更内容和类型
- 在提交前确保代码通过 ESLint 检查和 Prettier 格式化

## 常见问题

1. **如何添加新的语言支持？**
   - 在 locales/lang 目录下创建新的语言文件
   - 在 locales/index.ts 中引入并注册新语言
   - 在 PickerLang 组件中添加新的语言选项

2. **如何配置不同环境的 API 地址？**
   - 在 api/config 目录下创建不同环境的配置文件
   - 根据 NODE_ENV 环境变量加载对应的配置

3. **如何添加新的 Vant 组件？**
   - 由于配置了自动导入，无需手动引入组件
   - 直接在模板中使用 Vant 组件即可

4. **如何调试 Mock 数据？**
   - 修改 src/mock/mock.ts 中的模拟数据
   - Mock 数据会自动热更新，无需重启开发服务器

5. **如何进行规范化提交？**
   - 使用 `pnpm commit` 命令启动 Commitizen 交互式提交界面
   - 按照提示选择提交类型、输入提交信息
   - 系统会自动校验提交信息是否符合规范

6. **代码提交前会进行哪些检查？**
   - 使用 ESLint 检查代码质量并自动修复问题
   - 使用 Prettier 格式化代码风格
   - 确保代码符合团队规范后再允许提交

## 许可证
MIT
