<template>
	<view class=" mePage">
		<view class="bodyView">
		</view>
		<view class="topView">
			<view>

			</view>
		</view>

		<view class="sj_card" v-for="obj of timeList">
			<view class="deleteView" @click="deleteObj(obj)">
				关闭
			</view>
			
			<view v-if='obj.type == "Personnel"'>
				
				<view class="mxp" v-for=""> 
					<view class="">
						
					</view>
					<view class="">
						<view class="">
							姓名：{{obj.name}}
						</view>
						<view class="">
							年纪：{{pastTime(obj.time).nianJi}}岁
						</view>
						<view class="">
							星座：{{getConstellation(obj.time)}}
						</view>
						<view class="">
							属相：{{getSign(obj.time).shuXiang}}
						</view>
						<view class="">
							破壳日： {{obj.time}}
						</view>
						<view class="">
							生辰(农历)： <text >{{getSign(obj.time).shengChen}}</text>
						</view>
						<view class="">
							距离生日：{{pastTime(obj.time).tian}}天
						</view>
					</view>
				</view>
				
			</view>
			
			<view v-if='obj.type == "Date"'>
			
				<view class="sj_card_name">
					{{obj.name}}
				</view>
				<view class="">
					日期： <text>{{obj.time}}</text>
				</view>
				
				<view class="timeStatistics">
					<view class=""  v-if="obj.ifShow != 0">
						<view class="">
							到 {{(new Date(obj.time).getMonth() + 1) + '-' + new Date(obj.time).getDate()}} 时间
						</view>
						<view>
							{{pastTime(obj.time).tian}}天
						</view>
						<view>
							{{pastTime(obj.time).shi}}小时
						</view>
						<view>
							{{pastTime(obj.time).fen}}分钟
						</view>
						<view>
							{{pastTime(obj.time).miao}}秒
						</view>
						
					</view>
				
					<view class="" v-if="obj.ifShow != 1">
						<view class="">
							过了多久了
						</view>
						<view>
							{{waitingTime(obj.time).tian}}天
						</view>
						<view>
							{{waitingTime(obj.time).shi}}小时
						</view>
						<view>
							{{waitingTime(obj.time).fen}}分钟
						</view>
						<view>
							{{waitingTime(obj.time).miao}}秒
						</view>
						
					</view>
					
				</view>
				
			</view>
			
		</view>
		
		<view class="formView" >
			<view class="formView_top">
				添加事件 or 添加人物
			</view>
			<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-column">
							<view class="title">称谓/姓名/事件</view>
							<input class="uni-input" name="name" placeholder="称谓/姓名/事件" />
					</view>
					<view class="uni-form-item uni-column">
							<view class="title">时间</view>
							<input class="uni-input" name="time" placeholder="时间" />
					</view>
		
					<view class="uni-form-item uni-column">
							<view class="title">卡片类型</view>
							<radio-group name="type">
									<label>
											<radio value="Personnel" /><text>角色</text>
									</label>
									<label>
											<radio value="Date" /><text>事件</text>
									</label>
							</radio-group>
					</view>
					
					<view class="uni-form-item uni-column">
							<view class="title">显示内容</view>
							<radio-group name="ifShow">
									<label>
											<radio value="0" /><text>多久了</text>
									</label>
									<label>
											<radio value="1" /><text>还要多久到纪念日</text>
									</label>
									<label>
											<radio value="2" /><text>都要</text>
									</label>
							</radio-group>
					</view>
					
					<view class="uni-btn-v">
							<button form-type="submit">Submit</button>
							<button type="default" form-type="reset">Reset</button>
					</view>
			</form>
			
		</view>
		
	</view>

</template>
<script>
	import api from '@/api/index.js'
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
				show: false,
				mode: 'date',
				
				value: [0,2],
				range: [{"value": 0,"text": "篮球"    },{"value": 1,"text": "足球"},{"value": 2,"text": "游泳"}],
				
				// 年纪
				nian2:0,
				// 生日
				date: '1999/4/27',
				// 紀念日
				date2: '2020/01/29 22:36:00',
				
				form: {
					name: '',
					intro: '',
					time: '',
					type: '',
					radio: ''
				},
		
				radioList: [
					{
						name: '人物',
						disabled: false
					},
					{
						name: '事件',
						disabled: false
					}
				],
				checkboxList: [
					{
						name: '过了多久',
						checked: true,
						disabled: false
					},
					{
						name: '还有多久到纪念日',
						checked: true,
						disabled: false
					}
				],
				
				timeList:[
					{
						name:'二傻子',
						time:'1999/4/27',
						type:'Personnel'
					},
					{
						name:'生日',
						time:'1999/4/27',
						type:'Date'
					},
					{
						name:'在一起紀念日',
						time:'2020/01/29 22:36:00',
						type:'Date'
					},
				],
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
		onReady(){
		},
		computed:{
		},
		created() {
			let _t = this
			setInterval(function () {
				_t.timeList = [..._t.timeList]
			},1000)
			this.getList()
			console.log(' --调动-- ')
			// api.uploadExcel.main()
		},
		methods: {
			formSubmit: function(e) {
					console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					var formdata = e.detail.value
					this.add(formdata)
			},
			formReset: function(e) {
					console.log('清空数据')
			},
			change(e){
					console.log('e:',e);
			},
			submit() {
				console.log('验证',this.form);
				
				this.$refs.uForm.validate(valid => {
					console.log('验证',valid);
					if (valid) {
						console.log('验证通过',this.form);
					} else {
						console.log('验证失败');
					}
				});
			},
			// 添加数据
			add(obj){
				let _t = this

				api.anniversaryDay.addApi({
					...obj,
					openId:wx.getStorageSync('openId')
				}).then(res=>{
						uni.showModal({
								content: '添加成功',
								showCancel: false
						});
						_t.getList()
						console.log(' 添加成功 ',res)
				})
			},
			deleteObj(obj){
				let _t = this
	
				api.anniversaryDay.deleteApi({
					...obj,
					openId:wx.getStorageSync('openId')
				}).then(res=>{
						uni.showModal({
								content: '删除成功',
								showCancel: false
						});
						_t.getList()
						console.log(' 删除成功 ',res)
				})
			},
			// 查询数据列表 
			getList(){
				let _t = this
				api.anniversaryDay.getApi({
					openId:wx.getStorageSync('openId')
				}).then(res=>{
						console.log(' 查询数据列表 ',res)
						_t.timeList = res.data
				})
			},
			getSign(date){
				let t = zhuanHuan.toLunar(date)
				return {
					shuXiang:t[3]+'-'+t[4],
					shengChen:t[0]+'/'+t[1]+'/'+t[2],
				}
			},
			// 星座
			getConstellation(date){ 
				let m = new Date(date).getMonth() + 1
				let d = new Date(date).getDate()
				// console.log(' 星座 ',m,d)
				var s="魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
				var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
				return s.substr(m*2-(d<arr[m-1]?2:0),2);
			},
		
			updateFile() {

			},
			// 等待时间
			waitingTime(date){
				let time = new Date() - new Date(this.date2)
				this.miao = parseInt(time / 1000)
				this.fen = parseInt(time / 1000 / 60)
				this.shi = parseInt(time / 1000 / 60 / 60)
				this.tian = parseInt(time / 1000 / 60 / 60 / 24)
				return{
					miao:parseInt(time / 1000),
					fen:parseInt(time / 1000 / 60),
					shi:parseInt(time / 1000 / 60 / 60),
					tian:parseInt(time / 1000 / 60 / 60 / 24 ),
				}
			},
			// 过去的时间
			pastTime(data){
				let _t = this
				let time = new Date()
				// 现在的时间
				let xianNian = new Date().getFullYear()
				// 出生时间
				let shengNian = new Date(data).getFullYear()
				// 年纪
				let nianJi = 0
				let nian = 0;
				let yue = new Date(data).getMonth() + 1
				let tian = new Date(data).getDate()
				
				// debugger
				if(new Date().getMonth() + 1 < yue || (new Date().getDate() < tian && new Date().getMonth() + 1 == yue)){
					nian = new Date().getFullYear()
					// 年龄
					_t.nian2 = xianNian - shengNian - 1
					nianJi = xianNian - shengNian - 1
				}else{
					nian = new Date().getFullYear() + 1
					// 年龄
					_t.nian2 = xianNian - shengNian
					nianJi = xianNian - shengNian
				}
				// let time = new Date() - new Date(this.date2)
				// console.log(nian+'/'+yue+'/'+tian)
				let time2 = new Date(nian+'/'+yue+'/'+tian) - new Date()
				 
				this.miao2 = parseInt(time2 / 1000)
				this.fen2 = parseInt(time2 / 1000 / 60)
				this.shi2 = parseInt(time2 / 1000 / 60 / 60)
				this.tian2 = parseInt(time2 / 1000 / 60 / 60 / 24 )
				// 年纪
				return {
					nianJi,
					miao:parseInt(time2 / 1000),
					fen:parseInt(time2 / 1000 / 60),
					shi:parseInt(time2 / 1000 / 60 / 60),
					tian:parseInt(time2 / 1000 / 60 / 60 / 24 ),
				}
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
		.mxp{
			// margin: 15rpx;
			// padding: 10rpx 20rpx;
			// border: 1px solid #F29100;
			// border-radius: 15rpx;
			// background-color: #FFFFFF;
			
			display: flex;
			>view{
				flex: 1;
			}
		}
		.sj_card,.formView{
			position: relative;
			
			margin: 15rpx;
			padding: 10rpx 20rpx;
			border: 1px solid #F29100;
			border-radius: 15rpx;
			background-color: rgba(255, 255, 255, 0.4);
		}
		.timeStatistics{
			display: flex;
			>view{
				flex: 1;
			}
		}
		.sj_card_name{
			line-height: 36px;
			font-size: 24px;
			
		}
		.deleteView{
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			color: red;
		}
		.formView_top{
			color: #ffaa00;
			font-size: 36rpx;
			font-weight: 600;
		}
	}
</style>
