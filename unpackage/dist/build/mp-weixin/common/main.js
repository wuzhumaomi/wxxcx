(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"2fa2":function(e,t,n){"use strict";n.r(t);var o=n("b858"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},6503:function(e,t,n){"use strict";n.r(t);var o=n("2fa2");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("b56d");var r,i,c,u,l=n("f0c5"),f=Object(l["a"])(o["default"],r,i,!1,null,null,null,!1,c,u);t["default"]=f.exports},8040:function(e,t,n){"use strict";(function(e,t){n("74fb");var o=u(n("66fd")),a=u(n("6503")),r=u(n("8367")),i=u(n("38ca")),c=u(n("d1f7"));function u(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o.default.config.productionTip=!1,o.default.use(r.default),a.default.mpType="app",o.default.prototype.$store=i.default;var s={appid:"wxcbaa212bcb33c859",secret:"d61ff9c352b709101e99736955e994d6",templateId:"J20w0hd67i16M3GIXSxZ-aWLS_9iCIDaI_2K543LhMU"};o.default.prototype.$appInfo=s,o.default.prototype.$db=c.default;var p=new o.default(f(f({},a.default),{},{store:i.default,db:c.default}));e(p).$mount();wx.login({success:function(e){console.log("code  -- ",e.code),e.code&&wx.request({url:"https://api.weixin.qq.com/sns/jscode2session",method:"get",data:{js_code:e.code,appid:s.appid,grant_type:"authorization_code",secret:s.secret},success:function(e){e.data&&e.data.openid&&(console.log("openId  -- ",e.data.openid),wx.setStorageSync("openId",e.data.openid))}})},fail:function(){},complete:function(){}});var v=t.getUpdateManager();v.onCheckForUpdate((function(e){console.log("是否有新版小程序",e.hasUpdate)})),v.onUpdateReady((function(e){t.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){e.confirm&&v.applyUpdate()}})})),v.onUpdateFailed((function(e){}))}).call(this,n("543d")["createApp"],n("543d")["default"])},"8ff3":function(e,t,n){},b56d:function(e,t,n){"use strict";var o=n("8ff3"),a=n.n(o);a.a},b858:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("d1f7"));function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=i(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,u=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){u=!0,r=e},f:function(){try{c||null==n.return||n.return()}finally{if(u)throw r}}}}function i(e,t){if(e){if("string"===typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var u={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},methods:{history:function(e){var t=this;o.default.request.todayOnhistory(e).then((function(n){if(console.log("历史上的今天",null===n||void 0===n?void 0:n.data),null===n||void 0===n?void 0:n.data){var o,a=r(n.data);try{for(a.s();!(o=a.n()).done;){var i=o.value;console.log(i.date,i.title)}}catch(c){a.e(c)}finally{a.f()}}else setTimeout((function(){t.history(e)}),1e3)})).catch((function(e){console.log(e)}))},dream:function(e){var t=this;o.default.request.dreamQuery(e).then((function(n){if(console.log("周公解梦 --- ",null===n||void 0===n?void 0:n.data),null===n||void 0===n?void 0:n.data){var o,a=r(n.data);try{for(a.s();!(o=a.n()).done;){var i=o.value;console.log(i.title,i.des)}}catch(c){a.e(c)}finally{a.f()}}else setTimeout((function(){t.dream(e)}),1e3)})).catch((function(e){console.log(e)}))},laohuangli:function(e){var t=this;o.default.request.laohuangliD(e).then((function(n){if(console.log("老黄历",null===n||void 0===n?void 0:n.data),null===n||void 0===n?void 0:n.data){var o,a=r(n.data);try{for(a.s();!(o=a.n()).done;){var i=o.value;console.log("老黄历 --- ",i)}}catch(c){a.e(c)}finally{a.f()}}else setTimeout((function(){t.dream(e)}),1e3)})).catch((function(e){console.log(e)}))},jokeRandJoke:function(e){var t=this;o.default.request.jokeRandJoke(e).then((function(n){if(console.log("笑话",null===n||void 0===n?void 0:n.data),null===n||void 0===n?void 0:n.data){var o,a=r(n.data);try{for(a.s();!(o=a.n()).done;){var i=o.value;console.log("笑话本地 --- ",i.title)}}catch(c){a.e(c)}finally{a.f()}}else setTimeout((function(){t.dream(e)}),1e3)})).catch((function(e){console.log(e)}))}}};t.default=u}},[["8040","common/runtime","common/vendor"]]]);