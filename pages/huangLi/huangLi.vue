<template>
	<view class="laoHuangLi">
			<!-- 阳历 {{data.yangli}}		<br>	 -->
			<div class='yangli'> {{data.yangli}} </div>
			
			<!-- 阴历 {{data.yinli}}			<br>	 -->
			<div class='yinli'> {{data.yinli}} </div>
			
			<view class="yiJi">
				<view class="yi yjBox">
					<u-tag class="tag" text="宜" shape="circle" mode="dark" type="success" /> {{data.yi}}			<br>	
				</view>
				<view class="ji yjBox">
					<u-tag class="tag" text="忌" shape="circle" mode="dark" type="error" /> {{data.ji}}			<br>	
				</view>
			</view>
			
			<view class="yjBox fontbox">
				<view class="topBox">
					五行
				</view>  {{data.wuxing}}
			</view>
			
			<view class="yjBox fontbox">
				<view class="topBox">
					冲煞
				</view>  {{data.chongsha}}
			</view>
			
			<view class="yjBox fontbox">
				<view class="topBox">
					彭祖百忌
				</view>  {{data.baiji}}	
			</view>
			
			<view class="yjBox fontbox">
				<view class="topBox">
					吉神宜趋
				</view>  {{data.jishen}}
			</view>
			
			<view class="yjBox fontbox">
				<view class="topBox">
					凶神宜忌
				</view>  {{data.xiongshen}}
			</view>
			<!-- 天气 api  -->
			<Weather ></Weather>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	// \pages\weather_page
	import Weather from '@/pages/weather_page/weather_page.vue'
	// baiji: "壬不汲水更难提防 辰不哭泣必主重丧"
	// chongsha: "冲狗(丙戍)煞南"
	// id: "3991"
	// ji: "斋醮 作灶 安床 安葬"
	// jishen: "天德合 守日 天巫 阳德 六仪 金匮 金堂"
	// wuxing: "长流水 满执位"
	// xiongshen: "月虚 厌对"
	// yangli: "2021-03-05"
	// yi: "安床 合帐 入宅 问名 纳采 求嗣 祭祀 开仓"
	// yinli: "辛丑(牛)年正月廿二"
	// _id: "28ee4e3e6041d71408fbf23b69f8769e"
	// _openid: "oqHH25YzRWbQ3KOK_fCEBASJ6Axc"
	export default {
		components:{
			Weather
		},
		data() {
			return {
				data:{
				baiji: "",
				chongsha: "",
				id: "",
				ji: "",
				jishen: "",
				wuxing: "",
				xiongshen: "",
				yangli: "",
				yi: "",
				yinli: "",
				}
			};
		},
		created() {
			this.laohuangli()
		},
		methods:{
			laohuangli(data){
				let _t = this
				api.request.laohuangliD(data)
				.then(res => {
					console.log('老黄历', res?.data);
					if(res?.data){
						for (let time of res.data) {
							this.data = time
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
		}
	}
</script>

<style lang="scss">

	.laoHuangLi{
		padding: 20rpx;
		min-height: 100vh;
		background-color: #eadac0;
		
		.yangli,.yinli{
			text-align: center;
			margin: 10rpx;
		}
		.yinli{
			color: #ff0000;
			font-size: 60rpx;
			font-weight: 600;
		}
		.yiJi{
			border-top:$u-type-info solid 1rpx;
		}
		.yjBox{
			margin: 20rpx;
		}
		.u-tag{
			padding: 9rpx 18rpx!important;
			margin-right: 20rpx;
		}
		.topBox{
			width: 120rpx;
			display: inline-block;
			margin-right: 10rpx;
			color: $u-type-warning;
		}
		.fontbox{
			color: $u-main-color;
			// font-size:;
			font-weight: 600;
		}
	}
</style>
