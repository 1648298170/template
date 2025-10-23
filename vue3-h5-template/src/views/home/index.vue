<template>
  <div>
    <div class="p-2 bg-amber c-fuchsia">{{ $t('home.title') }}</div>
    <PickerLang></PickerLang>
    <div>{{ appStore.$state.appState }}</div>
    <div class="p-1 bg-blueGray b-b-coolGray w-10 border-rd-2 flex justify-center items-center" @click="appStore.increment">++</div>
  </div>
</template>

<script setup lang="ts">
import { mockApi } from '@/api/mock/mockApi'
import {useAppStore} from '@/store/modules/app'

const appStore = useAppStore()
console.log('appStore', appStore)
onMounted(() => {
  mockApi().then((res) => {
    console.log(res)
  })
})
</script>
