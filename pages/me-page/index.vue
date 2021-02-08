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
					<open-data type="userNickName"></open-data>
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
			<uni-grid class="functionView boxshow" :show-border="false" name='uni-grid' :column="4">
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
		</view <!-- 广告 -->
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
		<!--  -->
		<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
			授权登录
		</button>
		<!-- 列表 -->
		<view class="listView boxshow">
			<uni-list class="listView boxshow">
				<uni-list-item title="使用许可使用协议" link="reLaunch" @click="onClick($event,1)"></uni-list-item>
				<uni-list-item title="隐私条款" link="reLaunch" @click="onClick($event,1)"></uni-list-item>
				<uni-list-item title="平台规则" link="reLaunch" @click="onClick($event,1)"></uni-list-item>
			</uni-list>
		</view>
	</view>
	    

</template>
<script>
	import Advertsing from '@/pages/components/advertising/index.vue'
	export default {
		components: {
			Advertsing
		},
		data() {
			return {
				number01: 6,
				number02: 8,
				globalData:{},
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
		methods: {
			onClick(res) {
				console.log(res)
			},
		},
			bindGetUserInfo:function(res) {
					console.log(res)
			    if (res.detail.userInfo) {
			      //用户按了允许授权按钮
			      var that = this;
			      // 获取到用户的信息了，打印到控制台上看下
			      console.log("用户的信息如下：");
			      console.log(e.detail.userInfo);
			      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
			      that.setData({
			        isHide: false
			      });
			    } else {
			      //用户按了拒绝按钮
			      wx.showModal({
			        title: '警告',
			        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
			        showCancel: false,
			        confirmText: '返回授权',
			        success: function(res) {
			          // 用户没有授权成功，不需要改变 isHide 的值
			          if (res.confirm) {
			            console.log('用户点击了“返回授权”');
			          }
			        }
			      });
			    }
			 },
		/**
		  * 生命周期函数--监听页面加载
		  */
		  onLoad: function(options) {
		    var that = this;
		    //查看是否授权
		    wx.getSetting({
		      success: function(res) {
		        if (res.authSetting['scope.userInfo']) {
		          console.log("用户授权了");
		        } else {
		          //用户没有授权
		          console.log("用户没有授权");
		        }
		      }
		    });
		  },
	
		created() {
			var that=this;
			wx.getSetting({
				success(res) { //authSetting用户授权结果
					console.log(res.authSetting);
					console.log('用户授权结果',res);
					//scope.userInfo
					if (res.authSetting['scope.userInfo']) { //授权过
						console.log('授权过信息');
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
						wx.getUserInfo({
							success: function(res) {
								debugger
								console.log(res.userInfo);
								//存储到本地
								that.globalData.userInfo = res.userInfo;
								// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
								// 所以此处加入 callback 以防止这种情况
								if (that.userInfoReadyCallback) {
									that.userInfoReadyCallback(res)
								}
							}
						})
					} else {
						console.log('没有授权')
					}
				}
			})
			wx.showModal({
				title: '是否授权当前的用户信息',
				content: '',
			})
			// 获取用户信息
			wx.getSetting({
				success: res => {
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
						wx.getUserInfo({
							success: res => {
								console.log(res);
							}
						})
					}
				}
			})
		}
	}
</script>
<style lang="scss">
	.mePage {
		// 头像背景块
		.topView {
			width: 100vw;
			height: 20vh;
			background-color: #ffaa7f;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
		// 用户信息
		.userBox {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 15rpx;
			.userImg {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.userName {
				font-size: 38rpx;
				font-weight: 600;
				color: #333333;
				margin-bottom: 18rpx;
			}
			.userText {
				font-size: 24rpx;
				font-weight: 600;
				color: #666666;
			}
		}

		// info
		.topView-bot {
			margin-top: 30rpx;
			width: calc(100% - 40rpx);
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
			width: calc(100% - 40rpx);
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
			width: calc(100% - 40rpx);
			margin-top: 30rpx;
		}
		// 列表模块
		.listView {
			width: calc(100% - 40rpx);
			margin-top: 30rpx;
			border-radius: 5rpx;
			box-shadow: 0rpx 0rpx 3rpx rgba(0, 0, 0, 0.16);
		}
	}
</style>
