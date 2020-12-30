import { setToken, getToken } from '@/utils/storage.js'

// 用户相关的vuex模块
// vuex 是要 和 localStorage 同步的, vuex中的token数据改了, 往本地同步
const state = {
  // 状态中需要存token, token refreshToken
  // 刷新页面时, 优先从本地读取之前缓存的数据, 如果没有读到, 才初始化成 {}
  tokenInfo: getToken()
}
const mutations = {
  setTokenInfo (state, tokenObj) {
    state.tokenInfo = tokenObj
    // 只要vuex中的tokenInfo改了, 就往本地同步
    setToken(tokenObj)
  }
}
const actions = {}
const getters = {}

// 不加namespaced, 表示将mutations, actions, getters 都注册了全局
// 加上namespaced, 表示将mutations, actions, getters 就注册到模块中了
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
