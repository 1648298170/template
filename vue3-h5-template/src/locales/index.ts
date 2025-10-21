import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import zhCn from './lang/zh-CN.json'
import pt from './lang/pt.json'
import en from './lang/en.json'
import vantLocale from '@/utils/vantLocale'
const messages = {
  'zh-CN': zhCn,
  en,
  pt,
}

const locale = (localStorage.getItem('langauge') || 'zh-CN') as 'zh-CN' | 'en' | 'pt'

const i18n = createI18n({
  legacy: false,
  locale,
  messages,
  globalInjection: true, // 全局注入
})

export const setupI18n = (app: App<Element>) => {
  vantLocale(locale)
  app.use(i18n)
}
export default i18n
