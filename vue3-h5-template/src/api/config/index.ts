import prodConfig from './prod'
import devConfig from './dev'
/**
 * 根据当前环境变量返回相应的配置对象
 * @returns {Object} 返回开发环境或生产环境的配置对象
 */
const config = () => {
  // 判断当前是否为开发环境
  if (process.env.NODE_ENV === 'development') {
    // 如果是开发环境，返回开发环境配置
    return devConfig
  }

  // 否则返回生产环境配置
  return prodConfig
}

export default config()
