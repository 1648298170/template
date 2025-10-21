<template>
  <div>
    <div class="p-2 bg-amber c-fuchsia">{{ $t('home.title') }}</div>
    <PickerLang></PickerLang>
  </div>
</template>

<script setup lang="ts">
import { mockApi } from '@/api/mock/mockApi'
console.log('当前环境变量：', process.env.NODE_ENV)
onMounted(() => {
  mockApi().then((res) => {
    console.log(res)
  })
})
</script>
