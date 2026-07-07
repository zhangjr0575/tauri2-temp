import i18n from '@/locales'
import { getPlatform, setTheme, getTheme } from '@/helper/system';

export default {
    install(app) {
        // 初始化主题
        setTheme(getTheme(), false);
        // 挂载i18n语言包文本读取方法, 简化页面使用复杂度
        app.config.globalProperties.$t = i18n.global.t;
        // 为应用追加平台标记
        document.documentElement.setAttribute('data-platform', getPlatform());
        // 监听系统级夜间模式切换事件
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            setTheme(e.matches ? 'dark' : 'light', false);
        });
    }
}