import { createStore } from 'vuex'
import persistedState from "vuex-persistedstate";

export default createStore({
  state: {
    dialogVisible: false,
    dialogVisible1: false,
    num: 0,
    orderlist: []
  },
  getters: {
  },
  mutations: {
    vuxadd(state, arr) {
      state.orderlist=arr
    },
    vuxdel(state){
      state.orderlist=[]
    },
    vuxnum(state, list) {
      var s = 0;
      list.forEach(ele => {
        s += ele.num
      });
      state.num = s
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedState()]
})
