import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupVanIcon } from './vanIcon'
import type { App } from 'vue'
import { setupI18n } from '@/locales'
import setupDirectives from './directives'
import setupPermission from '@/router/permission'

//app 挂载插件
export default {
  install(app: App<Element>) {
    setupStore(app) // 挂载pinia
    setupRouter(app) // 挂载路由
    setupVanIcon(app) // 挂载vant图标
    setupI18n(app) // 挂载国际化
    setupDirectives(app) // 挂载自定义指令
    setupPermission() // 挂载路由守卫
  },
}
