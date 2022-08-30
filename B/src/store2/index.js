import Vue from "vue";
import Vuex from 'vuex';
import tabList from './modules/tabLists'
import routeList from './modules/routeList'
import getters from './getters'
import persistedState from 'vue-persistedState'
Vue.use(Vuex)

export default new Vue.Store({
    plugins:[persistedState({storage:window.sessionStorage})],
    modules:{
        tabLists,
        routeList
    },
    getters
})