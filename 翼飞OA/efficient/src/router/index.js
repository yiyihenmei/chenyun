import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import ChangePassword from '../components/changePassword.vue'

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
		meta: { title: '公共组件' },
		component: () => import('../components/home.vue'),
	},

]

const router = new VueRouter({
	routes
})

export default router
