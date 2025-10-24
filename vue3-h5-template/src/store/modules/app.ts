
export const useAppStore = defineStore('app-store',() => {
  const state = reactive({
    userInfo:{}
  })

  const setUserInfo = (userInfo:{[key:string]:unknown}) => {
    state.userInfo = userInfo
  }

  return { state, setUserInfo }
})
