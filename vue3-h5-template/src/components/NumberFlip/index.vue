<template>
  <div :class="className">
    {{ formatLargeNumber(displayValue) }}
  </div>
</template>

<script setup lang="ts">
import {debounce} from '@/utils/tools'
interface Props {
  value: number | string
  duration?: number
  className?: string
  separator?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1000,
  className: '',
  separator: '',
})

const displayValue = ref(0)
let animationId: number
let startTime: number
let startValue: number


const animate = (timestamp: number) => {
  if (!startTime) {
    startTime = timestamp
    startValue = displayValue.value
  }

  const elapsed = timestamp - startTime
  const progress = Math.min(elapsed / props.duration, 1)

  // 使用缓动函数使动画更平滑
  const easeOutQuart = 1 - Math.pow(1 - progress, 4)

  const targetValue =
    typeof props.value === 'string' ? parseFloat(props.value.replace(/[^\d.]/g, '')) : props.value

  displayValue.value = Math.round(startValue + (targetValue - startValue) * easeOutQuart)

  if (progress < 1) {
    animationId = requestAnimationFrame(animate)
  }
}

const startAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  startTime = 0
  animationId = requestAnimationFrame(animate)
}

// 添加防抖，避免频繁动画
const debouncedStartAnimation = debounce(startAnimation, 100)

watch(
  () => props.value,
  () => {
    debouncedStartAnimation()
  },
  { immediate: true },
)

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

const formatLargeNumber = (num: number) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B'
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>
