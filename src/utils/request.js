// 封装到一个请求模块中
import axios from 'axios'
import store from '@/store'

// 创建自定义的axios实例
const http = axios.create({
  // 基础地址
  baseURL: 'http://toutiao-app.itheima.net'
})

// 所有的请求, 在真正被发送出去之前, 都会先经过请求拦截器
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  const token = store.getters.token
  // 一定是token存在, 才携带
  if (token) {
    // 在发送请求之前做些什么
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http
