import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import User from '@/views/user'
import Answer from '@/views/answer'
import Video from '@/views/video'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        // 二级路由
        { path: '/home', component: Home },
        { path: '/user', component: User },
        { path: '/answer', component: Answer },
        { path: '/video', component: Video }
      ]
    }
  ]
})

export default router
