import type { App } from 'vue'
import persistencePlugin from './plugin/persistence';

const store = createPinia();

store.use(persistencePlugin);
store.use(({ store }) => {
  console.log("store changed:", store.$id);
});

/**
 * 设置并挂载Vuex存储到Vue应用实例
 * @param app - Vue应用实例，类型为App<Element>
 */
export function setupStore(app: App<Element>) {
  console.log("挂载store")
  // 使用use方法将store注册为Vue插件，这样在所有组件中都可以访问到store
  app.use(store)
}

export default { store }
