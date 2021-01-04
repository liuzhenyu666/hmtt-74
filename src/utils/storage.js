// 封装本地存储的操作模块
const tokenKey = 'hm-tt-mobile-74-token'
const hisToryKey = 'hm-tt-mobile-74-history'

// 设置tokenObj, 将tokenObj存到本地
export function setToken (tokenObj) {
  localStorage.setItem(tokenKey, JSON.stringify(tokenObj))
}

// 获取tokenObj
export function getToken () {
  return JSON.parse(localStorage.getItem(tokenKey)) || {}
}

// 移除tokenObj
export function removeToken () {
  localStorage.removeItem(tokenKey)
}

// 获取历史记录
export function getHistory () {
  return JSON.parse(localStorage.getItem(hisToryKey)) || []
}

// 修改历史记录
export function setHistory (newValue) {
  localStorage.setItem(hisToryKey, JSON.stringify(newValue))
}
