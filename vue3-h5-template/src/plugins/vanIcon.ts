import type { App } from 'vue'
import { Icon } from 'vant'

/**
 * 设置Vant图标组件
 * @param app Vue应用实例
 * @description 该函数用于注册Vant的Icon组件到Vue应用中
 */
export const setupVanIcon = (app: App<Element>) => {
  // 使用Vue的use方法注册Icon组件
  app.use(Icon)
}
