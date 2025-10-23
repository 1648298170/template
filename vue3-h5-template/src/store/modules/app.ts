
export const useAppStore = defineStore('app-store',() => {
  const appState = ref(0)

  const increment = () => {
    appState.value++
  }

  return { appState, increment }
})
