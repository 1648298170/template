import { PiniaPluginContext } from 'pinia'

/**
 * @description: pinia持久化插件
 * @param {*} constext - Pinia插件上下文
 * @return {*}
 */
export default function persistencePlugin(constext: PiniaPluginContext) {
  // 监听 beforeunload 事件（页面关闭前触发）来保存状态
  window.addEventListener('beforeunload', () => {
    // 将状态保存到 localStorage
    if (constext.store.$state) {
      localStorage.setItem(`pinia-${constext.store.$id}`, JSON.stringify(constext.store.$state))
    }
  })

  // 监听 load 事件（页面加载时触发）来恢复状态
  const savedState = localStorage.getItem(`pinia-${constext.store.$id}`)

  // 如果有保存的状态，则恢复到 store
  if (savedState) {
    // 将保存的状态恢复到 store
    constext.store.$patch(JSON.parse(savedState))
  }
}
