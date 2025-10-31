import { PiniaPluginContext } from 'pinia'

/**
 * @description: pinia持久化插件
 * @param {*} context - Pinia插件上下文
 * @return {*}
 */
export default function persistencePlugin(context: PiniaPluginContext) {
  // 恢复状态
  const savedState = localStorage.getItem(`pinia-${context.store.$id}`)
  if (savedState) context.store.$patch(JSON.parse(savedState))

  // 订阅 store 变化，实时保存
  context.store.$subscribe((mutation, state) => {
    localStorage.setItem(`pinia-${context.store.$id}`, JSON.stringify(state))
  })
}
