<template>
  <div>
    <div class="p-2 bg-amber c-fuchsia">{{ $t('home.title') }}</div>
    <PickerLang></PickerLang>
  </div>
</template>

<script setup lang="ts">
import { mockApi } from '@/api/mock/mockApi'

onMounted(() => {
  mockApi().then((res) => {
    console.log(res)
  })
})
</script>
