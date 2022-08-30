import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import user from "../store3/user"//导入子模块的数据

import tab from '../store2/modules/tab'


export default new Vuex.Store({
  
  // 用来存储数据
  state: {
    
  },
  // 同步修改state数据
  getters: {
  },
  // 异步操作mutations，进而修改state数据
  mutations: {
    
  },
  // 计算属性
  actions: {
  },
  //把它挂载到moduls的模块中去，相当于注册子模块数据
  modules: {
    user,
    tab,
  }
})
