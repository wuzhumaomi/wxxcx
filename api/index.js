let db;
let db2;

if(!wx.cloud){
	console.error('请使用 2.2.3 或以上的基础库以使用云能力')
}else{
	wx.cloud.init({
		traceUser:true,
		// env:'' //写自己配置的后台环境
	})
	
	db = wx.cloud.database()
	db2 = db.collection('user')
}

// 添加
function addApi(){
	
}				
// 修改
function updateApi(){
	
}				
// 删除
function deleteApi(){
	// 删除数据 
	for (var i = 0; i < 200; i++) {
		db2.where({
			cc:null
		}).remove().then(res => {
			console.log('remove',res.data)
		})
	}
}		
// 读取
function getApi(obj){
	return new Promise(((resolve, reject) => {
			return db2.where({
				...obj    
			}).get()
			.then(res=>{
				resolve(res)
			}).catch(err => {
				reject(err)
			})
	}))
}			

export default{
	updateApi,
	deleteApi,
	getApi,
	addApi,
}