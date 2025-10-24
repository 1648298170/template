<template>
  <div class="login-container">
    <div class="language-switcher">
      <van-icon name="setting-o" @click="showLanguagePicker = true" />
    </div>

    <!-- 语言选择器弹窗 -->
    <van-popup v-model:show="showLanguagePicker" round position="bottom">
      <van-picker
        :columns="languageColumns"
        :model-value="pickerValue"
        @confirm="onLanguageConfirm"
        @cancel="showLanguagePicker = false"
      />
    </van-popup>

    <div class="login-header">
      <h1 class="login-title">{{ $t('login.title') }}</h1>
    </div>

    <div class="login-form">
      <van-field
        v-model="loginForm.username"
        :label="$t('login.username')"
        :placeholder="$t('login.usernamePlaceholder')"
        :error-message="errors.username"
        @blur="validateUsername"
      />

      <van-field
        v-model="loginForm.password"
        type="password"
        :label="$t('login.password')"
        :placeholder="$t('login.passwordPlaceholder')"
        :error-message="errors.password"
        @blur="validatePassword"
      />

      <div class="login-actions">
        <van-button type="primary" block :loading="loading" @click="handleLogin">
          {{ $t('login.loginButton') }}
        </van-button>
      </div>

      <div class="login-links">
        <span class="forgot-password">{{ $t('login.forgotPassword') }}</span>
        <span class="register-link">{{ $t('login.register') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login, LoginParams } from '@/api/user'
import { useAppStore } from '@/store/modules/app'
import vantLocale from '@/utils/vantLocale'

// 国际化
const { t, locale } = useI18n()

// 应用状态管理
const appStore = useAppStore()

//路由
const router = useRouter()

// 语言选择器相关状态
const showLanguagePicker = ref(false)
const pickerValue = ref<string[]>([])

// 语言选项
const languageColumns = [
  { text: '中文', value: 'zh-CN' },
  { text: 'English', value: 'en' },
  { text: 'Português', value: 'pt' },
]

// 初始化语言选择器值
onMounted(() => {
  const currentLocale = localStorage.getItem('language') || 'zh-CN'
  pickerValue.value = [currentLocale]
})

// 语言切换确认处理
const onLanguageConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
  if (selectedValues.length > 0) {
    const newLocale = selectedValues[0]
    locale.value = newLocale
    pickerValue.value = [newLocale]
    vantLocale(newLocale as 'zh-CN' | 'en' | 'pt')
    localStorage.setItem('language', newLocale)
    showLanguagePicker.value = false
  }
}

// 登录表单数据
const loginForm = reactive<LoginParams>({
  username: '',
  password: '',
})

// 表单验证错误信息
const errors = reactive({
  username: '',
  password: '',
})

// 加载状态
const loading = ref(false)

// 验证用户名
const validateUsername = () => {
  if (!loginForm.username.trim()) {
    errors.username = t('login.usernameRequired')
    return false
  } else {
    errors.username = ''
    return true
  }
}

// 验证密码
const validatePassword = () => {
  if (!loginForm.password) {
    errors.password = t('login.passwordRequired')
    return false
  } else {
    errors.password = ''
    return true
  }
}

// 处理登录
const handleLogin = async () => {
  // 验证表单
  const isUsernameValid = validateUsername()
  const isPasswordValid = validatePassword()

  if (!isUsernameValid || !isPasswordValid) {
    return
  }

  try {
    loading.value = true
    // 调用登录接口
    const result = await login({
      username: loginForm.username,
      password: loginForm.password,
    })

    // 保存用户信息到store
    appStore.setUserInfo(result.userInfo)

    // 保存token到localStorage
    localStorage.setItem('token', result.token)

    router.replace('/')

    // 显示成功提示
    showToast(t('login.loginSuccess'))

    // 跳转到首页（这里可以根据实际路由配置调整）
    // router.push('/')
  } catch (error: unknown) {
    // 显示错误提示
    console.error('Login error:', error)
    showToast(t('login.loginFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 60px;
}

.login-title {
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin: 0;
}

.login-form {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.login-actions {
  margin: 20px 0;
}

.login-links {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.forgot-password {
  color: #667eea;
  cursor: pointer;
}

.register-link {
  color: #764ba2;
  cursor: pointer;
}
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 24px;
  z-index: 10;
}
</style>
