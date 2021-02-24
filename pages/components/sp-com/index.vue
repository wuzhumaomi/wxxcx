<template>
	<!-- calss='pbl-view-item' -->
	<view >
		<view class="pbl-top">
			<!-- <u-image class="Uimg" :src="item.src" :fade="true" duration="450"></u-image> -->
			<image :src="item.src"></image>
		</view>
		
		<view class="pbl-text">
			{{item.name }}
			<view class="pbl-text-bot">
				<view class="text01">
					{{Math.ceil(Math.random() * 1000) }}人气
				</view>
				<view class="text02">
					推荐人数 
				</view>
				<view class="text03">
					{{Math.ceil(Math.random() * 99) }}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:['item'],
		data(){
			return{
				
			}
		},
		created() {
			
		},
		mounted() {
			// console.log(this.item);
		},
		methods:{
      
		}
	}
</script>

<style lang="scss">
	.pbl-view-item:nth-child(3){
		height: 500rpx!important;
	}
	.pbl-view-item:first-child{
		margin-top: 0rpx;
	}
	.pbl-view-item{
		position: relative;
		width: 40%;
		height: 600rpx;
		background-color: #ffffff;
		box-shadow: 0 0 6px #C8C8C8;
		border-radius: 20rpx;
		margin-top: 20rpx;
		overflow: auto;	
	}
	
	.pbl-top{
		width: 100%;
		// background-color: #4CD964;
		position: absolute;
		height: 70%;
		.Uimg{
			position: absolute;
			width: 100%;
			height: 100%;
		}
		image{
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}
	.pbl-text{
		bottom: 0;
		width: 100%;
		// background-color: #A1DCC1;
		// border-top: 2px solid #333333;
		position: absolute;
		height: 30%;
		font-size: 26rpx;
		padding: 20rpx;
		color: #333333;
		// font-weight: 600;
		// 标价哪一行
		.pbl-text-bot{
			position: absolute;
			display: flex;
		
			flex-direction: row;
			align-items: baseline;
			width: 100%;
			bottom: 20rpx;
			.text01,.text02,.text03{
				margin-right: 10rpx;
			}
			.text01{
				color: $u-type-error;
				font-size: 40rpx;
			}
			.text02{
				color: $u-type-error;
				font-size: 20rpx;
			}
			.text03{
				color: $u-type-info;
				font-size: 18rpx;
			}
		}
	}
</style>
