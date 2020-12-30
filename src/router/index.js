import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: () => import('@/views/login') },
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        { path: '/', component: () => import('@/views/home') },
        { path: '/question', component: () => import('@/views/question') },
        { path: '/video', component: () => import('@/views/video') },
        { path: '/user', component: () => import('@/views/user') }
      ]
    }
  ]
})

export default router
