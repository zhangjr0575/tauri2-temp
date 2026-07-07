# Tauri 2 + Vue 3 桌面应用模版

一个开箱即用的桌面应用模版，基于 **Tauri 2** + **Vue 3** + **Vite** 构建。内置完善的 UI 布局、国际化、深色/浅色主题切换、自动更新等功能，克隆后即可直接开始业务开发。

---

## 功能特性

- **Tauri 2** — 轻量、安全的桌面应用框架
- **Vue 3** + `<script setup>` — 现代响应式 UI
- **Vite 8** — 极速 HMR 和构建
- **Vue Router 5** — 客户端路由，视图懒加载 + `<keep-alive>` 缓存
- **Vue I18n** — 国际化支持，内置中文 / English 语言包，一键切换
- **SCSS** — 使用 `sass-embedded` 进行样式开发，CSS 变量驱动的主题系统
- **自定义标题栏** — Windows / Linux 下渲染原生风格的窗口控制按钮（最小化 / 最大化 / 关闭），支持拖拽和双击最大化
- **深色 / 浅色主题** — 一键切换，跟随系统偏好自动适配，跨会话持久化存储
- **自动更新** — 内置 `tauri-plugin-updater`，支持检查更新、下载进度展示、安装重启完整流程
- **打开外部链接** — `tauri-plugin-opener` 在系统浏览器中打开 URL，Web 模式自动回退 `window.open`
- **跨平台** — macOS / Windows / Linux，同时支持 `vite dev` 的纯 Web 模式
- **平台感知** — 根据检测到的操作系统自动适配布局、标题栏和行为
- **可折叠侧边栏** — 支持展开 / 收起侧边导航，macOS 下自动适配红绿灯位置
- **嵌套路由导航** — 侧边栏支持分组折叠菜单，自动展开当前激活路由所在的分组
- **自定义指令** — 内置 `v-clickOutside` 指令，用于点击外部关闭弹出层
- **GitHub 快捷入口** — 配置 GitHub 地址后，标题栏自动展示快捷跳转按钮
- **CI/CD 发布** — 内置 GitHub Actions 工作流，推送 `release` 分支自动构建多平台安装包

## 项目结构

```
├── public/
│   ├── favicon.svg                    # 站点图标
│   ├── icon.png                       # 应用图标
│   └── icons.svg                      # SVG 图标精灵（所有 symbol 定义）
├── src/
│   ├── assets/styles/
│   │   ├── animation.scss             # 过渡动画（fade 等）
│   │   └── theme.scss                 # 主题 CSS 变量（light / dark）
│   ├── config/index.js                # 应用级常量（APP_NAME、GITHUB_URL、COPYRIGHT）
│   ├── helper/
│   │   ├── system.js                  # 平台检测、主题管理、打开外部链接
│   │   └── updater.js                 # 自动更新（检查 / 下载 / 安装 / 重启）
│   ├── layouts/
│   │   ├── assets/var.scss            # 布局 SCSS 变量（间距、尺寸）
│   │   ├── components/
│   │   │   ├── Brand.vue              # 应用品牌标识（图标 + 名称）
│   │   │   ├── Language.vue           # 语言切换下拉菜单
│   │   │   ├── SideNav.vue            # 侧边栏导航（嵌套路由、分组折叠）
│   │   │   ├── TitleBar.vue           # 自定义窗口标题栏（Windows / Linux）
│   │   │   └── Updater.vue            # 更新按钮组件（检查 / 进度 / 重启）
│   │   └── index.vue                  # 主布局外壳
│   ├── locales/
│   │   ├── en-US.js                   # 英文语言包
│   │   ├── zh-CN.js                   # 中文语言包
│   │   └── index.js                   # i18n 初始化与语言切换方法
│   ├── plugins/
│   │   ├── directives/
│   │   │   ├── clickOutside.js        # v-clickOutside 自定义指令
│   │   │   └── index.js               # 指令插件注册
│   │   └── setup/index.js             # 应用初始化插件（主题、平台标记、i18n 全局方法）
│   ├── router/index.js                # 路由定义（支持嵌套子路由）
│   ├── views/                         # 页面组件（懒加载）
│   │   ├── Console.vue                # 控制台
│   │   ├── DeviceList.vue             # 设备列表
│   │   └── TodayTodo.vue              # 今日待办
│   ├── App.vue                        # 根组件
│   └── main.js                        # 入口文件
├── src-tauri/
│   ├── capabilities/default.json      # Tauri 权限配置
│   ├── icons/                         # 应用图标（所有平台尺寸）
│   ├── src/
│   │   ├── lib.rs                     # Tauri 应用初始化与插件注册
│   │   └── main.rs                    # Rust 入口
│   ├── build.rs                       # Tauri 构建脚本
│   ├── Cargo.toml                     # Rust 依赖
│   ├── tauri.conf.json                # Tauri 配置（全平台）
│   └── tauri.macos.conf.json          # macOS 专属覆盖配置（红绿灯位置）
├── .github/workflows/publish.yml      # GitHub Actions 多平台构建发布
├── .vscode/extensions.json            # VS Code 推荐扩展（Volar）
├── index.html
├── jsconfig.json                      # JS 路径别名配置
├── package.json
├── pnpm-workspace.yaml                # pnpm 工作区配置
├── vite.config.js                     # Vite 配置（别名、开发服务器）
└── .node-version                      # Node.js 版本约束（22）
```

## 环境要求

| 工具 | 版本 | 安装方式 |
|------|------|---------|
| Node.js | >= 22 | [nodejs.org](https://nodejs.org/) |
| pnpm | >= 10 | `npm install -g pnpm` |
| Rust | >= 1.77 | [rust-lang.org](https://www.rust-lang.org/tools/install) |
| 系统依赖 | — | 参见 [Tauri 前置条件](https://v2.tauri.app/start/prerequisites/) |

## 快速开始

```bash
# 克隆模版
git clone <your-repo-url> my-app
cd my-app

# 安装依赖
pnpm install

# 启动开发服务器（仅 Web，localhost:1420）
pnpm dev

# 启动开发服务器（桌面应用）
pnpm tauri:dev
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Vite 开发服务器（Web，`localhost:1420`） |
| `pnpm build` | 构建前端生产包 |
| `pnpm preview` | 预览生产构建 |
| `pnpm tauri:dev` | 开发模式启动 Tauri 桌面应用 |
| `pnpm tauri:build` | 构建生产环境桌面应用（含签名） |

## 自定义指南

### 应用名称与基本信息

编辑 [src/config/index.js](src/config/index.js)：

```js
export const APP_NAME = "你的应用名称";
export const GITHUB_URL = `https://github.com/your-name/your-repo`;  // 留空则隐藏 GitHub 按钮
export const COPYRIGHT = `Copyright © ${APP_NAME}. All rights reserved.`;
```

### 路由与页面

在 [src/router/index.js](src/router/index.js) 中添加新页面。支持顶级路由和嵌套子路由：

```js
{
  name: 'myModule',
  path: '/my-module',
  meta: { title: 'nav.myModule', i18n: true },  // i18n key
  children: [
    {
      name: 'mySubPage',
      path: 'sub',
      meta: { title: 'nav.mySubPage', i18n: true },
      component: () => import('../views/MySubPage.vue')
    }
  ]
}
```

侧边栏导航会自动渲染路由结构，嵌套路由显示为可折叠的分组菜单。路由 `meta.hidden: true` 的条目不会展示在导航中。

### 国际化

语言包定义在 [src/locales/](src/locales/) 目录下。新增语言时在 `index.js` 的 `LOCALE_INFO_MAP` 中注册即可。

页面中使用 `$t('key')` 访问翻译文本，路由标题等位置通过 `meta.i18n: true` 标记后自动使用 i18n key 解析。

### 图标

在 [public/icons.svg](public/icons.svg) 中添加 SVG `<symbol>`，使用 `<use href="/icons.svg#icon-name" />` 引用。

### 主题

通过标题栏的太阳 / 月亮图标按钮切换深色 / 浅色主题：

- 首次加载自动检测系统偏好（`prefers-color-scheme`）
- 用户选择持久化到 `localStorage`
- 监听系统主题变化实时切换
- 主题变量定义在 [src/assets/styles/theme.scss](src/assets/styles/theme.scss)

### 自动更新

在 [src-tauri/tauri.conf.json](src-tauri/tauri.conf.json) 的 `plugins.updater` 中配置更新地址和公钥：

```json
{
  "pubkey": "你的公钥",
  "endpoints": ["https://your-server.com/latest.json"]
}
```

更新流程：检查更新 -> 展示新版本号 -> 下载安装（显示进度） -> 重启应用。更新逻辑封装在 [src/helper/updater.js](src/helper/updater.js)。

### Tauri 权限

在 [src-tauri/capabilities/default.json](src-tauri/capabilities/default.json) 中管理可用的 API。当前已启用：

| 权限 | 说明 |
|------|------|
| `core:window:*` | 窗口管理（关闭、最小化、最大化、拖拽、焦点） |
| `core:app:allow-set-app-theme` | 程序化主题切换 |
| `core:event:default` | 事件系统 |
| `opener:default` | 在系统浏览器中打开外部链接 |
| `updater:default` | 自动更新检查 |
| `os:default` | 平台检测 |
| `process:allow-restart` | 更新后重启应用 |

## 平台说明

| 平台 | 标题栏 | 行为差异 |
|------|--------|---------|
| **macOS** | 原生 Overlay 模式 | 红绿灯位置通过 `tauri.macos.conf.json` 配置（x:18, y:28）；侧边栏折叠时自动调整内边距避开红绿灯 |
| **Windows / Linux** | 自定义 `TitleBar.vue` | 渲染最小化 / 最大化 / 关闭按钮；Brand 组件移至标题栏；双击标题栏可切换最大化 |
| **Web** | 无 Tauri 标题栏 | Brand 展示在侧边栏顶部；外部链接回退 `window.open`；隐藏更新按钮；不依赖 Tauri API |

## CI/CD 发布

推送代码到 `release` 分支后，GitHub Actions 自动构建多平台安装包：

| 平台 | 构建目标 |
|------|---------|
| macOS (Apple Silicon) | `aarch64-apple-darwin` |
| macOS (Intel) | `x86_64-apple-darwin` |
| Ubuntu | `ubuntu-22.04` |
| Windows | `windows-latest` |

需要在 GitHub 仓库配置以下 Secrets：

- `TAURI_SIGNING_PRIVATE_KEY` — 签名私钥
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` — 签名私钥密码

构建完成后自动创建 Draft Release，附带签名后的安装包和 `latest.json` 更新清单。

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 桌面框架 | Tauri | 2.x |
| 前端框架 | Vue | 3.x |
| 构建工具 | Vite | 8.x |
| 路由 | Vue Router | 5.x |
| 国际化 | Vue I18n | 11.x |
| 样式 | SCSS (sass-embedded) | 1.x |
| 包管理 | pnpm | 10.x |
| 后端语言 | Rust | >= 1.77 |

## 许可证

MIT
