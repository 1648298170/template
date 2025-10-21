import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
  ],
})

/**
 * 设置路由的函数
 * @param app - Vue应用实例，类型为App<Element>
 */
export const setupRouter = (app: App<Element>) => {
  // 使用Vue Router插件，将路由挂载到Vue应用实例上
  app.use(router)
}

export default router
