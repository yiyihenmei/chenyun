import axios from "axios";

const Http = axios.create({
    baseURL: "/api",
    timeout: 10000
})

Http.interceptors.request.use(config => {
    // let token = localStorage.getItem('token');
    // if (token) {
    //     config.headers.Authorization = token
    // }
    return config
}, error => {
    Promise.reject(error)
})

Http.interceptors.response.use(res => {
    let { data } = res
    // if (data.meta.msg == '无效xtoken') {
    //     console.log('token值已过期，请重新登录！');
    //     // location.href('/')
    // } else if (data.meta.status == 400 || data.meta.status == 401 || data.meta.status == 403 || data.meta.status == 404 || data.meta.status == 500) {
    //     console.log(data.meta.msg);
    // }
    return data
}, error => {
    // let { message } = error
    // if (message == 'Error') {
    //     message = '后端接口连接Network异常'
    // } else if (message.includes('timeout')) {
    //     message = '系统接口请求超时'
    // }
    // console.log('错误信息', message);
    Promise.reject(error)
})

export default Http