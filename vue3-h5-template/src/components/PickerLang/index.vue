<template>
  <div>
    <van-field
      v-model="fieldValue"
      is-link
      readonly
      :label="$t('pickerLang.language')"
      :placeholder="$t('pickerLang.placeholder')"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
      <van-picker
        :model-value="pickerValue"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import vantLocale from '@/utils/vantLocale'
import { useI18n } from 'vue-i18n'

interface PickerConfirmPayload {
  selectedValues: PickerValue[]
  selectedOptions: { text: string; value: PickerValue }[]
}

type PickerValue = 'zh-CN' | 'en' | 'pt'

const columns = [
  { text: 'Português', value: 'pt' },
  { text: 'English', value: 'en' },
  { text: '中文', value: 'zh-CN' },
]

const { locale } = useI18n()

// 显示在输入框中的当前选中语言文本
const fieldValue = ref<string | undefined>('')
// 控制语言选择器弹窗的显示状态
const showPicker = ref(false)
// 语言选择器当前选中的语言值数组
const pickerValue = ref<PickerValue[]>([])

onMounted(() => {
  // 从本地存储获取之前保存的语言设置（修复拼写错误：'language'）
  const language = localStorage.getItem('language') as PickerValue
  // 如果存在保存的语言设置
  if (language) {
    // 设置应用的语言
    locale.value = language
    // 更新选择器的当前选中值
    pickerValue.value = [language]
    // 更新显示的文本为当前选中的语言名称，避免空值访问
    const selectedOption = columns.find((item) => item.value === language)
    if (selectedOption) {
      fieldValue.value = selectedOption.text
    }
  } else {
    // 设置默认语言
    const defaultLanguage: PickerValue = 'zh-CN'
    locale.value = defaultLanguage
    pickerValue.value = [defaultLanguage]
    const defaultOption = columns.find((item) => item.value === defaultLanguage)
    if (defaultOption) {
      fieldValue.value = defaultOption.text
    }
  }
})

// 添加响应式监听语言变化
watch(
  () => locale.value,
  (newLocale) => {
    const selectedOption = columns.find((item) => item.value === newLocale)
    if (selectedOption) {
      fieldValue.value = selectedOption.text
      pickerValue.value = [newLocale as PickerValue]
    }
  }
)

const onConfirm = ({ selectedValues, selectedOptions }: PickerConfirmPayload) => {
  // 关闭语言选择器弹窗
  showPicker.value = false
  
  // 确保 selectedValues 和 selectedOptions 不为空
  if (selectedValues.length > 0 && selectedOptions.length > 0) {
    // 更新选择器的选中值
    pickerValue.value = selectedValues
    // 更新显示的文本为当前选中的语言名称，避免空值访问
    fieldValue.value = selectedOptions[0].text
    // 更新应用的语言设置
    const newLocale = selectedValues[0]
    locale.value = newLocale
    // 更新 Vant 组件库的语言配置
    vantLocale(newLocale)
    // 将选择的语言保存到本地存储（修复拼写错误：'language'）
    localStorage.setItem('language', newLocale)
  }
}
</script>

<style scoped lang="scss"></style>
