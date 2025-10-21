import type { App, Directive } from 'vue'

// 🖼️ 懒加载指令
const lazy: Directive<HTMLImageElement, string> = {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.unobserve(el)
        }
      })
    })
    observer.observe(el)
  },
}

// 📋 复制文本指令（示例）
const copy: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(binding.value || '')
    })
  },
}

// 🚦 权限控制指令（示例）
const permission: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    const userRoles = ['admin'] // 实际项目应从 store / token 中获取
    if (!userRoles.includes(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

// 🧩 所有指令统一导出
const directivesList: Record<string, Directive> = {
  lazy,
  copy,
  permission,
}

/**
 * 全局注册自定义指令
 * @param app Vue 应用实例
 */
export const setupDirectives = (app: App<Element>) => {
  Object.keys(directivesList).forEach((key) => {
    app.directive(key, directivesList[key])
  })
}

export default setupDirectives
