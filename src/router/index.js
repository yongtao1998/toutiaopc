import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import SeccondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        // 二级路由的path 什么都不写 代表二级路由默认组件
        path: '',
        component: SeccondHome
      },
      {
        path: '/home/comment',
        component: () => import('@/views/comment')
      }, {
        path: '/home/material',
        component: () => import('@/views/material')
      }, {
        path: '/home/articles',
        component: () => import('@/views/articles')
      }, {
        path: '/home/publish/:articleId?',
        component: () => import('@/views/publish')
      }, {
        path: '/home/account',
        component: () => import('@/views/account')
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
