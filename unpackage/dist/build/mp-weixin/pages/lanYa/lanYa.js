(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/lanYa/lanYa"],{"02fa":function(e,n,c){"use strict";var t=c("1d25"),o=c.n(t);o.a},"1d25":function(e,n,c){},4766:function(e,n,c){"use strict";c.r(n);var t=c("84b0"),o=c.n(t);for(var i in t)"default"!==i&&function(e){c.d(n,e,(function(){return t[e]}))}(i);n["default"]=o.a},"5c40":function(e,n,c){"use strict";(function(e){c("74fb");t(c("66fd"));var n=t(c("a52b"));function t(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,c("543d")["createPage"])},"60cc":function(e,n,c){"use strict";c.d(n,"b",(function(){return o})),c.d(n,"c",(function(){return i})),c.d(n,"a",(function(){return t}));var t={uNoNetwork:function(){return Promise.all([c.e("common/vendor"),c.e("node-modules/uview-ui/components/u-no-network/u-no-network")]).then(c.bind(null,"3ea8"))},uniCard:function(){return c.e("node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card").then(c.bind(null,"8fa7"))},uButton:function(){return c.e("node-modules/uview-ui/components/u-button/u-button").then(c.bind(null,"cd91"))},uInput:function(){return Promise.all([c.e("common/vendor"),c.e("node-modules/uview-ui/components/u-input/u-input")]).then(c.bind(null,"874c"))},uRow:function(){return c.e("node-modules/uview-ui/components/u-row/u-row").then(c.bind(null,"afd0"))},uCol:function(){return c.e("node-modules/uview-ui/components/u-col/u-col").then(c.bind(null,"f2e3"))}},o=function(){var e=this,n=e.$createElement;e._self._c},i=[]},"84b0":function(e,n,c){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var c={data:function(){return{fa:"",shou:"",serviceId:"",connectionid:"",characteristicid:"",sheb:"",deviceIdlsit:[]}},mounted:function(){var n=this;e.onBluetoothAdapterStateChange((function(e){console.log("监听蓝牙适配器状态变化事件",e)})),e.onBluetoothDeviceFound((function(e){var c=(e.devices[0].RSSI+100)/10;if(c>0&&-1==n.deviceIdlsit.indexOf(e.devices[0].deviceId)){var t=n.deviceIdlsit.some((function(n){return[e.devices[0]].includes(n)}));t||(console.log("监听寻找到新设备的事件",e),n.deviceIdlsit.push(e.devices[0]))}})),this.onBLEConnectionStateChange(),this.onBLECharacteristicValueChange()},methods:{ab2hex:function(e){var n=Array.prototype.map.call(new Uint8Array(e),(function(e){return("00"+e.toString(16)).slice(-2)}));return n.join("")},onBLECharacteristicValueChange:function(){e.onBLECharacteristicValueChange((function(e){console.log("监听低功耗蓝牙设备的特征值变化事件",e),console.log("监听低功耗蓝牙设备的特征值变化事件 ".concat(e.characteristicId," has changed, now is ").concat(e.value))}))},onBLEConnectionStateChange:function(){e.onBLEConnectionStateChange((function(e){console.log("该方法回调中可以用于处理连接意外断开等异常情况 device ".concat(e.deviceId," state has changed, connected: ").concat(e.connected)),e.connected}))},dklj:function(){e.closeBLEConnection({deviceId:this.connectionid,success:function(e){console.log("关闭当前连接",e)}})},sd:function(){e.closeBluetoothAdapter({success:function(e){console.log(e)}})},writesss:function(){var n=new ArrayBuffer(1),c=new DataView(n);c.setUint8(0,0),e.writeBLECharacteristicValue({deviceId:this.connectionid,serviceId:this.serviceId,characteristicId:this.characteristicid,value:n,success:function(e){console.log("writeBLECharacteristicValue success",e.errMsg)}})},getBLEDeviceCharacteristics:function(n,c){var t=this;e.getBLEDeviceCharacteristics({deviceId:n,serviceId:c,success:function(o){console.log("传入服务id:",c),console.log("获取蓝牙设备某个服务中所有特征值:",o),console.log("获取蓝牙设备某个服务中所有特征值:",o.characteristics);for(var i=0;i<o.characteristics.length;i++)o.characteristics[i].properties.read&&console.log("可读"),o.characteristics[i].properties.write&&(t.connectionid=n,t.serviceId=c,t.characteristicid=o.characteristics[i].uuid),(o.characteristics[i].properties.notify||o.characteristics[i].properties.indicate)&&e.notifyBLECharacteristicValueChange({state:!0,deviceId:n,serviceId:c,characteristicId:o.characteristics[i].uuid,success:function(e){console.log("启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。",e),console.log("启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。",e.errMsg)}})},fail:function(e){console.log("获取特征失败")}})},getBLEDeviceServices:function(n){var c=this;e.getBLEDeviceServices({deviceId:n,success:function(e){console.log("获取蓝牙设备所有服务 device services:",e),c.serviceId=e;for(var t=0;t<e.services.length;t++)e.services[t].isPrimary&&(console.log("服务id",e.services[t].uuid),c.getBLEDeviceCharacteristics(n,e.services[t].uuid))}})},createBLEConnection:function(n){var c=this,t=n.deviceId;this.deviceIdlsit=[n],this.connectionid=t,e.createBLEConnection({deviceId:t,success:function(n){console.log(t,c.connectionid),console.log("创建蓝牙连接",n),e.stopBluetoothDevicesDiscovery({success:function(e){console.log("创建蓝牙连接关闭蓝牙搜素",e)}}),setTimeout((function(){c.getBLEDeviceServices(t)}),1e3)},fail:function(e){console.log(e)}})},startBluetoothDeviceDiscovery:function(){e.startBluetoothDevicesDiscovery({success:function(e){console.log(e)},fail:function(e){console.log(e)}})},dddd:function(){},stopBluetoothDevicesDiscovery:function(){e.stopBluetoothDevicesDiscovery({success:function(e){console.log("关闭蓝牙搜素",e)}})},openBluetoothAdapter:function(){var n=this;this.deviceIdlsit.length=0,e.openBluetoothAdapter({success:function(e){setTimeout((function(){n.startBluetoothDeviceDiscovery()}),1e3)},fail:function(e){10001==e.code&&console.log("请检查蓝牙是否开启，是否支持蓝牙模式")}})}}};n.default=c}).call(this,c("543d")["default"])},a52b:function(e,n,c){"use strict";c.r(n);var t=c("60cc"),o=c("4766");for(var i in o)"default"!==i&&function(e){c.d(n,e,(function(){return o[e]}))}(i);c("02fa");var s,u=c("f0c5"),r=Object(u["a"])(o["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],s);n["default"]=r.exports}},[["5c40","common/runtime","common/vendor"]]]);