<template>
	<view class="advertisingView comp-input">
	
		<view class="uni-padding-wrap">
		 <swiper class="swiper" vertical="false" circular="true"  :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				 <swiper-item>
						 <view class="swiper-item uni-bg-red">
							 <image src="../../../static/home-page/magnifier.png" class="iocn-img2" mode=""></image>
							 西方寓言的始祖/伊索寓言
						 </view>
				 </swiper-item>
				 <swiper-item>
						 <view class="swiper-item uni-bg-green">
							 <image src="../../../static/home-page/magnifier.png" class="iocn-img2" mode=""></image>
							 中国道家学说的开山之作/老子
						 </view>
				 </swiper-item>
				 <swiper-item>
						 <view class="swiper-item uni-bg-blue">
							 <image src="../../../static/home-page/magnifier.png" class="iocn-img2" mode=""></image>
							 中国先秦时期的百科全书/诗经
						 </view>
				 </swiper-item>
		 </swiper>
		 
			<image src="../../../static/home-page/message.png" class="icon-img" mode=""></image>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				background: ['color1', 'color2', 'color3'],
				indicatorDots: false,
				autoplay: true,
				interval: 4000,
				duration: 600
			}
		},
		methods:{
        upper: function(e) {
            console.log(e)
        },
        lower: function(e) {
            console.log(e)
        },
        scroll: function(e) {
            console.log(e)
            this.old.scrollTop = e.detail.scrollTop
        },
        goTop: function(e) {
            this.scrollTop = this.old.scrollTop
            this.$nextTick(function() {
                this.scrollTop = 0
            });
            uni.showToast({
                icon:"none",
                title:"纵向滚动 scrollTop 值已被修改为 0"
            })
        }
		}
	}
</script>

<style lang="scss">
	$width100-20: calc(100vw - 40rpx);
	.comp-input{
		// background-color: #007AFF;
		.uni-padding-wrap{
			width: $width100-20;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
		// 输入框
		.swiper,.uni-padding-wrap{
			height: 60rpx;
			border-radius: 80rpx;
			.iocn-img2{
				width: 30rpx;
				height: 30rpx;
				margin-right: 20rpx;
			}
			font-size: 28rpx;
		}
		// 框
		.swiper{
			width: 85%;
			background-color: #FFFFFF;
			color: #8a8a8a;
		}
		// 图标
		.icon-img{
			width: 40rpx;
			height: 40rpx;
		}
		.swiper-item{
			position: absolute;
			width: 100%;
			height: 100%;
			
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}
</style>
