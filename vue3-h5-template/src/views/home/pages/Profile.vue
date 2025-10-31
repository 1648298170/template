<template>
  <div class="profile-page">
    <h2>{{ $t('profile.title') }}</h2>
    <p>{{ $t('profile.content') }}</p>

    <!-- 语言切换组件 -->
    <div class="language-section">
      <h3>{{ $t('profile.languageSetting') }}</h3>
      <PickerLang />
    </div>
  </div>
</template>

<script setup lang="ts">
import PickerLang from '@/components/PickerLang/index.vue'
</script>

<style scoped>
.profile-page {
  /* padding: 20px; */
  text-align: center;
}

.language-section {
  /* margin-top: 30px;
  padding: 20px; */
  border-top: 1px solid #eee;
}
</style>
