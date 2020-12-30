import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/request.js'

// 导入这个包, 会监视屏幕的resize事件, 并将 html 的 font-size设置成, 当前屏幕宽度 / 10
import 'amfe-flexible'
import './styles/index.scss'
import './utils/vant-ui.js'
import { getRelativeTime } from '@/utils/date-time.js'
Vue.config.productionTip = false
Vue.prototype.$http = http // 将来页面中 => this.$http

Vue.filter('relative', (value) => {
  return getRelativeTime(value)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 技术选型: 移动端组件库 (Vant(有赞团队), vux(个人), mint(饿了么), cube-ui(滴滴))
