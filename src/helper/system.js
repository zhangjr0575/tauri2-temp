import * as tauriApp from '@tauri-apps/api/app';
import { APP_NAME } from '@/config';


const WEB_THEME_LOCAL_KEY = 'theme';

/**
 * 设置系统主题模式
 * @param { 'dark' | 'light' | 'none } theme 主题模式
 */
export async function setTheme(theme) {
    if (theme === 'none') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);

        localStorage.setItem(WEB_THEME_LOCAL_KEY, theme);
        getPlatform() !== "web" && tauriApp.setTheme(theme);
    }
}

/**
 * 获取系统主题模式
 * @returns { 'dark' | 'light' | 'none' } 主题模式
 */
export function getTheme() {
    const theme = localStorage.getItem(WEB_THEME_LOCAL_KEY);

    return !theme || theme === 'none' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : theme;
}

/**
 * 获取当前平台信息
 * @returns { 'windows' | 'macos' | 'web' } 平台信息
 */
export function getPlatform() {
    return window.__TAURI_OS_PLUGIN_INTERNALS__ ? window.__TAURI_OS_PLUGIN_INTERNALS__.platform : 'web';
}

/**
 * 获取应用名称
 */
export async function getName() {
    return getPlatform() == 'web' ? APP_NAME : await tauriApp.getName();

}

/**
 * 初始化系统参数
 */
export async function init() {
    const platform = getPlatform();

    setTheme(getTheme());
    document.documentElement.setAttribute('data-platform', platform);
}
