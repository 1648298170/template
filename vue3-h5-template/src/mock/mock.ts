import { MockMethod } from 'vite-plugin-mock'

const mockApiList = [
  {
    url: '/api/mock/get',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          name: 'vben',
        },
      }
    },
  },
] as MockMethod[]

export default mockApiList
