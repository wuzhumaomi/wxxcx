<template>
	<view class=" mePage">
		<view class="bodyView">
		</view>
		<view class="topView">
			<view>

			</view>
		</view>
		
		<view class="">
			{{nian2}}岁
		</view>
		<view class="">
			星座：{{getConstellation}}
		</view>
		<view class="">
			属相：{{getSign}}
		</view>
		<view class="">
			生日： <text @click="show2 = true">{{date}}</text>
			<u-calendar v-model="show2" :mode="mode" @change="change2"></u-calendar>
		</view>
		<view class="">
			告白日期： <text @click="show = true">{{date2}}</text>
			<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		</view>
		
		<view class="">
			在一起时间：
		</view>
		<view>
			{{tian}}天
		</view>
		<view>
			{{shi}}小时
		</view>
		<view>
			{{fen}}分钟
		</view>
		<view>
			{{miao}}秒
		</view>
		
		<view class="">
			距离生日：
		</view>
		<view>
			{{tian2}}天
		</view>
		<view>
			{{shi2}}小时
		</view>
		<view>
			{{fen2}}分钟
		</view>
		<view>
			{{miao2}}秒
		</view>
		

	</view>

</template>
<script>
	import zhuanHuan from '@/pages/components/Time.js'
	import Advertsing from '@/pages/components/advertising/index.vue'
	import canvasPage from '@/pages/canvas_page/canvas_page.vue'
	export default {
		components: {
			Advertsing,
			// canvasPage
		},
		data() {
			return {
				show2: false,
				show: false,
				mode: 'date',
				// 年纪
				nian2:0,
				// 生日
				date: '1999/4/27',
				// 紀念日
				date2: '2020/01/29 22:36:00',
				
				miao: 0,
				fen: 0,
				shi: 0,
				tian: 0,
				
				miao2: 0,
				fen2: 0,
				shi2: 0,
				tian2: 0,

				fileHref: '',
				number01: 6,
				number02: 8,
				globalData: {},
				//data数据
				buttonArr: [{
					src: '/static/images/extend/icon_edit_3x.png',
					width: '48rpx',
					height: '48rpx',
					background: '#fff'
				}, {
					src: '/static/images/extend/icon_delete_3x.png',
					width: '48rpx',
					height: '48rpx',
					background: '#fff'
				}]
			}
		},
		computed:{
			getSign(){
				let t = zhuanHuan.toLunar(this.date)
				return t[3]+'-'+t[4]
			},
			// 星座
			getConstellation(){ 
				let m = new Date(this.date).getMonth() + 1
				let d = new Date(this.date).getDate()
				console.log(' 星座 ',m,d)
				var s="魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
				var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
				return s.substr(m*2-(d<arr[m-1]?2:0),2);
			}
		},
		created() {
			let _t = this
			setInterval(function () {
				_t.getTime()
				_t.getTime2()
			},1000)
		},
		methods: {
			change(e) {
				this.date2 = e.result
				console.log(e);
			},
			change2(e) {
				this.date = e.result
				console.log(e);
			},
			updateFile() {

			},
			getTime(){
				let time = new Date() - new Date(this.date2)
				this.miao = parseInt(time / 1000)
				this.fen = parseInt(time / 1000 / 60)
				this.shi = parseInt(time / 1000 / 60 / 60)
				this.tian = parseInt(time / 1000 / 60 / 60 / 24)
			},
			getTime2(){
				let _t = this
				let time = new Date()
				let nian = 0;
				let yue = 4
				let tian = 27
				// 现在的时间
				let xianNian = new Date().getFullYear()
				// 出生时间
				let shengNian = new Date(this.date).getFullYear()
				
				if(new Date().getMonth() + 1 < yue || (new Date().getDate() < tian && new Date().getMonth() + 1 == yue)){
					nian = new Date().getFullYear()
					// 年龄
					_t.nian2 = xianNian - shengNian - 1
				}else{
					nian = new Date().getFullYear() + 1
					// 年龄
					_t.nian2 = xianNian - shengNian
				}
				// let time = new Date() - new Date(this.date2)
				// console.log(nian+'/'+yue+'/'+tian)
				let time2 = new Date(nian+'/'+yue+'/'+tian) - new Date()
				 
				this.miao2 = parseInt(time2 / 1000)
				this.fen2 = parseInt(time2 / 1000 / 60)
				this.shi2 = parseInt(time2 / 1000 / 60 / 60)
				this.tian2 = parseInt(time2 / 1000 / 60 / 60 / 24 )
			},
			downloadfile(fileID) {

			},
			onClick(res) {
				let _t = this
				// this.$refs.canvasPage.shareClick()
				if (res == 2) {
					// fxhy
					wx.chooseMessageFile({
						count: 10,
						success(res) {
							// tempFilePath可以作为img标签的src属性显示图片
							const tempFilePaths = res.tempFiles

							console.log(res)
							_t.sendFormData(tempFilePaths[0])
						}
					})
					// const query = uni.createSelectorQuery().in(this);
					// query.select('#laowang').click()
				} else {
					wx.navigateTo({
						url: '/pages/canvas_page/canvas_page'
					})
				}
				// console.log(res.innerHTML)
			},
			sendFormData(file) {
				if (file) {
					wx.showToast({
						title: '请选择要上传的文件',
					})
					return;
				}
				let $this = this;
				wx.uploadFile({
					url: serverAddress.url + '/upload', // 请求服务端文件,
					filePath: file.path,
					name: file.name,
					header: {
						"content-type": "multipart/form-data;charset=UTF-8",
					},
					formData: {},
					success: function(res) {
						console.log('上传成功', res)
						let data = JSON.parse(res.data)
						if (data.code == 1) {
							console.log('上传成功')
						}
					},
					fail: function(res) {
						console.log(res, "失败res")
					},
					complete: function(res) {
						console.log(res, "上传成功")
						if (file) {
							wx.showToast({
								title: '上传成功',
							})
						}
					}

				})
			},
		},

		onShareAppMessage(res) { //发送给朋友
			return {
				title: '眼里不止是诗和远方，还有苟且',
				imageUrl: 'cloud://ilovejiujiu.696c-ilovejiujiu-1301925360/img/wu_shanlin.jpg',
			}
		},

		onShareTimeline(res) { //分享到朋友圈
			return {
				title: '眼里不止是诗和远方，还有苟且',
				imageUrl: 'cloud://ilovejiujiu.696c-ilovejiujiu-1301925360/img/wu_shanlin.jpg',
			}
		},
	}
</script>
<style lang="scss">
	// html,body{
	// 	background-color: red;
	// }
	.mePage {
		padding: 20rpx;
		min-height: 100vh;
		background-color: #eadac0;

		// z-index: -1;
		// 头像背景块
		.topView {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 0rpx;


			view {
				width: 100%;
				height: 20vh;
				background-color: #d3ad76;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			}
		}

		// 用户信息
		.userBox {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 15rpx;
			position: relative;
			z-index: 2;

			.userImg {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 10rpx;
				overflow: hidden;
			}

			.userName {
				font-size: 38rpx;
				font-weight: 600;
				color: $u-main-color;
				margin-bottom: 18rpx;
			}

			.userText {
				font-size: 24rpx;
				font-weight: 600;
				color: #FFFFFF;

			}
		}

		// info
		.topView-bot {
			margin-top: 30rpx;
			// width: calc(100% - 40rpx);
			height: 10vh;
			background-color: #fff;
			position: relative;
			z-index: 2;
			// position: absolute;
			// bottom: 0;
			// left: 50%;
			// transform: translate(-50%,50%);
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			.numbView {
				display: flex;
				flex-direction: column;
				align-items: center;

				.topText {
					font-size: 38rpx;
					font-weight: 600;
					color: #333333;
				}

				.botText {
					font-size: 22rpx;
					color: #666666;
				}
			}
		}

		// 功能模块
		.functionView {
			margin-top: 30rpx;
			// width: calc(100% - 40rpx);
			background-color: #FFFFFF;
			border-radius: 15rpx;
			overflow: hidden;

			.uni-grid-item {
				// background-color: #aaff7f;
				position: relative;
				font-size: 22rpx;
				height: 150rpx !important;
				color: #444444;
			}

			// 图标
			.icon-img {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 5rpx;
			}

			.itemBody {
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
		.advertisingView {
			margin-top: 30rpx;
		}

		// 列表模块
		.listView {
			// width: calc(100% - 40rpx);
			margin-top: 30rpx;
			border-radius: 5rpx;
			box-shadow: 0rpx 0rpx 3rpx rgba(0, 0, 0, 0.16);
			background-color: width;
		}

	}
</style>
