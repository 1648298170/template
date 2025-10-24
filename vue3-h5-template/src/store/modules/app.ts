export const useAppStore = defineStore('app-store', () => {
  const state = reactive({
    userInfo: {}, // 用户信息
    currentTabsIndex: 0, // 当前激活的tab
  })

  // 计算属性，获取当前激活的tab索引
  const currentTabsIndex = computed(() => state.currentTabsIndex)

  // 设置用户信息
  const setUserInfo = (userInfo: { [key: string]: unknown }) => {
    state.userInfo = userInfo
  }

  // 修改当前激活的tab索引
  const setCurrentTabsIndex = (index: number) => {
    state.currentTabsIndex = index
  }

  return { state, currentTabsIndex, setUserInfo, setCurrentTabsIndex }
})
