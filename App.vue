<script>
	import api from '@/api/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// this.$db.user.getApi({
			// 	name:'sunsun'
			// }).then(function(res){
			// 	console.log(res.data);
			// })
			
			// 历史上的今天
			// this.history('1/3')
			// 周公解梦
			// this.dream('大便')
			// 老黄历
			// this.laohuangli(new Date())
			// 笑话
			// this.jokeRandJoke()

		},
		onShow: function() {
			console.log('App Show')
			// const db = wx.cloud.database()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			history(date){
				let _t = this
				api.request.todayOnhistory(date)
				.then(res => {
					console.log('历史上的今天', res?.data);
					if(res?.data){
						for (let time of res.data) {
							console.log( time.date,time.title);
						}
					}else{
						setTimeout(function() {
							_t.history(date)
						}, 1000);
					}
				}).catch(e => {
					console.log(e);
				})
			},
			
			dream(data){
				let _t = this
				api.request.dreamQuery(data)
				.then(res => {
					
					console.log('周公解梦 --- ', res?.data);
					if(res?.data){
						for (let time of res.data) {
							console.log(time.title,time.des);
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
			
			laohuangli(data){
				let _t = this
				api.request.laohuangliD(data)
				.then(res => {
					console.log('老黄历', res?.data);
					if(res?.data){
						for (let time of res.data) {
							console.log('老黄历 --- ',time);
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
			
			jokeRandJoke(data){
				let _t = this
				api.request.jokeRandJoke(data)
				.then(res => {
					console.log('笑话', res?.data);
					if(res?.data ){
						for (let time of res.data) {
							console.log('笑话本地 --- ',time.title);
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
