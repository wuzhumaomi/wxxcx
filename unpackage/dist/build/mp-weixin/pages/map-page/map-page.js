(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/map-page/map-page"],{"0c18":function(t,n,e){"use strict";e.r(n);var u=e("609a"),o=e("d1f2");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("5992");var a,l=e("f0c5"),c=Object(l["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);n["default"]=c.exports},"318b":function(t,n,e){"use strict";(function(t){e("74fb");u(e("66fd"));var n=u(e("0c18"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},5992:function(t,n,e){"use strict";var u=e("6327"),o=e.n(u);o.a},"5f2c":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{ifEnableSatellite:!1,ifEnableTraffic:!1,ifEnable3D:!1,longitude:117.26061,latitude:31.8512,markers:[{id:0,longitude:117.26061,latitude:31.8512}]}},onShow:function(){},mounted:function(){this.getDZ()},methods:{toMapAPP:function(n,e,u){var o=t.createMapContext("map1",this);o.getCenterLocation({success:function(n){console.log(n),t.openLocation({latitude:n.latitude,longitude:n.longitude,name:"公司名称",address:"详细地址"})}})},getDZ:function(){var n=this;t.getLocation({type:"wgs84",success:function(t){console.log("当前位置的经度："+t.longitude),console.log("当前位置的纬度："+t.latitude),n.latitude=t.latitude,n.longitude=t.longitude,n.markers=[{id:0,latitude:t.latitude,longitude:t.longitude,callout:{content:"当前位置",color:"#ffffff",fontSize:10,borderRadius:2,bgColor:"#00c16f",display:"ALWAYS"}}]}})}}};n.default=e}).call(this,e("543d")["default"])},"609a":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}));var u={uButton:function(){return e.e("node-modules/uview-ui/components/u-button/u-button").then(e.bind(null,"cd91"))}},o=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.ifEnableSatellite=!t.ifEnableSatellite},t.e1=function(n){t.ifEnableTraffic=!t.ifEnableTraffic},t.e2=function(n){t.ifEnable3D=!t.ifEnable3D})},i=[]},6327:function(t,n,e){},d1f2:function(t,n,e){"use strict";e.r(n);var u=e("5f2c"),o=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=o.a}},[["318b","common/runtime","common/vendor"]]]);