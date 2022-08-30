// 引入axios
import axios from 'axios'
// import { application } from 'express'
// import { config } from 'vue/types/umd'
import { getToken, removetoken } from './suth'
import router from 'vue-router'
import { MessageBox } from 'element-ui'


// 创建axios实例
const http = axios.create({
	baseURL: '/',
	// 和后端商量一下超时时间
	timeout: 3000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
})

// 请求拦截器

http.interceptors.request.use(
	// 成功的回调函数
	(config) => {
		// config.headers.token
		// config['headers].token
		config.headers['token'] = getToken()
		return config
	},
	// 失败的回调
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
http.interceptors.response.use(
	// 成功的回调
	(response) => {
		// if (response.data && response.data.status === 2) {
		// 	// 401,token失效
		// 	// token过期处理接口文档没有明确标识
		// 	removeToken()
		// 	router.push({
		// 		name: 'login'
		// 	})
		// }
		return response
	},
	// 失败的回调处理
	(error)=>{
		let title=''
		let message=''

		if(error&&error.response){
			message=error.response.data.message
			// 401,token失效
			// if(error,response.data.status===2){
			// 	router.push({
			// 		name:'login'
			// 	})
			// }
			switch()
		}
	}
)
