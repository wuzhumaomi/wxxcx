<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// \node_modules\@vant\weapp\dist\common
	@import "uview-ui/index.scss";
	// @/node_modules/@vant/weapp/dist/$1/index.wxml"
	/*每个页面公共css */
	$width100-20: calc(100vw - 40rpx);
	// 主体
	.container{
		width: 100vw;
		height: calc(100vh - 24rpx);
		padding: 20rpx;
		// background: #F1F5F8;
		overflow: hidden;
	}
	// 大背景
	.bodyView{
		// width: 100vw;
		// position: absolute;
		// height: 100%;
		// background: #F1F5F8;
		// top: 0;
		// left: 0;
		// z-index: -1;
	}
	// 背景色
	page{
		background: #F1F5F8;
	}
		
	// 阴影
	.boxshow{
		border-radius: 15rpx !important;
		box-shadow: 0 0 10rpx #d4d4d4 !important;
		overflow: hidden;
		background-color: #FFFFFF;
		// border: 1rpx solid #0000FF;
	}
</style>
