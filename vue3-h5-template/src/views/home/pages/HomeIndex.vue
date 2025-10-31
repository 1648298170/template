<template>
  <div class="home-page">
    <h2>首页</h2>
    <p>这是首页内容</p>
    <!-- 物流信息展示 -->
    <div
      class="logistics-container border-l-1 border-l-solid border-l-blue-500 border-rd-10px mt-30px"
    >
      <h3 class="text-left mb-15px text-18px font-bold">物流信息</h3>

      <!-- 物流信息列表 -->
      <transition-group name="slide-fade" tag="div">
        <div
          v-for="(log, index) in logisticsData"
          :key="index"
          class="logistics-item p-15px mb-10px"
          v-show="index === 0 || showAllLogs"
        >
          <div class="logistics-time text-blue-600 font-bold">{{ log.time }}</div>
          <div class="logistics-content mt-2">
            <p>{{ log.title }}</p>
            <p v-for="(detail, detailIndex) in log.details" :key="detailIndex">{{ detail }}</p>
          </div>
        </div>
      </transition-group>

      <!-- 展开/收起按钮 -->
      <div class="text-left mt-10px">
        <div
          class="expand-btn flex items-center cursor-pointer text-blue-500 text-sm"
          @click="toggleLogs"
        >
          <span>{{ showAllLogs ? '收起更多物流明细' : '展开更多物流明细' }}</span>
          <i
            :class="['van-icon', 'ml-1', showAllLogs ? 'van-icon-arrow-up' : 'van-icon-arrow-down']"
          ></i>
        </div>
      </div>
    </div>
    <div class="p-10"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 物流信息数据
const logisticsData = ref([
  {
    time: '2023-05-20 14:30',
    title: '您的订单已发货',
    details: ['快递公司：顺丰速运', '快递单号：SF1234567890'],
  },
  {
    time: '2023-05-19 09:15',
    title: '您的订单已完成打包',
    details: ['仓库地址：深圳市南山区仓库'],
  },
  {
    time: '2023-05-18 16:45',
    title: '您的订单已支付成功',
    details: ['支付方式：微信支付', '支付金额：¥99.00'],
  },
])

// 控制是否显示所有物流信息
const showAllLogs = ref(false)

// 切换物流信息显示状态
const toggleLogs = () => {
  showAllLogs.value = !showAllLogs.value
}
</script>

<style scoped>
.home-page {
  /* padding: 20px; */
  text-align: center;
}

.logistics-container {
  padding: 0 16px;
}

.logistics-item {
  background-color: #f8f9fa;
}

/* 展开收起过渡动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* 展开按钮样式 */
.expand-btn {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
}

.expand-btn:hover {
  background-color: #f2f3f5;
}
</style>
