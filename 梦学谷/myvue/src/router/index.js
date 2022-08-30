import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import Welcome from '../components/welcome'
import Member from '../components/member'
import Supplier from '../components/supplier'
import Goods from '../components/goods'
import Staff from '../components/staff'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: 'home',
    component: Home,
    children: [
      {
        path: '/welcome',
        component: Welcome,
        meta: { title: '首页' }
      },
      {
        path: '/member',
        component: Member,
        meta: { title: '会员管理' }
      },
      {
        path: '/supplier',
        component: Supplier,
        meta: { title: '供应商管理' }
      },
      {
        path: '/goods',
        component: Goods,
        meta: { title: '商品管理' }
      },
      {
        path: '/staff',
        component: Staff,
        meta: { title: '员工管理' }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// // 全局前置导航守卫
// router.beforeEach((to, from, next) => {
//   // 默认放行（放行的是登录页）
//   next()
//   // 获取有没有token
//   const token = window.sessionStorage.getItem('token')
//   // 做判断：如果有token证明是登录状态，否则未登录
//   if (!token) return next('/')  //如果没有token那么强行跳转到登录页
// })

export default router
