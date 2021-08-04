// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
 
// 云函数入口函数
exports.main = async (event, context) => {
	
	// return new Promise((resolve, reject) => {
		// 在 3 秒后返回结果给调用方（小程序 / 其他云函数）
		db.collection('user_subscribe')
		.where({
			status:1
		})
		.get().then(async (res) => {
			
			for (let item of res.data) {
				
					// console.log(event)
					const result = await cloud.openapi.subscribeMessage.send({
						"touser": item._openid,
						"page": "pages/map-page/map-page",
						"lang": 'zh_CN',
						"data": item.subMsg,
						"templateId": item.templateId,
						"miniprogramState": 'developer'
					})
					
					if(result.errCode == 0){
						db.collection('user_subscribe').where({
							_id:item._id
						}).update({
							// data 传入需要局部更新的数据
							data: {
								// 表示将 done 字段置为 true
								status: 0
							},
							success: function(res) {
								console.log("改",res.data)
							}
						})
					}
			}
			
				// resolve(res)
				// console.log(res.data);
		})
		
		
		// return result
	// })
	
}