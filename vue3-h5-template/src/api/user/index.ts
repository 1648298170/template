import request from '@/utils/request'

// 登录接口
export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  userInfo: {
    id: number
    username: string
    nickname: string
    avatar?: string
  }
}

export const login = (data: LoginParams) => {
  console.log('🚀 ~ login ~ data:', data)
  return new Promise<LoginResult>((resolve) => {
    resolve({
      token: '1234567890',
      userInfo: {
        id: 1,
        username: 'admin',
        nickname: '管理员',
      },
    })
  })
}

// 获取用户信息接口
export const getUserInfo = () => {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}
