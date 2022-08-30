import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/goods',
        name: '全部商品',
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/goods/details',
        name: 'details',
        component: () => import('../views/DetailsView.vue')
      },
      {
        path: '/myorder',
        name: '订单',
        component: () => import('../views/MyorderView.vue')
      },
      {
        path: '/collection',
        name: 'collection',
        component: () => import('../views/CollectionView.vue')
      },
      {
        path: '/shoppingCart',
        name: '购物车',
        component: () => import('../views/ShoppingCartView.vue')
      },
      {
        path: '/confirmOrder',
        name: 'confirmOrder',
        component: () => import('../views/ConfirmOrderView.vue')
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   // 判断是否要访问登陆页面，如果是那么则放行
//   if (to.path === '/') return next()
//   // 获取本次存储中的token
//   let token = window.sessionStorage.getItem('token')
//   // 如果没有token值那么强制定位到登录页
//   if (!token) return next('/')
//   // 其他情况正常跳转
//   next()
// })

export default router
