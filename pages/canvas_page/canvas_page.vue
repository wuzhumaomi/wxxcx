<template>
<view>
		<!-- <view class='img'>
			<image src='https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=42_kgSShv1lHpJql5VcZhL3Po5GGvAj2Izsc2uv1KI49giUuYxsuwHSE5Cv2349LyJQTgWgxjakJcgB8On7py9nGRlT21gCH9vFdHXDUPuKYke5lxcsgObzYhkhqM1NaIm1kRJ05yTih6Qo9q32IBSjAJAUNE' ></image>
		</view> -->
		
    <view class="personal_li" @click="shareClick">
			<image :src="url01"
						 mode="widthFix"
						 class="iconImage"></image>
			<text class="font14">分享生成图片</text>
			<image :src="url02"
						 mode="widthFix"
						 class="jtIcon"></image>
    </view>
		
		<view class="canvasContent" v-if="canvasShow">
				<canvas canvas-id="shareCanvas" class="canvasName"></canvas>
				<view class="canvasText">图片已保存到相册，可分享给好友</view>
				<!-- <image :src="url01" class="errorImage" @click="canvasShow = false"></image> -->
				<u-button  @click="canvasShow = false">保存图片</u-button>
		</view>
		
</view>
</template>
 
<script>
export default {
  data() {
    return {
			canvasShow: false,
			url01:'https://img-pre.ivsky.com/img/tupian/pre/201911/10/wu_shanlin.jpg',
			url02:'https://qr.api.cli.im/newqr/create?data=%E4%BD%A0%E5%A5%BD&level=H&transparent=0&bgcolor=%23ffffff&forecolor=%2368B56B&blockpixel=12&marginblock=2&logourl=null&size=400&logoshape=no&embed_text_fontfamily=simhei.ttc&foretype=2&gradient_way=slash&forecolor2=%2321938E&eye_use_fore=1&qrcode_eyes=pin-4.png&outcolor=%239A3131&incolor=%237D4646&body_type=25&water_ratio=1&qr_rotate=0&text=&fontfamily=simhei.ttc&logo_pos=0&kid=bizcliim&time=1614067216&key=d88a90a83a4e30c3770b9c7b4d45b876',
			src2:'',
			nickName:''
    }
  },
	
	mounted() {
		wx.getUserInfo({
			success: res => {
				// debugger
				this.nickName = res.userInfo.nickName
			}
		})
		
		var that = this;
		// wxcbaa212bcb33c859 d61ff9c352b709101e99736955e994d6
		uni.request({
				url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxcbaa212bcb33c859&secret=d61ff9c352b709101e99736955e994d6',
				method:'get',
				data: {
				},
				header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' //自定义请求头信息
				},
				success: (res) => {
						console.log(res.data);
						
						this.src2 = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+res.data.access_token
						// 小程序二维码
						// POST https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN
						uni.request({
								url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+res.data.access_token,
								method:'post',
								data: {
									path:"/pages/logo-page/logo-page"
								},
								header: {
										'Content-Type': 'application/json;/x-www-form-urlencoded;charset=utf-8' //自定义请求头信息
								},
								success: (res) => {
									var src = wx.arrayBufferToBase64(res.data);  //对数据进行转换操作
									// const base64 = wx.arrayBufferToBase64(res.result.buffer)
								}
						});
				}
		});
		
	},
  methods: {
				
        //这是一个封装好的方法 
        promisify: api => {
            return (options, ...params) => {
                return new Promise((resolve, reject) => {
                    const extras = {
                        success: resolve,
                        fail: reject
                    }
                    api({ ...options, ...extras }, ...params)
                })
            }
        },
				
        shareClick() {         
            const wxGetImageInfo = this.promisify(uni.getImageInfo)
            Promise.all([
                    // 图片目前只随机找了几张图片，后期可自行替换
                    wxGetImageInfo({
                            src: this.url01   // 背景图片
                    }),
                    wxGetImageInfo({
                            src: this.url02   // 二维码图片，二维码图片如需要携带参数，可根据接口将需要扫码进入页面的路径+参数传入后端，后端可根据生产小程序二维码路径，将路径放入这里就ok了,<a href="https://www.jianshu.com/p/5f96a4f91b9c" target="_blank">可参考</a>
                    })
            ]).then(res => {
                    // console.log(3454)
                    const ctx = wx.createCanvasContext('shareCanvas')
                    // console.log(ctx)
                    // 底图
                    ctx.drawImage(res[0].path, 0, 0, 600, 700)
                    // 作者名称
                    ctx.setTextAlign('right')    // 文字居中
                    ctx.setFillStyle('#000000')  // 文字颜色：黑色
                    ctx.setFontSize(24)         // 文字字号：22px
										// ctx.strokeStyle = 'green';
                    ctx.fillText('生活不止眼前的苟且,', 300 - 10, 50)
                    ctx.fillText('还有诗和远方.', 300 - 10, 100)
										ctx.fillText('--- ' + this.nickName, 300 - 10, 150)
                    // 小程序码
                    const qrImgSize = 150
                    ctx.drawImage(res[1].path, 30, 280, qrImgSize, qrImgSize)
                    ctx.stroke()
                    // 绘图生成临时图片
                    console.log('res', res)
                    ctx.draw(false,() => {
                        this.tempFileImage()
                    })
                    this.canvasShow = true
            })
        },
				
        tempFileImage() {
            let that = this
            uni.canvasToTempFilePath({
                    canvasId: 'shareCanvas',
                    success: (res) => {
                            uni.hideLoading()
                            that.savePic(res.tempFilePath)
                    },
                    fail:function () {
                            //TODO
                    }
            })
        },
				
        //保存
        savePic (filePath) {
            console.log('filePath', filePath)
            uni.showLoading({
                    title: '正在保存'
            });
            uni.saveImageToPhotosAlbum({
                    filePath: filePath,
                    success: function () {
											uni.showToast({
												title: '图片保存成功～'
											});
                    },
                    fail: function (e) {
                            //TODO
                    },
                    complete: function (){
											uni.hideLoading()
                    }
            });
        }
  }
}
</script>
<style lang="scss" scoped>
		.font14{
			display: block;
			font-size: 44rpx;
			font-weight: 600;
			// text-align: right;
		}
    .canvasContent{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 50upx;
 
        .canvasName{
            width: 80%;
            height: calc(100vh - 300upx);
        }
        .canvasText{
            margin: 30upx 0 20upx;
            color: #FFFFFF;
        }
        .errorImage{
            width: 80upx;
            height: 80upx;
        }
				
    }
</style>