import config from '@/api/config'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000,
})

//请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //在发送请求之前做些什么
    return config
  },
  (error) => {
    //对请求错误做些什么
    return Promise.reject(error)
  },
)

//响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    //对响应数据做点什么
    const { code, data } = response.data
    if (code === 200) {
      return data
    }
    return response
  },
  (error) => {
    //对响应错误做点什么
    return Promise.reject(error)
  },
)

export default service
