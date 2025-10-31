// 防抖函数
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastTime = 0
  return function (...args: Parameters<T>) {
    const now = Date.now()

    if (now - lastTime >= wait) {
      if (timeout) clearTimeout(timeout)
      func(...args)
      lastTime = now
    } else {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }
}
