<template>
    <view class="mep">
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map  id="map1" ref="map1" style="width: 100%; height: 300px;" :markers="markers" :latitude="latitude" :longitude="longitude"  show-compass='true' :enable-satellite='ifEnableSatellite' :enable-traffic='ifEnableTraffic' :enable-3D='ifEnable3D'>
                </map>
            </view>
        </view>
				<u-button class="btn" type="primary" @click="ifEnableSatellite = !ifEnableSatellite">卫星图</u-button>
				<u-button class="btn" type="primary" @click="ifEnableTraffic = !ifEnableTraffic">实时路况</u-button>
				<u-button class="btn" type="primary" @click="ifEnable3D = !ifEnable3D">3D</u-button>
				<u-button class="btn" type="primary" @click="toMapAPP">跳转到地图软件</u-button>
    </view>
</template>

<script>
	export default {
    data() {
			return {
				ifEnableSatellite:false,
				ifEnableTraffic:false,
				ifEnable3D:false,
				longitude:117.26061,
				latitude:31.8512,
				markers:[{
					id:0,
					longitude:117.26061,
					latitude:31.8512,
				}],
			}
    },
		onShow() {
		},
		mounted() {
			this.getDZ()
		},
    methods: {
//打开第三方地图
			toMapAPP(latitude,longitude,name){
				let mapContext = uni.createMapContext('map1',this)
				mapContext.getCenterLocation({
          success: function(res) {
            console.log(res)
						debugger
						// 打开app的
						uni.openLocation({
							latitude: res.latitude,
							longitude: res.longitude,
							name: "公司名称",
							address: "详细地址"
						});
          }
        })
				
			
			},
			// 获得地址
			getDZ(){
				var that =this
				uni.getLocation({
						type: 'wgs84',
						success: function (res) {
								console.log('当前位置的经度：' + res.longitude);
								console.log('当前位置的纬度：' + res.latitude);
								that.latitude=res.latitude
								that.longitude=res.longitude
								//标记的
								that.markers=[{
									id:0,
									latitude: res.latitude,//纬度
									longitude: res.longitude,//经度
									callout:{//自定义标记点上方的气泡窗口 点击有效
										 content:'当前位置',//文本
										 color:'#ffffff',//文字颜色
										 fontSize:10,//文本大小
										 borderRadius:2,//边框圆角
										 bgColor:'#00c16f',//背景颜色
										 display:'ALWAYS',//常显
									},
							}]
						}
				})
			}
    }
	}
</script>

<style lang="scss">
.mep{
	.btn{
		margin: 20rpx;
	}
}
</style>
