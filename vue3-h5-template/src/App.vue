<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive :max="10">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import { useVh } from '@/utils/useVh'

useVh()
</script>

<style scoped></style>
