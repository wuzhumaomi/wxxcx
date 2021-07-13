<template>
<view>
		<!-- <view class='img'>
			<image src='https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=42_kgSShv1lHpJql5VcZhL3Po5GGvAj2Izsc2uv1KI49giUuYxsuwHSE5Cv2349LyJQTgWgxjakJcgB8On7py9nGRlT21gCH9vFdHXDUPuKYke5lxcsgObzYhkhqM1NaIm1kRJ05yTih6Qo9q32IBSjAJAUNE' ></image>
		</view> -->
		
    <view class="personal_li" >
			<image :src="url01"
						 mode="widthFix"
						 class="iconImage"></image>
			<image :src="url02"
						 mode="widthFix"
						 class="jtIcon"></image>
			
			<u-button v-if="!canvasShow" @click="shareClick" class="UBtn" type="primary">将上述图片生成图片并保存</u-button>
			
    </view>
		
		<view class="canvasContent" v-if="canvasShow">
				<canvas canvas-id="shareCanvas" class="canvasName"></canvas>
				<view class="canvasText">{{canvasText}}</view>
				<!-- <image :src="url01" class="errorImage" @click="canvasShow = false"></image> -->
				<u-button v-if="!ifShouQuan"  @click="toMain">完成</u-button>
				<u-button v-if="ifShouQuan" @click="shouQuan()" class="UBtn" type="primary">保存到相册权限授权</u-button>
		</view>
		
</view>
</template>
 
<script>
export default {
  data() {
    return {
			canvasText:'',
			canvasShow: false,
			ifShouQuan: false,
			url01:'cloud://ilovejiujiu.696c-ilovejiujiu-1301925360/img/wu_shanlin.jpg',
			url02:'cloud://ilovejiujiu.696c-ilovejiujiu-1301925360/img/erWeiMa.png',
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
				toMain(){
					this.canvasShow = false
					// wx.switchTab({url:'/pages/main-page/main-page'})
				},
				
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
						let _t = this
            const wxGetImageInfo = this.promisify(uni.getImageInfo)
            Promise.all([
                    // 图片目前只随机找了几张图片，后期可自行替换
                    wxGetImageInfo({
                            src: _t.url01   // 背景图片
                    }),
                    wxGetImageInfo({
                            src: _t.url02   // 二维码图片，二维码图片如需要携带参数，可根据接口将需要扫码进入页面的路径+参数传入后端，后端可根据生产小程序二维码路径，将路径放入这里就ok了,<a href="https://www.jianshu.com/p/5f96a4f91b9c" target="_blank">可参考</a>
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
										ctx.fillText('--- ' + _t.nickName, 300 - 10, 150)
                    // 小程序码
                    const qrImgSize = 150
                    ctx.drawImage(res[1].path, 30, 280, qrImgSize, qrImgSize)
                    ctx.stroke()
                    // 绘图生成临时图片
                    console.log('res', res)
                    ctx.draw(false,() => {
                        _t.tempFileImage()
                    })
                    _t.canvasShow = true
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
				shouQuan(){								
						let _t = this
						wx.openSetting({
							success(settingdata) {
								if (settingdata.authSetting['scope.writePhotosAlbum']) {
									console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
									_t.tempFileImage()
									_t.ifShouQuan = false
								}else {
									console.log('获取权限失败，给出不给权限就无法正常使用的提示')
								}
							},
							fail: function (e) {
								//TODO
								console.log(e.errMsg)
							},
						}) 	
				},
        //保存
        savePic (filePath) {
						let _t = this
            console.log('filePath', filePath)
            uni.showLoading({
                    title: '正在保存'
            });
						_t.canvasText = '正在保存....'
						
            uni.saveImageToPhotosAlbum({
                    filePath: filePath,
                    success: function () {
											
											_t.canvasText = '图片已保存到相册，可分享给好友'
											
											uni.showToast({
												title: '图片保存成功～'
											});
                    },
                    fail: function (e) {
											//TODO
											if (e.errMsg == 'saveImageToPhotosAlbum:fail cancel'){
												_t.canvasText = '取消保存'
											}
											
											if (e.errMsg == 'saveImageToPhotosAlbum:fail auth deny'){
												_t.canvasText = '需要保存到相册的权限，请点击下面按钮进行授权'
												_t.ifShouQuan = true
											}
											
											console.log('失败情况：',e.errMsg)
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