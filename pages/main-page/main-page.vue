<template>
	<view>
		<view class="text_view">
			样式浏览页面
		</view>
		<u-button @click="onNavigateTo('/pages/home-page/index')" class="UBtn" type="primary">圈友推书页面</u-button>
		<u-button @click="onNavigateTo('/pages/shopping-cart-page/index')" class="UBtn" type="primary">收藏栏页面</u-button>
		<view class="text_view">
			功能测试页面
		</view>
		<u-button @click="onNavigateTo('/pages/weather_page/weather_page')" class="UBtn" type="primary">天气</u-button>
		<u-button @click="onNavigateTo('/pages/logo-page/logo-page')" class="UBtn" type="primary">登录页面</u-button>
		<u-button @click="onNavigateTo('/pages/canvas_page/canvas_page')" class="UBtn" type="primary">生成图片</u-button>
		<u-button @click="onNavigateTo('/pages/map-page/map-page')" class="UBtn" type="primary">地图操作</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onNavigateTo(url){
				wx.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
.text_view{
	font-size: 36rpx;
	color: $u-main-color;
	font-weight: 600;
	text-align: center;
	line-height: 80rpx;
}
.UBtn{
	margin: 20rpx;
}
</style>
