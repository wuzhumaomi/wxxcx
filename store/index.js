import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hasLogin: false, // 登录状态
        userInfo: {}, // 用户信息
    },
    mutations: {
        setHasLogin(state, value){
            state.hasLogin = value
            console.log(state.hasLogin)
        },
				setUserInfo(state, value){
            state.userInfo = value
            console.log(state.userInfo)
        },
    },
    actions: {},
    getters: {}
})