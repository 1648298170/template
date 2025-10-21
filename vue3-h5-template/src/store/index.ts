import type { App } from 'vue'

const store = createPinia()

/**
 * 设置并挂载Vuex存储到Vue应用实例
 * @param app - Vue应用实例，类型为App<Element>
 */
export function setupStore(app: App<Element>) {
  // 使用use方法将store注册为Vue插件，这样在所有组件中都可以访问到store
  app.use(store)
}

export default { store }
