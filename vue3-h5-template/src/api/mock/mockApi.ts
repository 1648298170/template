import request from '@/utils/request'
export const mockApi = () => {
  return request({
    url: '/api/mock/get',
    method: 'get',
  })
}
