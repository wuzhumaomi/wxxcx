import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import uView from "uview-ui";
Vue.use(uView);

App.mpType = 'app'

// store 使用vuex
import store from './store'  
Vue.prototype.$store = store

import db from './api'
Vue.prototype.$db = db

const app = new Vue({
    ...App,
		store,
		db
})
app.$mount()
