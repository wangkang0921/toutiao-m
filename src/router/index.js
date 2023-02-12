import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import User from '@/views/user'
import Answer from '@/views/answer'
import Video from '@/views/video'
import Search from '@/views/search'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 一级路由
    { path: '/login', component: Login },
    { path: '/search', component: Search },
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
