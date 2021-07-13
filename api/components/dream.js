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
	// 周公解梦
	db2 = db.collection('dream')
}

	// 添加
	function addApi(data){
		  return db2.add({
		    data
		  }).then(res=>{
				return res
		    console.log(res);
		  }).catch(err=>{
				return err
		    console.log(err)
			})
	}	
				
	// 修改
	function updateApi(obj){
		return  db2.where({
		  		...obj    
		  }).update({
		    data:{
		      age:100
		    }
		  }).then(res=>{
				return res
		    console.log(res);
		  }).catch(res=>{
				return err
		    console.log(res);
			})
	}				
	// 删除
	function deleteApi(obj){
		// 删除数据 
		for (var i = 0; i < 200; i++) {
			db2.where({
					...obj    
			}).remove().then(res => {
				console.log('remove',res.data)
			})
		}
	}		
	
	// date: "581年3月3日"
	// day: "3/3"
	// e_id: "3021"
	// title: "杨坚代周自立，隋朝开始"
	let list = []
	function getall(obj,resolve, reject,i = 0){
		
		db2.where({
			...obj    
		})
		.orderBy('date', 'desc')
		.skip(20*i)
		.get()
		.then(res=>{
			list.push(...res.data)
			if(res.data.length>=20){
				getall(obj,resolve, reject,i+1)
			}else{
				res.data = list
				resolve(res)
			}
		}).catch(err => {
			reject(err)
		})
	}
	
	// 读取
	function getApi(obj){
		list = []
		return new Promise(((resolve, reject) => {
				getall(obj,resolve, reject)
		}))
	}			

export default{
	updateApi,
	deleteApi,
	getApi,
	addApi,
}