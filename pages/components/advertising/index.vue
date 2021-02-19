<template>
	<view class="advertisingView boxshow">
		<!-- 广告 -->
		<uni-list class="advertisingView boxshow">
			<uni-list :border="true">
				<!-- 右侧带角标 -->
				<uni-list-chat 
					title="uni-app" 
					avatar="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" 
					note="您收到一条新的消息" 
					time=" " 
					badge-text="12">
				</uni-list-chat>
			</uni-list>
		</uni-list>
	</view>
</template>

<script>
	
</script>

<style>
	// 广告
	.advertisingView{
		/* width: calc(100% - 40rpx) ; */
		margin-top: 30rpx;
	}
</style>
