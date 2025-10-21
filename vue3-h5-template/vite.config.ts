import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import pxToViewport from 'postcss-px-to-viewport'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { VantResolver } from '@vant/auto-import-resolver'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    // 自动分割 vendor chunk
    Components({
      // 自动扫描的文件扩展名
      extensions: ['vue', 'ts', 'tsx'],
      // 搜索组件的目录，默认 'src/components'
      dirs: ['src/components'],
      // 让组件名称自动加上深度目录前缀（false 表示不加）
      directoryAsNamespace: false,
      // 指定要生成的组件的类型声明（为 TypeScript 提供提示）
      dts: 'src/types/components.d.ts',
      // UI 库解析器示例：vant ui
      resolvers: [VantResolver()],
      // 是否启用自定义 transform for vue-jsx
      // version: 'vue3' // 可选
    }),
    AutoImport({
      // 自动导入的包或 api 列表
      imports: [
        'vue', // 自动导入 vue 的 ref/reactive 等
        'vue-router', // 自动导入 useRouter/useRoute
        'vue-i18n', // 如果你使用 vue-i18n，可以自动导入 useI18n
        'pinia', // 如果你使用 vue-i18n，可以自动导入 useI18n
      ],
      // 生成到哪一个 dts 文件，供 IDE 类型提示
      dts: 'src/types/auto-imports.d.ts',
      // 自动导入到模板中（例如在 template 中直接用 ref 等）
      vueTemplate: true,
      // 自定义导入（函数名 -> 导出的模块）
      // e.g. { 'my-lib': ['useFoo'] }
      // eslintrc 配置可以在下面开启
      // UI 库解析器示例：vant ui
      resolvers: [VantResolver()],
      eslintrc: {
        enabled: true, // 生成 .eslintrc-auto-import.json
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    viteMockServe({
      mockPath: 'src/mock', // mock 文件目录
      enable: process.env.NODE_ENV !== 'production', // 生产环境不启用
      watchFiles: true, // 热更新 mock 文件
      logger: true, // 输出日志
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // 自动注入全局变量/混入（例如 src/styles/_variables.scss）
        additionalData: `@use "@/assets/styles/variables.scss" as *;`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer(),
        pxToViewport({
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 6,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-', 'van-'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          // exclude: [/node_modules/], //应避免 ignore node_modules 目录，否则将导致 Vant 样式无法被编译。
          landscape: false,
        }),
      ],
    },
  },
  server: {
    // 运行是否自动打开浏览器
    open: true,
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  
  // 优化构建输出
  build: {
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用源代码映射
    sourcemap: process.env.NODE_ENV !== 'production',
    // 优化资源文件
    assetsInlineLimit: 4096, // 4kb 以下的资源内联为 base64
    chunkSizeWarningLimit: 1000, // 超过 1000kb 时发出警告
    
    // 自定义分割策略
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型依赖单独打包
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['vant'],
          'utils': ['axios', 'dayjs'],
        },
        // 静态资源文件名命名规则
        assetFileNames: 'assets/[name]-[hash][extname]',
        // 代码块文件名命名规则
        chunkFileNames: 'js/[name]-[hash].js',
      },
    },
  },
  
  // 优化依赖预构建
  optimizeDeps: {
    // 需要预构建的依赖
    include: ['vue', 'vue-router', 'pinia', 'vant', 'axios'],
    // 排除预构建的依赖
    exclude: ['mockjs'],
  },
})
