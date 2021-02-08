<template>
	<view class="container homePage">
		<view class="bodyView">
		</view>
		<view class="topView">
		</view>
		
		<CompInput class='top01'></CompInput>
		
		<view class="re_sou">
			<view class="reSouText">
				热搜 ：
			</view>
			<scroll-view class="scrool-more" scroll-x="true" scroll-with-animation="true">
				<text class="label-name" v-for="(item,index) in listTypecont" :key="index">
					{{item.name }}
				</text>		
			</scroll-view>
		</view>
		<!-- 轮播图 -->
		<view class="uni-padding-wrap-2">
			<swiper class="swiper" indicator-color='#ffffff' indicator-active-color='#00aaff'  :indicator-dots="indicatorDots" circular='true' :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item>
							<view class="swiper-item uni-bg-red">
								<image src="../../static/home-page/gg01.jpg" mode=""></image>
							</view>
					</swiper-item>
					<swiper-item>
							<view class="swiper-item uni-bg-green">
								<image src="../../static/home-page/gg02.jpg" mode=""></image>
							</view>
					</swiper-item>
					<swiper-item>
							<view class="swiper-item uni-bg-blue">
								<image src="../../static/home-page/gg01.jpg" mode=""></image>
							</view>
					</swiper-item>
			</swiper>
		</view>
		
		<!-- 专业标识 -->
		<uni-list class="list boxshow">
				<uni-list-item class="list-item"  title="专业质检" rightText="右侧文字" link="reLaunch">
					<!-- 自定义 footer-->
					<template class="list-tem1" slot="footer">
							{{6666}}
					</template>
					<template class="list-tem2" slot="header">
							<image src="../../static/home-page/safeguard.png" class="icon-img" mode=""></image>
					</template>
				</uni-list-item>
				
				<view class="listView">
					<view class="t1">
						专业智能验机
					</view>
					<view class="t2">
						放心严选好货
					</view>
					<view class="t3">
						手机3C保卖
					</view>
				</view>
		</uni-list>
		<!-- 分割线 -->
		<view class="fg-xian">
			<view class="xian">
				<view class="xian-text">
					跃讯战略投资
				</view>
			</view>
		</view>
		<van-button type="primary">主要按钮</van-button>
		<!-- 瀑布流div -->
		<view class="pbl-view">
				<view class="pbl-view-item"  v-for="(item,index) in listTypecont" :key="index">
					<view class="pbl-top">
						<image src="../../static/shopping-cart-page/wu.png" mode=""></image>
					</view>
					<view class="pbl-text">
						{{item.name }}
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import CompInput from '@/pages/components/comp-input/index.vue'
	export default {
		components:{
			CompInput
		},
		data() {
			return {
        options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
        action: '',
        where: {} ,// 类型为对象或字符串
				
				// <!-- 		6666
				// 	
				// 		9999 -->
				items: [{
					title: "步骤一",
					desc: "2020-04-01"
				}, {
					title: "步骤二",
					desc: "2020-04-01"
				}, {
					title: "步骤三",
					desc: "2020-04-01"
				}, {
					title: "步骤四",
					desc: "2020-04-01"
				}],
				activeSteps: 1,
				
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				listTypecont:[
					{name:"限时加价10%"},
					{name:"小米9"},
					{name:"苹果6"},
					{name:"苹果8"},
					{name:"小米8"},
					{name:"摩托车"},
					{name:"苹果x"},
					{name:"苹果11"},
					{name:"苹果"},
					{name:"洗衣机"},
					{name:"冰箱"},
				],
				// 轮播图
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 600
			}
		},
    onPullDownRefresh() { 
    },
    onReachBottom() { //滚动到底翻页
      // this.$refs.udb.loadMore()
			this.listTypecont=[
				...this.listTypecont,
				...this.listTypecont
			]
    },
		onShow(){
			// uni.showNavigationBarLoading();// 加载
			
			// setTimeout(()=>{
			// 	uni.hideNavigationBarLoading();//关闭加载动画
			// },5000)
			
			// uni.request({
			//     url: 'http://entapi.anjyzn.cn/api/oauth/login/enterprise', //仅为示例，并非真实接口地址。
			// 		method:'post',
			//     data: {
			// 				username: 'ceshi',
			// 				password: 'jy666888.',
			// 				type:'password',
			//     },
			//     header: {
			//         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' //自定义请求头信息
			//     },
			//     success: (res) => {
			//         console.log(res.data);
			//         this.text = 'request success';
			//     }
			// });
		},
		mounted() {
			// this.$refs.calendar.show()
			// this.selectDate()
		},
		
		methods: {
				//uni-app 方法调用
				selectDate() {
					this.$refs.calendar.show();
				},
				change(e) {
					//选择结果
				 console.log(e);
				},
				onqueryload: function(data, ended) {
					// 可在此处预处理数据，然后再渲染界面
					console.log(data, ended)
				},
				onqueryerror(e) {
					// 加载数据失败
				},
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

<style  lang="scss">
	$width100-40: calc(100vw - 40rpx);
	$width100-80: calc(100vw - 115rpx);
	
	.homePage{
		height: 100%!important;
		
		 .content {
		    display: flex;
		    flex-direction: column;
		    background-color: #f0f0f0;
		  }
		
		  .list-item {
		    background-color: #fff;
		    margin-bottom: 1px;
		    // padding: 30px 15px;
		  }
		
		  .loading {
		    padding: 20px;
		    text-align: center;
		  }
		
		  .error {
		    color: #DD524D;
		  }
		
			// 头像背景块
			.topView{
				width: 100vw;
				height: 20vh;
				background-color: #550000;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			}
				
			// 热搜
			.re_sou{
				color: #d9d9d9;
				width: $width100-40;
				font-size: 25rpx;
				display: flex;
				align-items: center;
				
				margin-top: 20rpx;
			}
			.scrool-more{
				// 必须要这个属性，否者不能出现横线滚动
				white-space: nowrap; 
				// width: $width100-80;
				flex: 1;
				overflow: hidden;
				// height: 56rpx;
				display: inline-block; 
			}
			.label-name{
				display: inline-block; 
				// width: 70rpx;
				padding: 3rpx 20rpx;
				height: 40rpx;
				line-height: 40rpx;
				background-color:rgba(209, 209, 209, 0.1);
				text-align: center;
				margin-right: 10rpx;
				border-radius: 20rpx;
			}
			
		// 轮播广告
		.uni-padding-wrap-2{
			border-radius: 20rpx;
			overflow: hidden;
			margin-top: 20rpx;
			height: 150rpx;
			width: $width100-40;
			background-color: #007AFF;
			.swiper-item {
				image{
					width: 100%;
					height: 150rpx;
					position: absolute;
				}
				
			}
		}
		// 列表
		.list{
			margin-top: 20rpx;
			display: inline-block;
			width: $width100-40;
			border-radius: 20rpx;
			overflow: hidden;
			.uni-list-item__container{
				line-height: 70rpx;
				height:70rpx;
				padding: 0;
			}
		}
		.list-item{
			// background-color: #ffd778;
			font-weight: 600;
			height:70rpx;
			view{
				background-color: #ffe3b5;
			}
			.list-tem1{
				display: flex;
				flex-direction: row;
				align-items: center;
				
				color: #a5a5a5!important;
				font-size: 20rpx!important;
			}
			.list-tem2{
				width: 70rpx;
				text-align: center;
				margin-right: 20rpx;
				.icon-img{
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 55rpx;
					height: 55rpx;
				}
			}
		}
		.listView{
			width: 100%;
			height: 70rpx;
			background-color: #ffffff;
			color: #8f672e;
			font-weight: 600;
			font-size: 22rpx;
			
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
		}
		// 分割线
		.fg-xian{
			width: $width100-40;
			height: 50rpx;
			text-align: center;
			
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			.xian{
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				width: 360rpx;
				border-radius: 100%;
				// border: 2rpx solid #333333;
				background-color: #959595;
				height: 4rpx;
				.xian-text{
						color: #6c6c6c;
						font-weight: 600;
						position: absolute;
						width: 150rpx;
						font-size: 23rpx;
						background-color: #F1F5F8;
				}
			}
		}
		
		// 瀑布流布局
		.pbl-view{
			width: $width100-40;
			column-count:2;
			column-gap: 20rpx;
			
			.pbl-view-item:nth-child(3){
				height: 400rpx!important;
			}
			.pbl-view-item:first-child{
				margin-top: 0rpx;
			}
			.pbl-view-item{
				position: relative;
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
				image{
					position: absolute;
					width: 100%;
					height: 100%;
				}
			}
			.pbl-text{
				bottom: 0;
				width: 100%;
				background-color: #A1DCC1;
				border-top: 2px solid #333333;
				position: absolute;
				height: 30%;
				font-size: 26rpx;
				padding: 10rpx;
				color: #333333;
				font-weight: 600;
			}
		}
	}
</style>
