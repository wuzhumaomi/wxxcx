<template>
	<view class="view shopping-cart-page">
		<view class="image-view">
			<!-- <image  src="../../static/shopping-cart-page/wu.png" mode=""></image> -->
			<u-empty class='img' text="暂无符合条件的商品" mode="car"></u-empty>
		</view>
		
		<!-- 购物条 -->
		<view class="btn-view">
			<view class="left-view">
				<checkbox value="cb" />全选 合计：￥0.00
			</view>
			<view class="right-view">
				<button class="right-btn" type="warn" @click="goto('../home-page/index')">去结算</button>
			</view>
		</view>
	</view>
</template>

<script >
	export default {
		components:{
		
		},
    data () {
      return {
        options: [{
            icon: 'headphones',
            text: '客服'
        }, {
            icon: 'shop',
            text: '店铺',
            info: 2,
						// 标记的颜色
            // infoBackgroundColor:'#007aff',
            // infoColor:"red"
        }, {
            icon: 'cart',
            text: '购物车',
            info: 2
        }],
        buttonGroup: [{
          text: '去结算（0）',
          backgroundColor: '#ff0000',
          color: '#fff'
        }]
      }
    },
    methods: {
			goto(url) {
				console.log(url)
				uni.switchTab({
					url:url
				})
			},
      onClick (e) {
				console.log(e)
        uni.showToast({
          title: `点击${e.content.text}`,
          icon: 'none'
        })
      },
      buttonClick (e) {
        console.log(e)
        this.options[2].info++
      }
    }
	}
</script>
<style>
.shopping-cart-page	.image-view{
		display: flex;
		flex-direction: column;
		/* justify-content: baselin; */
		align-items: center;
		
	}
.shopping-cart-page	.image-view span{
		margin-top: -90rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: #a3a3a3;
		/* margin-top: 18rpx; */
	}
</style>
<style lang="scss">
.shopping-cart-page{
	.img{
		margin-top: 10vh;
	}
	.btn-view{
		box-shadow: 0 0 5px #e3e3e3;
		position: absolute;
		height: 80rpx;
		background-color: #ffffff;
		width: 100vw;
		bottom: 0;
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
		// 
		// padding-right: 15rpx;
		
		.left-view{
			padding-left: 15rpx;
		}
		.right-view{
			padding-right: 15rpx;
		}
		.right-btn{
			width: 200rpx;
			height: 60rpx;
			border-radius: 30rpx;
			padding: 0!important;
			line-height: 60rpx;
		}
	}
}
</style>
