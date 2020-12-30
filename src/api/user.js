// 用户模块: 用户登录, 获取用户信息, 编辑用户信息 ...
import http from '@/utils/request.js'
// 要找仓库中的数据, 先找仓库
// import store from '@/store'

// 封装登录
export function reqLogin (mobile, code) {
  return http({
    method: 'post',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户个人信息
// 1. 一个请求, 需要配置一次token, 每次请求, 只要需要携带token, 都需要配 => 请求拦截器
// 2. token一旦刷新了, 就丢失, vuex的问题(刷新时会重置状态) => 需要往本地localStorage同步
export function reqGetProfile () {
  return http({
    method: 'get',
    url: '/v1_0/user/profile'
  })
}
