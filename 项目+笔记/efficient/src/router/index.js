import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login.vue'
import ChangePassword from '../components/login/changePassword.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Login
	},
	{
		path:'/changePassword',
		component:ChangePassword
	},
	{
		path: '/home',
		component: () => import('../components/home/home.vue'),
	},
	{
		path: '/aside',
		component: () => import('../components/home/aside.vue'),
	},

]

const router = new VueRouter({
	routes
})

export default router
