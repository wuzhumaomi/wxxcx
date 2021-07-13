<template>
	<view class="joke">
		<view v-for="(item,i) in jokeList" class="list">
			<view class="btnText">
				{{(i+1)+'.  '+item.content}}
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	export default {
		data() {
			return {
				jokeList:[]
			}
		},
		onReachBottom(){
			this.jokeRandJoke()
		},
		onLoad() {
			
			
			this.jokeRandJoke()
		},
		methods: {
			jokeRandJoke(){
				let _t = this
				api.request.jokeRandJoke()
				.then(res => {
					console.log('笑话 ---- ', res);
					if(res){
						this.jokeList.push(...res) 
						for (let time of res) {
							console.log('笑话本地 --- ',time.content);
						}
					}else{
						setTimeout(function() {
							_t.dream(data)
						}, 1000);
					}
				}).catch(e => {
					console.log(e);
				})
			},
		}
	}
</script>

<style lang="scss">
.joke{
	padding: 20rpx;
	min-height: 100vh;
	background-color: #eadac0;
	.list{
		margin-top: 10rpx;
		padding: 20rpx;
		border: 1rpx solid #d3ad76;
		box-shadow: 0 0 8rpx #d3ad76;
		border-radius: 6rpx;
		background-color: #e6caa3;
	}
}
</style>
