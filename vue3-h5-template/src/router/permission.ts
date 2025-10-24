import router from './index'

const setupPermission = () => {
  router.beforeEach((to, from, next) => {
    // 获取token
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next('/login')
      }
    }
  })
}

export default setupPermission
