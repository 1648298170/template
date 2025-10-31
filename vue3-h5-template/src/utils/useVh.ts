// src/hooks/useVh.ts
import { onMounted, onUnmounted } from 'vue'

/**
 * 使用自定义hook来动态设置视口高度(vh)变量，解决移动端浏览器地址栏弹出导致的视口高度变化问题
 * 该hook会在组件挂载时计算并设置--vh CSS变量，并在窗口大小变化时更新
 */
export function useVh() {
  // 更新视口高度函数
  const updateVh = () => {
    // 计算当前视口高度的1%，并存储到CSS变量--vh中
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // 组件挂载时执行
  onMounted(() => {
    // 初始化设置视口高度

    updateVh()
    // 添加窗口大小变化事件监听器，当窗口大小变化时更新视口高度
    window.addEventListener('resize', updateVh)
  })

  // 组件卸载时执行
  onUnmounted(() => {
    // 移除窗口大小变化事件监听器，避免内存泄漏
    window.removeEventListener('resize', updateVh)
  })
}
