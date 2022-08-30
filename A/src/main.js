import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(ElementUI)



require('../mock/index')
// Vue.prototype.$moment=moment

import moment from 'moment'
Vue.filter('dateFormat',function(date){
  return moment(date*1000).format('YYYY-MM-DD HH:mm:ss')
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
