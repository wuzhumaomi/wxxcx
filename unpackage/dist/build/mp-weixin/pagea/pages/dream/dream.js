require('../../common/runtime.js');require('../../common/vendor.js');require('../../common/main.js');(global["webpackJsonp_pagea"]=global["webpackJsonp_pagea"]||[]).push([["pages/dream/dream"],{"4ffe":function(n,t,e){"use strict";e.r(t);var r=e("bec4"),u=e("c283");for(var o in u)"default"!==o&&function(n){e.d(t,n,(function(){return u[n]}))}(o);e("ad50");var i,a=e("f0c5"),l=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=l.exports},9269:function(n,t,e){},ad50:function(n,t,e){"use strict";var r=e("9269"),u=e.n(r);u.a},bec4:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return r}));var r={uField:function(){return e.e("node-modules/uview-ui/components/u-field/u-field").then(e.bind(null,"acaf"))},uButton:function(){return e.e("node-modules/uview-ui/components/u-button/u-button").then(e.bind(null,"cd91"))},uDivider:function(){return e.e("node-modules/uview-ui/components/u-divider/u-divider").then(e.bind(null,"83bd"))},uLine:function(){return e.e("node-modules/uview-ui/components/u-line/u-line").then(e.bind(null,"2fd5"))}},u=function(){var n=this,t=n.$createElement;n._self._c},o=[]},c283:function(n,t,e){"use strict";e.r(t);var r=e("f916"),u=e.n(r);for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);t["default"]=u.a},d3f3:function(n,t,e){"use strict";(function(n){e("74fb");r(e("66fd"));var t=r(e("4ffe"));function r(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},f916:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(e("d1f7"));function u(n){return n&&n.__esModule?n:{default:n}}function o(n,t){var e;if("undefined"===typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(e=i(n))||t&&n&&"number"===typeof n.length){e&&(n=e);var r=0,u=function(){};return{s:u,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:u}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){e=n[Symbol.iterator]()},n:function(){var n=e.next();return a=n.done,n},e:function(n){l=!0,o=n},f:function(){try{a||null==e.return||e.return()}finally{if(l)throw o}}}}function i(n,t){if(n){if("string"===typeof n)return a(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(n,t):void 0}}function a(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}var l={data:function(){return{value:"",type:"text",border:!0,list:[],customStyle:{border:"2rpx #d3ad76 dashed",backgroundColor:"#e6caa3",color:"#666666",height:"60rpx"}}},methods:{onclick:function(){this.dream(this.value)},onBtnDream:function(n){this.dream(n)},dream:function(n){var t=this,e=this;r.default.request.dreamQuery(n).then((function(r){var u,i;(null===(u=r.data)||void 0===u?void 0:u.result)?t.list=null===(i=r.data)||void 0===i?void 0:i.result:t.list=[{title:"没有相关数据，请换一个描述词语"}];if(console.log("周公解梦 --- ",null===r||void 0===r?void 0:r.data.result),null===r||void 0===r?void 0:r.data){var a,l=o(r.data.result);try{for(l.s();!(a=l.n()).done;){var d=a.value;console.log(d.title,d.des)}}catch(c){l.e(c)}finally{l.f()}}else setTimeout((function(){e.dream(n)}),1e3)})).catch((function(n){console.log(n)}))}},created:function(){}};t.default=l}},[["d3f3","common/runtime","common/vendor"]]]);