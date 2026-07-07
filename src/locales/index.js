import { createI18n } from 'vue-i18n'

import zhCN from './zh-CN'
import enUS from './en-US'

const LOCAL_KEY = 'locale', LOCALE_INFO_MAP = {
  'zh-CN': { icon: '🇨🇳', label: '简体中文'},
  'en-US': { icon: '🇺🇸', label: 'English'}
}

function getLocale() {
  const saved = localStorage.getItem(LOCAL_KEY)

  if (saved) return saved

  const lang = navigator.language || 'zh-CN'

  return lang.startsWith('zh') ? 'zh-CN' : 'en-US'
}

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export const t = i18n.global.t
export const locale = i18n.global.locale
export const AVAILABLE_LOCALES = Object.freeze(i18n.global.availableLocales.map(value => ({ value, ...LOCALE_INFO_MAP[value]})))

export function setLocale(lang) {
  i18n.global.locale.value = lang
  localStorage.setItem(LOCAL_KEY, lang)
}

console.log(i18n.global);

export function getCurrentLocale() {
  return i18n.global.locale.value
}

export default i18n
