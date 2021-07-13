<template>
	<view class='u-form'>
		<u-no-network></u-no-network>
		
		<uni-card class="top20" >
			<u-button :ripple="true" @click="openBluetoothAdapter">开启蓝牙并检索设备</u-button>
			<u-button :ripple="true" @click="stopBluetoothDevicesDiscovery">关闭检索蓝牙设备</u-button>
		</uni-card>

		<u-button :ripple="true" @click="dklj">断开当前连接</u-button>
		<u-button :ripple="true" @click="sd">关闭蓝牙模块断开所有已建立的连接</u-button>
		<view>
			<u-input v-model="fa" border="border" />
			<u-button :ripple="true" @click="writesss">发送数据</u-button>
		</view>
		<view>接收数据{{shou}}</view>
		<view>{{serviceId}}</view>
		<view v-for=" itemid in deviceIdlsit" style="background-color: #C0C0C0;margin: 10rpx;padding: 10rpx;">
			<u-row gutter="16">
				<u-col span="8">
					设备ID{{itemid.deviceId}}<br />
					设备名<span style="color: red;">{{itemid.name?itemid.name:itemid.localName}}</span></u-col><br />
					ManufacturerData || {{itemid.advertisData}}<br />
					advertisServiceUUIDs || {{itemid.advertisServiceUUIDs}}<br />
					localName || {{itemid.localName}}<br />
					serviceData || {{itemid.serviceData}}<br />
				<u-col span="4">
					<u-button :ripple="true" @click="createBLEConnection(itemid)">连接</u-button>
				</u-col>
			</u-row>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				fa: '',
				shou: '',
				serviceId: '', //蓝牙服务 uuid
				connectionid: '', //设备的 id
				characteristicid: '', //特征
				sheb: "",
				deviceIdlsit: []
			};
		},
		mounted() {
			// 监听蓝牙适配器状态变化事件
			uni.onBluetoothAdapterStateChange(function(res) {
				console.log('监听蓝牙适配器状态变化事件', res)
			})
			
			// 监听寻找到新设备的事件
			uni.onBluetoothDeviceFound(devices => {
				var rssi = (devices.devices[0].RSSI + 100) / 10
				if (rssi > 0 && this.deviceIdlsit.indexOf(devices.devices[0].deviceId) == -1) {
					
					const hasPermission = this.deviceIdlsit.some(role => {
					 	return [devices.devices[0]].includes(role)
					})
					
					if (!hasPermission) {
						console.log('监听寻找到新设备的事件',devices)
						this.deviceIdlsit.push(devices.devices[0])
					}
				}
			})
			
			this.onBLEConnectionStateChange()
			this.onBLECharacteristicValueChange()
		},
		methods: {
			// ArrayBuffer转16进度字符串示例
				ab2hex(buffer) {
				  var hexArr = Array.prototype.map.call(
				    new Uint8Array(buffer),
				    function (bit) {
				      return ('00' + bit.toString(16)).slice(-2)
				    }
				  )
				  return hexArr.join('');
				},
			onBLECharacteristicValueChange() {
				let _t = this
				// 监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。
				uni.onBLECharacteristicValueChange(function(res) {
					console.log('监听低功耗蓝牙设备的特征值变化事件',res);
					// console.log('监听低功耗蓝牙设备的特征值变化事件',_t.ab2hex(res.value));
					console.log(`监听低功耗蓝牙设备的特征值变化事件 ${res.characteristicId} has changed, now is ${res.value}`)
				})
			},

			onBLEConnectionStateChange() {
				// 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
				uni.onBLEConnectionStateChange(res => {
					// 该方法回调中可以用于处理连接意外断开等异常情况
					console.log(`该方法回调中可以用于处理连接意外断开等异常情况 device ${res.deviceId} state has changed, connected: ${res.connected}`)
					if (res.connected == false) {
						// this.dklj();                                                                                                            
						// this.createBLEConnection()
					}
				})
			},
			dklj() {
				// 断开与低功耗蓝牙设备的连接。
				uni.closeBLEConnection({
					deviceId: this.connectionid,
					success(res) {
						console.log("关闭当前连接", res)
					}
				})
			},
			sd() {
				// 关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 uni.openBluetoothAdapter 成对调用。
				uni.closeBluetoothAdapter({
					success(res) {
						console.log(res)
					}
				})
			},
			writesss() {
				// 向蓝牙设备发送一个0x00的16进制数据
				const buffer = new ArrayBuffer(1)
				const dataView = new DataView(buffer)
				dataView.setUint8(0, 0)
				uni.writeBLECharacteristicValue({
					// 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
					deviceId: this.connectionid,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: this.serviceId,
					// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					characteristicId: this.characteristicid,
					// 这里的value是ArrayBuffer类型
					value: buffer,
					success(res) {
						console.log('writeBLECharacteristicValue success', res.errMsg)
					}
				})
			},
			// 两字母：AB,AC,AD；BC,BD,CD
			// 三字母：ABC,ABD,ACD；BCD

			getBLEDeviceCharacteristics(did, sid) {
				// 获取蓝牙设备某个服务中所有特征值(characteristic)。
				uni.getBLEDeviceCharacteristics({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: did,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: sid,
					success: res => {
						console.log('传入服务id:', sid)
						console.log('获取蓝牙设备某个服务中所有特征值:', res)
						console.log('获取蓝牙设备某个服务中所有特征值:', res.characteristics)

						for (let i = 0; i < res.characteristics.length; i++) {
							if (res.characteristics[i].properties.read) {
								console.log('可读')
							}
							if (res.characteristics[i].properties.write) {
								this.connectionid = did
								this.serviceId = sid
								this.characteristicid = res.characteristics[i].uuid
							}
							if (res.characteristics[i].properties.notify || res.characteristics[i].properties.indicate) {
								// 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。
								// 注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用。 
								// 另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件
								uni.notifyBLECharacteristicValueChange({
									state: true, // 启用 notify 功能
									// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
									deviceId: did,
									// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
									serviceId: sid,
									// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
									characteristicId: res.characteristics[i].uuid,
									success(res) {
										console.log('启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。', res)
										console.log('启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。', res.errMsg)
									}
								})
							}
						}
					},
					fail: err => {
						console.log('获取特征失败')
					}
				})
			},

			getBLEDeviceServices(id) {
				// 获取蓝牙设备所有服务(service)。
				uni.getBLEDeviceServices({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: id,
					success: (res) => {
						// console.log("成功",res)
						console.log('获取蓝牙设备所有服务 device services:', res)
						//这里会获取到好多个services  uuid  我们只存储我们需要用到的就行，这个uuid一般硬件厂家会给我们提供
						this.serviceId = res
						for (let i = 0; i < res.services.length; i++) {
							if (res.services[i].isPrimary) {
								console.log('服务id',res.services[i].uuid);
								
								this.getBLEDeviceCharacteristics(id, res.services[i].uuid)
							}
						}
						// res.services.forEach((item) => {
						// 	if (item.uuid.indexOf("AE00") != -1) {
						// 		this.serviceId = item.uuid;
						// 		//进入特征
						// 		// this.getBLEDeviceCharacteristics()
						// 	}
						// })
					}
				})

			},
			createBLEConnection(item) {
				let id = item.deviceId
				
				this.deviceIdlsit = [item]
				
				this.connectionid = id
				// 连接低功耗蓝牙设备。
				// 若APP在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作。
				uni.createBLEConnection({
					deviceId: id,
					success: res => {
						console.log(id, this.connectionid)
						console.log("创建蓝牙连接", res)
						// 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
						uni.stopBluetoothDevicesDiscovery({
							success(resds) {
								console.log("创建蓝牙连接关闭蓝牙搜素", resds)
							}
						})
						setTimeout(() => {
							this.getBLEDeviceServices(id)
						}, 1000)

					},
					fail: err => {
						console.log(err)
					}
				})
			},


			startBluetoothDeviceDiscovery() {
				uni.startBluetoothDevicesDiscovery({
					// services: ['FEE7'],
					// allowDuplicatesKey:true,
					success: resd => {
						console.log(resd)
					},
					fail: errd => {
						console.log(errd)
					}
				})
			},
			
			dddd() {

			},
			// 10000	not init	未初始化蓝牙适配器
			// 10001	not available	当前蓝牙适配器不可用
			// 10002	no device	没有找到指定设备
			// 10003	connection fail	连接失败
			// 10004	no service	没有找到指定服务
			// 10005	no characteristic	没有找到指定特征值
			// 10006	no connection	当前连接已断开
			// 10007	property not support	当前特征值不支持此操作
			// 10008	system error	其余所有系统上报的异常
			// 10009	system not support	Android 系统特有，系统版本低于 4.3 不支持 BLE
			stopBluetoothDevicesDiscovery() {
				uni.stopBluetoothDevicesDiscovery({
					success(resds) {
						console.log("关闭蓝牙搜素", resds)
					}
				})
			},
			openBluetoothAdapter() {
				// 初始化蓝牙模块
				this.deviceIdlsit.length = 0
				uni.openBluetoothAdapter({
					success: res => {
						setTimeout(() => {
							this.startBluetoothDeviceDiscovery()
						}, 1000)
					},
					fail: err => {
						if (err.code == 10001) {
							console.log('请检查蓝牙是否开启，是否支持蓝牙模式')
						}

					}
				})
			}
		}
	};
</script>

<style>
	.top20{
		margin: 20px;
	}
</style>
