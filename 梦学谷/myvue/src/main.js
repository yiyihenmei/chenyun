import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
Vue.prototype.$axios=axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

axios.defaults.baseURL = 'https://www.fastmock.site/mock/161ba971b7547743480f0cdfc17b27e8/four-api';


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
