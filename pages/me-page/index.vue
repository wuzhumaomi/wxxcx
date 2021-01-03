<template>
	<view class="container mePage">
		<view class="bodyView">
		</view>
		<view class="topView">
		</view>
			
		<view class="userBox">
			<image src="../../static/logo.png" mode="" class="userImg"></image>
			<view class="userInfo">
				<view class="userName">
					若_
				</view>
				
				<view class="userText">
					来自弗雷尔卓德的一位前端召唤师
				</view>
			</view>
		</view>
		<!-- 功能块 -->
		<view class="topView-bot boxshow">
			<view class="numbView">
				<text class="topText">{{number01}}</text>
				<text class="botText">我发布的</text>
			</view>
			
			<view class="numbView">
				<text class="topText">{{number02}}</text>
				<text class="botText">我卖出的</text>
			</view>
			
			<view class="numbView">
				<text class="topText">{{number01}}</text>
				<text class="botText">我买到的</text>
			</view>
			
			<view class="numbView">
				<text class="topText">{{number01}}</text>
				<text class="botText">我想要的</text>
			</view>
		</view>
		
		<!-- 功能 -->
		<view class="listView boxshow">
			<uni-grid class="functionView boxshow"  :show-border="false"  name='uni-grid' :column="4">
				<uni-grid-item>
					<view class="itemBody">
						<image src="../../static/user-page/hongbao.png" class="icon-img"></image>
						我的红包
					</view>
				</uni-grid-item>
				
				<uni-grid-item>
					<view class="itemBody">
						<image src="../../static/user-page/lipin.png" class="icon-img"></image>
						活动中心
					</view>
				</uni-grid-item>
				
				<uni-grid-item>
					<view class="itemBody">
						<image src="../../static/user-page/kefu.png" class="icon-img"></image>
						客服中心
					</view>
				</uni-grid-item>
				
				<uni-grid-item>
					<view class="itemBody">
						<image src="../../static/user-page/xinyongka.png" class="icon-img"></image>
						借钱
					</view>
				</uni-grid-item>
				
				<uni-grid-item>
					<view class="itemBody">
						<image src="../../static/user-page/gouwu.png" class="icon-img"></image>
						旧机还钱
					</view>
				</uni-grid-item>
				
				<uni-grid-item>
					<view class="itemBody">
						<image src="../../static/user-page/tongzhi.png" class="icon-img"></image>
						我的信息
					</view>
				</uni-grid-item>
			</uni-grid>
		</view
		
		<!-- 广告 -->
		<!-- <view class="advertisingView boxshow">
			<uni-list class="advertisingView boxshow">
				<uni-list :border="true">
					<uni-list-chat 
						title="uni-app" 
						avatar="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" 
						note="您收到一条新的消息" 
						time=" " 
						badge-text="12">
					</uni-list-chat>
				   
				</uni-list>
			</uni-list>
		</view> -->
		<Advertsing></Advertsing>
		
		<!-- 列表 -->
		<view class="listView boxshow">
			<uni-list class="listView boxshow">
				<uni-list-item title="使用许可使用协议" link="reLaunch"  @click="onClick($event,1)" ></uni-list-item>
				<uni-list-item title="隐私条款" link="reLaunch"  @click="onClick($event,1)" ></uni-list-item>
				<uni-list-item title="平台规则" link="reLaunch"  @click="onClick($event,1)" ></uni-list-item>
			</uni-list>
		</view>
		
	</view>
</template>

<script>
	import Advertsing from '@/pages/components/advertising/index.vue'
	export default {
		components:{
			Advertsing
		},
		data() {
			return {
				number01:6,
				number02:8,
			}
		},
		methods: {
			onClick(res){
				console.log(res)
			}
		}
	}
</script>

<style  lang="scss">
	.mePage{
		// 头像背景块
		.topView{
			width: 100vw;
			height: 20vh;
			background-color: #ffaa7f;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
		
		// 用户信息
		.userBox{
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 15rpx;
			.userImg{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.userName{
				font-size: 38rpx;
				font-weight: 600;
				color: #333333;
				margin-bottom: 18rpx;
			}
			.userText{
				font-size: 24rpx;
				font-weight: 600;
				color: #666666;
			}
		}
		
		
		// info
		.topView-bot{
			margin-top: 30rpx;
			width: calc(100% - 40rpx) ;
			height: 10vh;
			background-color: #fff;
			// position: absolute;
			// bottom: 0;
			// left: 50%;
			// transform: translate(-50%,50%);
			
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			.numbView{
				display: flex;
				flex-direction: column;
				align-items: center;
				.topText{
					font-size: 38rpx;
					font-weight: 600;
					color: #333333;
				}
				.botText{
					font-size: 22rpx;
					color: #666666;
				}
			}
		}
		
		// 功能模块
		.functionView{
			margin-top: 30rpx;
			width: calc(100% - 40rpx) ;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			overflow: hidden;
			.uni-grid-item{
				// background-color: #aaff7f;
				position: relative;
				font-size: 22rpx;
				height: 150rpx!important;
				color: #444444;
			}
			// 图标
			.icon-img{
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 5rpx;
			}
			.itemBody{
				// width: 30% ;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				
				
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				// border: 1rpx #0000FF solid;
			}
		}
		
		// 广告
		.advertisingView{
			width: calc(100% - 40rpx) ;
			margin-top: 30rpx;
		}
		
		// 列表模块
		.listView{
			width: calc(100% - 40rpx) ;
			
			margin-top: 30rpx;
			border-radius: 5rpx;
			box-shadow: 0rpx 0rpx 3rpx rgba(0, 0, 0, 0.16);
		}
	
	}
</style>
