# Tauri 2 + Vue 3 Template

[English](#english) | [中文](#chinese)

---

<a id="english"></a>

## English

A production-ready desktop application template built with **Tauri 2**, **Vue 3**, and **Vite**. Designed to be usable out of the box with a polished UI layout, dark/light theme support, auto-updating, and more.

### Features

- **Tauri 2** — Lightweight, secure desktop app framework
- **Vue 3** + `<script setup>` SFCs — Modern reactive UI
- **Vite 8** — Lightning-fast HMR and builds
- **Vue Router 5** — Client-side routing with lazy-loaded views
- **SCSS** — Scoped styling with `sass-embedded`
- **Custom Title Bar** — Native-feeling window controls with drag support
- **Dark / Light Theme** — One-click toggle, respects system preference, persists across sessions
- **Auto Updater** — Built-in `tauri-plugin-updater` with signed release support
- **Open External Links** — `tauri-plugin-opener` for launching URLs in the system browser
- **Cross-platform** — macOS / Windows / Linux, plus a web fallback via `vite dev`
- **Platform-aware** — Adapts layout and behavior based on the detected OS

### Project Structure

```
├── public/
│   ├── favicon.svg
│   ├── icon.png
│   └── icons.svg              # SVG sprite (all icon symbols)
├── src/
│   ├── config/index.js        # App-level constants (APP_NAME, COPYRIGHT)
│   ├── helper/system.js       # Platform detection, theme management, openExternal
│   ├── layouts/
│   │   ├── assets/var.scss    # Layout SCSS variables
│   │   ├── components/
│   │   │   ├── Brand.vue      # App branding
│   │   │   ├── SideNav.vue    # Sidebar navigation
│   │   │   └── TitleBar.vue   # Custom window title bar (Win/Linux)
│   │   └── index.vue          # Main layout shell
│   ├── router/index.js        # Route definitions
│   ├── views/                 # Page components (lazy-loaded)
│   ├── App.vue
│   ├── main.js                # Entry point
│   └── style.css              # Global styles & CSS variables
├── src-tauri/
│   ├── capabilities/default.json  # Tauri permission config
│   ├── icons/                 # App icons (all sizes)
│   ├── src/
│   │   ├── lib.rs             # Tauri app setup
│   │   └── main.rs            # Entry point
│   ├── Cargo.toml             # Rust dependencies
│   ├── tauri.conf.json        # Tauri config (all platforms)
│   └── tauri.macos.conf.json  # macOS-specific overrides
├── index.html
├── package.json
├── vite.config.js
└── .node-version              # Node.js 22
```

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 22 | [nodejs.org](https://nodejs.org/) |
| pnpm | Latest | `npm install -g pnpm` |
| Rust | ≥ 1.77 | [rust-lang.org](https://www.rust-lang.org/tools/install) |
| System dependencies | — | See [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/) |

### Getting Started

```bash
# Clone the template
git clone <your-repo-url> my-app
cd my-app

# Install dependencies
pnpm install

# Start dev server (web only)
pnpm dev

# Start dev server (desktop app)
pnpm tauri:dev
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server (web, `localhost:1420`) |
| `pnpm build` | Build frontend for production |
| `pnpm preview` | Preview production build |
| `pnpm tauri:dev` | Start Tauri desktop app in dev mode |
| `pnpm tauri:build` | Build production desktop app |

### Customization

**App Name & Copyright** — Edit [`src/config/index.js`](src/config/index.js):

```js
export const APP_NAME = "Your App Name";
export const COPYRIGHT = `Copyright © Your App Name. All rights reserved.`;
```

**Routes** — Add new pages in [`src/router/index.js`](src/router/index.js) and create the corresponding view in `src/views/`.

**Icons** — Add SVG symbols to [`public/icons.svg`](public/icons.svg) and reference them with `<use href="/icons.svg#icon-name" />`.

**Theme** — Theme is toggled via the sun/moon button in the header. The system preference is auto-detected on first load, and the user's choice is persisted in `localStorage`.

**Auto Updater** — Configure the updater endpoint and public key in [`src-tauri/tauri.conf.json`](src-tauri/tauri.conf.json) under `plugins.updater`:

```json
{
  "pubkey": "YOUR_PUBLIC_KEY",
  "endpoints": ["https://your-server.com/update.json"]
}
```

**Tauri Permissions** — Manage allowed APIs in [`src-tauri/capabilities/default.json`](src-tauri/capabilities/default.json). Currently enabled:

- `core:window:*` — Window management (close, minimize, maximize, drag)
- `core:app:allow-set-app-theme` — Programmatic theme switching
- `opener:default` — Open external URLs in system browser
- `updater:default` — Auto-update checks
- `os:default` — Platform detection

### Platform Notes

| Platform | Title Bar | Behavior |
|----------|-----------|----------|
| **macOS** | Native (Overlay) | Traffic lights positioned via `tauri.macos.conf.json`; sidebar collapsible with padding adjustment |
| **Windows / Linux** | Custom (`TitleBar.vue`) | Custom min/max/close buttons rendered in the app |
| **Web** | N/A | Falls back to `window.open` for external links; no Tauri APIs |

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Desktop framework | Tauri | 2.x |
| Frontend framework | Vue | 3.x |
| Build tool | Vite | 8.x |
| Router | Vue Router | 5.x |
| Styling | SCSS (sass-embedded) | 1.x |
| Language | Rust (backend) | ≥ 1.77 |

### License

MIT

---

<a id="chinese"></a>

## 中文

一个开箱即用的桌面应用模板，基于 **Tauri 2** + **Vue 3** + **Vite** 构建。提供完善的 UI 布局、深色/浅色主题切换、自动更新等功能，克隆后即可直接开始开发。

### 功能特性

- **Tauri 2** — 轻量、安全的桌面应用框架
- **Vue 3** + `<script setup>` — 现代响应式 UI
- **Vite 8** — 极速 HMR 和构建
- **Vue Router 5** — 客户端路由，视图懒加载
- **SCSS** — 使用 `sass-embedded` 进行样式开发
- **自定义标题栏** — 原生风格的窗口控制按钮，支持拖拽
- **深色/浅色主题** — 一键切换，跟随系统偏好，跨会话持久化
- **自动更新** — 内置 `tauri-plugin-updater`，支持签名发布
- **打开外部链接** — `tauri-plugin-opener` 在系统浏览器中打开 URL
- **跨平台** — macOS / Windows / Linux，同时支持 `vite dev` 的 Web 模式
- **平台感知** — 根据检测到的操作系统自动适配布局和行为

### 项目结构

```
├── public/
│   ├── favicon.svg
│   ├── icon.png
│   └── icons.svg              # SVG 图标精灵（所有图标 symbol）
├── src/
│   ├── config/index.js        # 应用级常量（APP_NAME、COPYRIGHT）
│   ├── helper/system.js       # 平台检测、主题管理、openExternal
│   ├── layouts/
│   │   ├── assets/var.scss    # 布局 SCSS 变量
│   │   ├── components/
│   │   │   ├── Brand.vue      # 应用品牌标识
│   │   │   ├── SideNav.vue    # 侧边栏导航
│   │   │   └── TitleBar.vue   # 自定义窗口标题栏（Win/Linux）
│   │   └── index.vue          # 主布局外壳
│   ├── router/index.js        # 路由定义
│   ├── views/                 # 页面组件（懒加载）
│   ├── App.vue
│   ├── main.js                # 入口文件
│   └── style.css              # 全局样式 & CSS 变量
├── src-tauri/
│   ├── capabilities/default.json  # Tauri 权限配置
│   ├── icons/                 # 应用图标（所有尺寸）
│   ├── src/
│   │   ├── lib.rs             # Tauri 应用初始化
│   │   └── main.rs            # Rust 入口
│   ├── Cargo.toml             # Rust 依赖
│   ├── tauri.conf.json        # Tauri 配置（全平台）
│   └── tauri.macos.conf.json  # macOS 专属覆盖配置
├── index.html
├── package.json
├── vite.config.js
└── .node-version              # Node.js 22
```

### 环境要求

| 工具 | 版本 | 安装方式 |
|------|------|---------|
| Node.js | ≥ 22 | [nodejs.org](https://nodejs.org/) |
| pnpm | 最新 | `npm install -g pnpm` |
| Rust | ≥ 1.77 | [rust-lang.org](https://www.rust-lang.org/tools/install) |
| 系统依赖 | — | 参见 [Tauri 前置条件](https://v2.tauri.app/start/prerequisites/) |

### 快速开始

```bash
# 克隆模板
git clone <your-repo-url> my-app
cd my-app

# 安装依赖
pnpm install

# 启动开发服务器（仅 Web）
pnpm dev

# 启动开发服务器（桌面应用）
pnpm tauri:dev
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Vite 开发服务器（Web，`localhost:1420`） |
| `pnpm build` | 构建前端生产包 |
| `pnpm preview` | 预览生产构建 |
| `pnpm tauri:dev` | 开发模式启动 Tauri 桌面应用 |
| `pnpm tauri:build` | 构建生产环境桌面应用 |

### 自定义指南

**应用名称与版权** — 编辑 [`src/config/index.js`](src/config/index.js)：

```js
export const APP_NAME = "你的应用名称";
export const COPYRIGHT = `Copyright © 你的应用名称. All rights reserved.`;
```

**路由** — 在 [`src/router/index.js`](src/router/index.js) 中添加新页面，并在 `src/views/` 下创建对应的视图组件。

**图标** — 在 [`public/icons.svg`](public/icons.svg) 中添加 SVG symbol，使用 `<use href="/icons.svg#图标名" />` 引用。

**主题** — 通过顶部 header 的日/月图标按钮切换。首次加载时自动检测系统偏好，用户的选择保存在 `localStorage` 中持久化。

**自动更新** — 在 [`src-tauri/tauri.conf.json`](src-tauri/tauri.conf.json) 的 `plugins.updater` 中配置更新地址和公钥：

```json
{
  "pubkey": "你的公钥",
  "endpoints": ["https://your-server.com/update.json"]
}
```

**Tauri 权限** — 在 [`src-tauri/capabilities/default.json`](src-tauri/capabilities/default.json) 中管理可用的 API。当前已启用：

- `core:window:*` — 窗口管理（关闭、最小化、最大化、拖拽）
- `core:app:allow-set-app-theme` — 程序化主题切换
- `opener:default` — 在系统浏览器中打开外部链接
- `updater:default` — 自动更新检查
- `os:default` — 平台检测

### 平台说明

| 平台 | 标题栏 | 行为 |
|------|--------|------|
| **macOS** | 原生（Overlay） | 红绿灯位置通过 `tauri.macos.conf.json` 配置；侧边栏可折叠并自动调整内边距 |
| **Windows / Linux** | 自定义（`TitleBar.vue`） | 在应用内渲染自定义最小化/最大化/关闭按钮 |
| **Web** | 无 | 外部链接回退到 `window.open`；不使用 Tauri API |

### 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 桌面框架 | Tauri | 2.x |
| 前端框架 | Vue | 3.x |
| 构建工具 | Vite | 8.x |
| 路由 | Vue Router | 5.x |
| 样式 | SCSS (sass-embedded) | 1.x |
| 后端语言 | Rust | ≥ 1.77 |

### 许可证

MIT
