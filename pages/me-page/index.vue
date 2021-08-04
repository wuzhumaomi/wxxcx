<template>
	<view class="mePage">
		<view class="topView">
			<view class="topView_top">
				{{weekday[new Date().getDay()]}}
			</view>
			<view class="topView_concent">
				<span>{{new Date().getFullYear() + '的第'}}</span> {{waitingTime(new Date().getFullYear()+'/1/1').tian}}
				<span>天</span> 
			</view>
			<view class="topView_bto">
				{{getSign(new Date()).shuXiang[0] + getSign(new Date()).shuXiang[1]  + getSign(new Date()).shengChen}}
				{{version}}
			</view>
		</view>

		<view class="bodyView">
			<view class="sj_card" v-for="(obj,index) in timeList" :key='index'> 
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
								<!--  -->
								<span style='color: #007AFF; margin-left: 15rpx;' v-if='pastTime(obj.time).tian < 7' @click="requestSubscribe(obj)"> 订阅 </span>
							</view>
							<view>
								还有{{pastTime(obj.time).tian}}天
							</view>
							<view>
								还有{{pastTime(obj.time).shi}}小时
							</view>
							<view>
								还有{{pastTime(obj.time).fen}}分钟
							</view>
							<view>
								还有{{pastTime(obj.time).miao}}秒
							</view>
						</view>
					
						<view class="" v-if="obj.ifShow != 1">
							<view class="">
								纪念日
							</view>
							<view>
								已经过了{{waitingTime(obj.time).tian}}天
							</view>
							<view>
								已经过了{{waitingTime(obj.time).shi}}小时
							</view>
							<view>
								已经过了{{waitingTime(obj.time).fen}}分钟
							</view>
							<view>
								已经过了{{waitingTime(obj.time).miao}}秒
							</view>
							
						</view>
						
					</view>
					
				</view>
				
			</view>
			
		</view>
		
		<mp-dialog title="test" :show="dialogShow" @buttontap="tapDialogButton" :buttons="buttons">
		 
		</mp-dialog>
		
		<!-- @click="dialogShow = true" -->
		<view class="add_btn"  @click="open" >
			
		</view>
		
		<uni-popup ref="popup" type="bottom">
			
			<view class="formView" >
			
						<view class="formView_top">
							<view class="" form-type="reset" @click="formReset">
								取消
							</view>
							<view class="">
								添加新卡片
							</view>
							<view class="" form-type="submit" @click="formSubmit">
								保存
							</view>
						</view>
					<!-- {{form.name}} -->
						<view class="uni-form-item uni-column">
								<input :focus='true' class="uni-input form_name" placeholder-class="phcolor" v-model='form.name' name="name" placeholder="输入称谓/姓名/事件名称" />
						</view>
						<view class="uni-form-item uni-column">
								<view class="title">时间</view>
								
								<picker data-field="date" mode="date" :value="form.time" @change="bindDateChange">
										<view class="weui-input">{{form.time}}</view>
								</picker>
								<input class="uni-input" style="display: none;" v-model="form.time" name="time" placeholder="时间" />
						</view>
			
						<view class="uni-form-item uni-column">
								<view class="title">卡片分类</view>
								<!-- typeList -->
								<!-- {{form.type}} -->
								<uni-data-checkbox mode='tag' :multiple="false" v-model="form.type" :localdata="typeList" @change="typeChange"></uni-data-checkbox>
								<!-- <radio-group name="type"  @change="(e)=>{form.type = e.detail.value}">
										<label>
												<radio value="Date"  checked="true"/><text>事件</text>
										</label>
										<label>
												<radio value="Personnel" /><text>角色</text>
										</label>
								</radio-group> -->
								
						</view>
						
						<view class="uni-form-item uni-column" >
								<view v-if="form.type == 'Date'" class="title">内容分类</view>
								<!-- {{form.ifShow}} -->
								<uni-data-checkbox v-if="form.type == 'Date'" mode='tag' :multiple="false" v-model="form.ifShow" :localdata="ifShowType" @change="ifShowChange"></uni-data-checkbox>
								<!-- <uni-data-checkbox v-model="form.ifShow" :localdata="ifShowType"></uni-data-checkbox> -->
								<!-- <radio-group name="ifShow" @change="(e)=>{form.ifShow = e.detail.value}"  >
										<label>
												<radio value="0"  checked="true"/><text>纪念日</text>
										</label>
										<label>
												<radio value="1" /><text>倒计时</text>
										</label>
										<label>
												<radio value="2" /><text>都要</text>
										</label>
								</radio-group> -->
						</view>
				
			</view>
			
		</uni-popup>
	</view>

</template>
<script>
	import api from '@/api/index.js'
	import zhuanHuan from '@/pages/components/Time.js'
	import Advertsing from '@/pages/components/advertising/index.vue'
	import canvasPage from '@/pages/canvas_page/canvas_page.vue'
	// "mp-dialog": "../components/dialog/dialog"
	export default {
		components: {
			Advertsing,
			// canvasPage
		},
		data() {
			return {
				// 版本
				version:'',
				
				dialogShow:false,
				// {text: '取消'}, {text: '确定'}
				buttons: [],
				
				weekday:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				
				ifShowType:[
					{"value": 0,"text": "纪念日"},
					{"value": 1,"text": "倒计时"},
					{"value": 2,"text": "都要"}],
				typeList:[
					{"value": 'Personnel',"text": "人物"},
					{"value": 'Date',"text": "事件"}
				],
				
				show: false,
				mode: 'date',
				
				value: [0,2],
				
				// 年纪
				nian2:0,
				// 生日
				date: '1999/4/27',
				// 紀念日
				date2: '2020/01/29 22:36:00',
				
				form: {
					time: '1999/4/27',
					name: '',
					type: 'Date',
					ifShow: 2,
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
			
				],
				// miao: 0,
				// fen: 0,
				// shi: 0,
				// tian: 0,
				
				// miao2: 0,
				// fen2: 0,
				// shi2: 0,
				// tian2: 0,

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
			let _t = this
			setInterval(function () {
				_t.timeList = [..._t.timeList]
			},1000)
			this.getList()
			console.log(' --调动-- ')
			// api.uploadExcel.main()
		},
		created() {
		},
		onShow() {
			// 版本
			const accountInfo2 = wx.getAccountInfoSync();
			console.log(accountInfo2.miniProgram.appId) // 小程序 appId
			console.log('小程序信息',accountInfo2) // 小程序版本号， 'a.b.c' 这样的形式
			this.version = 'v' + (accountInfo2.miniProgram.version?accountInfo2.miniProgram.version:'0.0.0')
		},
		methods: {
			 setTimeData(date) {
						var y = date.getFullYear();
						var m = date.getMonth() + 1;
						m = m < 10 ? ('0' + m) : m;
						var d = date.getDate();
						d = d < 10 ? ('0' + d) : d;
						var h = date.getHours();
						h=h < 10 ? ('0' + h) : h;
						var minute = date.getMinutes();
						minute = minute < 10 ? ('0' + minute) : minute;
						var second=date.getSeconds();
						second=second < 10 ? ('0' + second) : second;
						return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
			 },
			 // 订阅接种通知
			  requestSubscribe(data) {
					let _t = this
			    const templateId = 'J20w0hd67i16M3GIXSxZ-aWLS_9iCIDaI_2K543LhMU' // 模板ID
			
			    // 发起订阅通知请求
			    wx.requestSubscribeMessage({
			      tmplIds: [templateId],
			      success: (res) => {
			        if (res[templateId] === 'accept') {
			          // 订阅成功，订阅记录存入数据库
			          const db = wx.cloud.database();
			          db.collection("user_subscribe").add({
			            data: {
			              subMsg: {
											thing1: {
												value: "用户名称"
											},
											thing2: {
												value: data.name
											},
											time3: {
												value: _t.setTimeData(new Date(data.time)) 
											},
											thing4: {
												value: '温馨提示'
											},
											thing8: {
												value: '预约详情'
											}
			              },
			              status: 1, //发送状态 0表示已发送，1表示未发送
			              createTime: new Date(),
			              templateId: templateId // 模板ID
			            },
			            success(res) {
			              console.log("成功存入数据库！")
			            },
			            fail(res) {
			              console.log("存入数据库失败！")
			            }
			          })
			          wx.showToast({
			            icon: "success",
			            title: '消息订阅成功',
			          })
			        } else {
			          wx.showToast({
			            icon: 'none',
			            title: '消息订阅失败',
			          })
			          console.log(res[templateId], '失败')
			        }
			      }
			    })
			  },
			typeChange(e){
					console.log('e:',e.detail.value);
					this.form.type = e.detail.value
			},
			ifShowChange(e){
					console.log('e:',e.detail.value);
					this.form.ifShow = e.detail.value
			},
			open(){
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open()
				this.form = this.$options.data().form 
				// this.formReset()
			},
			formReset: function(e) {
					console.log('清空数据')
					this.$refs.popup.close()
					this.form = this.$options.data().form 
					// {
					// time: '1999/4/27',
					// name: '',
					// type: 'Date',
					// ifShow: 0,}
			},
			tapDialogButton(e) {
				console.log(e)
				this.$refs.popup.close()
				// this.showOneButtonDialog=false
			},
			bindDateChange: function (e) {
				this.form.time = e.detail.value
			},
			formSubmit: function(e) {
					// this.form
					// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					// var formdata = e.detail.value
					if(this.form.name && this.form.time ){
						this.add(this.form)
						this.$refs.popup.close()
					}else{
						uni.showModal({
								content: '请输入完整数据',
								showCancel: false
						});
					}
			},
			// 添加数据
			add(obj){
				let _t = this

				api.anniversaryDay.addApi({
					...obj,
					openId:wx.getStorageSync('openId')
				}).then(res=>{
						// uni.showModal({
						// 		content: '添加成功',
						// 		showCancel: false
						// });
						uni.showToast({
						    title: '添加成功',
						    duration: 2000
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
						// uni.showModal({
						// 		content: '删除成功',
						// 		showCancel: false
						// });
						uni.showToast({
						    title: '删除成功',
						    duration: 2000
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
					shuXiang:[t[3],t[4]],
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
				let time = new Date() - new Date(date)
				// this.miao = parseInt(time / 1000)
				// this.fen = parseInt(time / 1000 / 60)
				// this.shi = parseInt(time / 1000 / 60 / 60)
				// this.tian = parseInt(time / 1000 / 60 / 60 / 24)
				
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
					// _t.nian2 = xianNian - shengNian - 1
					nianJi = xianNian - shengNian - 1
				}else{
					nian = new Date().getFullYear() + 1
					// 年龄
					// _t.nian2 = xianNian - shengNian
					nianJi = xianNian - shengNian
				}
				// let time = new Date() - new Date(this.date2)
				// console.log(nian+'/'+yue+'/'+tian)
				let time2 = new Date(nian+'/'+yue+'/'+tian) - new Date()
				 
				// this.miao2 = parseInt(time2 / 1000)
				// this.fen2 = parseInt(time2 / 1000 / 60)
				// this.shi2 = parseInt(time2 / 1000 / 60 / 60)
				// this.tian2 = parseInt(time2 / 1000 / 60 / 60 / 24 )
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
	$hei01: #bfbec4;
	$hei02: #8f939c;
	$hei03: #1c1a2f;
	$lan: #5391a6;
	$qing: #59c3b7;
	$cheng: #f6b758;
	// html,body{
	// 	background-color: red;
	// }
	.mePage {
		
		.bodyView{
			position: absolute;
			width: 100%;
			top: 30vh;
			left: 0;
			
			padding: 20rpx;
			border-top-left-radius: 60rpx;
			border-top-right-radius: 60rpx;
			background-color: #fcfdfd;
		}

		.add_btn{
			width: 60rpx;
			height: 60rpx;
			position: fixed;
			
			border-radius: 50%;
			background-color: $lan;
			border: 1rpx solid #ffffff;
			
			bottom: 10rpx;
			right: 10rpx;
		}
		.add_btn::after{
			content: ' ';
			
			width: 3rpx;
			height: 30rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: #ffffff;
			transform: translate(-50%,-50%);
		}
		.add_btn::before{
			content: ' ';
			
			width: 30rpx;
			height: 3rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: #ffffff;
			transform: translate(-50%,-50%);
		}
		// z-index: -1;
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
		
		.topView{
			// left: 0;
			width: 100%;
			height: 35vh;
			background: url('https://img.cc0.cn//pixabay/2019102220063337385.jpg/w320.jpg') no-repeat;
			background-size: 100% auto;
			
			color: #FFFFFF;
			
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
			>view{
				margin-top: 15rpx;
			}
			span{
				font-size: 36rpx;
			}
			.topView_concent{
				font-size: 120rpx;
				font-weight: 600;
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
		.sj_card{
			position: relative;
			margin: 15rpx;
			padding: 10rpx 20rpx;
			// border: 1px solid #F29100;
			border-radius: 15rpx;
			// background-color: rgba(255, 255, 255, 0.4);
			background-color: #ffffff;
			box-shadow:0 0 20rpx #e8e8e8 ;
			
			min-height: 60rpx;
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
			color: #DD524D;
		}
		.formView{
			// text-align: left;
			height: 70vh;
			background-color: #f6f6f6;
			
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			padding:25rpx 30rpx;
		}
		.formView>view{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
		}
		.formView_top{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
			margin-bottom: 40rpx;
		}
		.formView_top{
			font-size: 28rpx;
		}
		.formView_top>view:nth-child(1){
			color: $hei02;
		}
		.formView_top>view:nth-child(2){
			color: #1c1a2f;
			font-size: 30rpx;
			font-weight: 600;
		}
		.formView_top>view:nth-child(3){
			color: $lan;
		}
		
		.form_name{
			height: 60rpx;
			font-size: 36rpx;
		}
		.phcolor{
			color:#bfbec4;
		}
		.title{
			color: #1c1a2f;
			font-size: 26rpx;
			font-weight: 600;
		}
	}
</style>
