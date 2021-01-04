// 封装与频道相关的操作
import http from '@/utils/request'
// 获取用户频道
export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

export const reqGetAllChannels = () => {
  return http({
    method: 'get',
    url: '/v1_0/channels'
  })
}

export function reqSetChannels (channels) {
  return http({
    method: 'put',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}
