import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import uView from "uview-ui";
Vue.use(uView);

App.mpType = 'app'

// store 使用vuex
import store from './store'  
Vue.prototype.$store = store
let appInfo = {
	appid:'wxcbaa212bcb33c859',
	secret:'d61ff9c352b709101e99736955e994d6'
}
Vue.prototype.$appInfo = appInfo

import db from './api'
Vue.prototype.$db = db

const app = new Vue({
    ...App,
		store,
		db
})
app.$mount()

let _t = this
wx.login({
		success: (res) => {
				// 通过code换取openid
				console.log("code  -- ", res.code)
				if (res.code) {
						wx.request({
								url: "https://api.weixin.qq.com/sns/jscode2session",
								method: "get",
								data: {
										js_code: res.code,
										appid:appInfo.appid,
										grant_type:'authorization_code',
										secret:appInfo.secret,
								},
								success: (res) => {
										if (res.data && res.data.openid) {
												// 获取的openid存入storage，方便之后使用
												console.log("openId  -- ", res.data.openid)
												wx.setStorageSync("openId", res.data.openid);
										}
								},
						});
				}
		},
		fail: () => {},
		complete: () => {},
});



const updateManager = uni.getUpdateManager();

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log('是否有新版小程序',res.hasUpdate);
});

updateManager.onUpdateReady(function (res) {
  uni.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    }
  });
});

updateManager.onUpdateFailed(function (res) {
  // 新的版本下载失败
});
