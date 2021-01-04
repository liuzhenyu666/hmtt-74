// 引入基础请求地址
import http from '@/utils/request'

// 根据搜索关键字获取搜索建议
// @param {*} keyword 关键字

export const reqGetSuggestion = keyword => {
  return http({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}
