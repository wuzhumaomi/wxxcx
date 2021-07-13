<template>
	<view class="allBox">
		<u-field
					class="inputBox"
					v-model="value"
					placeholder="请输入梦境关键词"
				>
					<u-button size="mini" slot="right" type="success" @click="onclick">解梦</u-button>
		</u-field>
		
		
		<u-divider bg-color='#eadac0' border-color='#606266' color="#606266">热门解梦</u-divider>
		<u-button :custom-style="customStyle" class="btn" @click="onBtnDream('蛇')">蛇</u-button>
		<u-button :custom-style="customStyle" class="btn" @click="onBtnDream('情人')">情人</u-button>
		<u-button :custom-style="customStyle" class="btn" @click="onBtnDream('拉屎')">拉屎</u-button>
		<u-button :custom-style="customStyle" class="btn" @click="onBtnDream('放屁')">放屁</u-button>
		<u-button :custom-style="customStyle" class="btn" @click="onBtnDream('飞')">飞</u-button>
		<u-button :custom-style="customStyle" class="btn" @click="onBtnDream('飘')">飘</u-button>
		<u-line  />
		<view class="list" v-for="item of list">
			<view class="topText">
				{{item.title}}
			</view>
			<view class="btnText">
					{{item.des}}
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/index.js'
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				border: true,
				list:[],
				customStyle:{
					border: '2rpx #d3ad76 dashed',
					backgroundColor: '#e6caa3',
					color: '#666666',
					height: '60rpx',
					// border: '0 solid #000000'
				}
			}
		},
		methods: {
			onclick(){
				// 周公解梦
				this.dream(this.value)
			},
			onBtnDream(text){
				this.dream(text)
				// btn.innerHTML()
			},
			dream(data){
				let _t = this
				api.request.dreamQuery(data)
				.then(res => {
					if(res.data?.result){
							this.list = res.data?.result
					}else{
							this.list = [{title:'没有相关数据，请换一个描述词语'}]
					}
					
					console.log('周公解梦 --- ', res?.data.result);
					if(res?.data){
						for (let time of res.data.result) {
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
			
		},
		created() {
			
		}
	}
</script>

<style lang="scss">
.allBox{
		padding: 20rpx;
		min-height: 100vh;
		background-color: #eadac0;
		.inputBox{
			.u-label{
				flex: 0 0 0!important;
			}
			button{
				height: 80rpx;
			}
			input,button{
				border: 1rpx solid #d3ad76;
				box-shadow: 0 0 8rpx #d3ad76;
				background-color: #e6caa3;
				padding: 20rpx;
				border-radius: 20rpx;
				color: #666666;
			}
		
		}
	.list{
		margin-top: 10rpx;
		border: 1rpx solid #d3ad76;
		box-shadow: 0 0 8rpx #d3ad76;
		border-radius: 6rpx;
		background-color: #e6caa3;
	}
	.btnText,.topText{
		margin: 10rpx;
		color: #666666;
	}
	.topText{
		color: $u-content-color;
		font-size: 36rpx;
		font-weight: 600;
	}
	.btn{
		width: 33%;
		margin: 0.15%;
		display: inline-block;
		color: #FFFFFF;
	}
}

</style>
