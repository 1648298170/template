<template>
  <div class="nav-container">
    <div class="indicator" :style="indicatorStyle"></div>
    <div class="nav">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="nav-item"
        :class="{ active: activeTab === index }"
        @click="changeTab(index)"
      >
        <van-icon :name="tab.icon" size="16" />
        <span>{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
// Props 定义
const props = withDefaults(
  defineProps<{
    tabs: { label: string; icon: string }[]
    initialTab?: number
  }>(),
  {
    initialTab: 0,
  },
)
// 响应式状态,当前激活的标签页索引
const activeTab = ref(props.initialTab)

// 计算属性，用于计算指示器的样式
const indicatorStyle = computed(() => ({
  // 指示器位置和宽度根据当前激活的标签页动态计算
  left: `${activeTab.value * (100 / props.tabs.length)}%`,
  width: `${100 / props.tabs.length}%`,
}))

// 切换标签页函数
const changeTab = (index: number) => {
  activeTab.value = index
  appStore.setCurrentTabsIndex(index)
}
</script>

<style scoped lang="scss">
.nav-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: #fff;
  border-radius: 35px;
  box-shadow: 0 5px 15px rgba (0, 0, 0, 0.08);
  overflow: hidden;

  .nav {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;

    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #555;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3 sease;
      cursor: pointer;
      z-index: 2;

      &.active {
        color: #fff;
        transform: translateY(-1px);
      }
    }
  }

  .indicator {
    position: absolute;
    top: 0;
    height: 100%;
    background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 35px;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 0;
  }
}

// @media (max-width: 600px) {
//   .nav-item {
//     font-size: 12px;
//   }

//   .nav-item {
//     font-size: 18px;
//   }
// }
</style>
