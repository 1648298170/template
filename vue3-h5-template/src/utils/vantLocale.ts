import { Locale } from 'vant'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US'
import ptBR from 'vant/es/locale/lang/pt-BR'
import zhCN from 'vant/es/locale/lang/zh-CN'

export default function vantLocale(lang: 'zh-CN' | 'en' | 'pt') {
  const localeMap = {
    'zh-CN': {
      label: 'zh-CN',
      vant: zhCN,
    },
    en: {
      label: 'en-US',
      vant: enUS,
    },
    pt: {
      label: 'pt-BR',
      vant: ptBR,
    },
  }
  Locale.use(localeMap[lang].label, localeMap[lang].vant)
}
