import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'table'
  },
  {
    path: '/aside',
    component: () => import('../components/aside.vue'),
    children:[
      {
        path: '/books',
        component: () => import('../views/books.vue'),
      },
      {
        path: '/backstage',
        component: () => import('../views/backstage.vue'),
      },
      {
        path: '/international',
        component: () => import('../views/international.vue'),
      },
      {
        path: '/table',
        component: () => import('../views/table.vue'),
      },
      {
        path: '/tab',
        component: () => import('../views/tab.vue'),
      },
      {
        path: '/header',
        component: () => import('../components/header.vue'),
      },
      {
        path: '/nav',
        component: () => import('../views/nav.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
