import { defineConfig } from 'unocss'
// import presetUno from '@unocss/preset-uno'
// import presetAttributify from '@unocss/preset-attributify'
// import presetIcons from '@unocss/preset-icons'
// import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  theme: {
    spacing: Object.fromEntries(Array.from({ length: 50 }, (_, i) => [i, `${i * 4}px`])),
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
    },
  },
  // presets: [
  //   presetRemToPx(), //将所有实用程序的 rem 转换为 px。
  // ],
})
