<template>
  <div>
    <!-- <div class="p-2 bg-amber c-fuchsia">{{ $t('home.title') }}</div>
    <PickerLang></PickerLang>
     -->
    <!-- 页面内容区域 -->
    <div class="page-container">
      <HomeIndex v-show="appStore.currentTabsIndex === 0" />
      <Category v-show="appStore.currentTabsIndex === 1" />
      <Cart v-show="appStore.currentTabsIndex === 2" />
      <Profile v-show="appStore.currentTabsIndex === 3" />
    </div>

    <!-- 底部导航栏 -->
    <ElasticTabs :initial-tab="appStore.currentTabsIndex" :tabs="tabs"></ElasticTabs>
  </div>
</template>

<script setup lang="ts">
import { mockApi } from '@/api/mock/mockApi'
import ElasticTabs from './components/ElasticTabs.vue'
import { useAppStore } from '@/store/modules/app'
import HomeIndex from './pages/HomeIndex.vue'
import Category from './pages/Category.vue'
import Cart from './pages/Cart.vue'
import Profile from './pages/Profile.vue'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()

const { t } = useI18n()

const tabs = computed(() => [
  { label: t('tabs.home'), icon: 'home-o' },
  { label: t('tabs.category'), icon: 'apps-o' },
  { label: t('tabs.cart'), icon: 'shopping-cart-o' },
  { label: t('tabs.profile'), icon: 'user-o' },
])

onMounted(() => {
  mockApi().then((res) => {
    console.log(res)
  })
})
</script>

<style scoped>
.page-container {
  padding: 20px;
  min-height: calc(100vh - 85px);
}
</style>
