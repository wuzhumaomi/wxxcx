require('../../common/runtime.js');require('../../common/vendor.js');require('../../common/main.js');(global["webpackJsonp_pagea"]=global["webpackJsonp_pagea"]||[]).push([["pages/logo-page/logo-page"],{"4edc":function(n,e,t){"use strict";var o;t.d(e,"b",(function(){return u})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return o}));var u=function(){var n=this,e=n.$createElement;n._self._c},r=[]},"8b7f":function(n,e,t){"use strict";t.r(e);var o=t("4edc"),u=t("dd0f");for(var r in u)"default"!==r&&function(n){t.d(e,n,(function(){return u[n]}))}(r);t("e46d");var a,f=t("f0c5"),s=Object(f["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=s.exports},b66f:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{userInfo:{}}},created:function(){},mounted:function(){var n=this;this.getUserInfo(),wx.getUserInfo({lang:"zh_CN",success:function(e){n.$store.commit("setUserInfo",e.userInfo),n.$store.state.userInfo}})},methods:{wxGetUserInfo:function(n){this.userInfo=n.detail.userInfo,this.getUserInfo()},getUserInfo:function(){var e=this;n.getUserInfo({provider:"weixin",lang:"zh_CN",success:function(n){n.userInfo?(e.userInfo=n.userInfo,e.$store.commit("setHasLogin",!0)):console.log("用户尚未登录")}})},switchTab:function(){n.switchTab({url:"/pages/main-page/main-page"})}}};e.default=t}).call(this,t("543d")["default"])},baa8:function(n,e,t){"use strict";(function(n){t("74fb");o(t("66fd"));var e=o(t("8b7f"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},c77b:function(n,e,t){},dd0f:function(n,e,t){"use strict";t.r(e);var o=t("b66f"),u=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=u.a},e46d:function(n,e,t){"use strict";var o=t("c77b"),u=t.n(o);u.a}},[["baa8","common/runtime","common/vendor"]]]);