let db;
let db2;

import historyApi from './history.js'
import dreamApi from './dream.js'
import jokeApi from './joke.js'
import laohuangliApi from './laohuangli.js'

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
  
function setTimeData(date,i) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	h=h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	minute = minute < 10 ? ('0' + minute) : minute;
	var second=date.getSeconds();
	second=second < 10 ? ('0' + second) : second;
	if(i == 1){
		return m + '/' + d;
	}
	if(i == 2){
		m = m < 10 ? ('0' + m) : m;
		d = d < 10 ? ('0' + d) : d;
		return y + '-' + m + '-' + d;
	}
	return
}	
	
	let time = new Date()
	let time2 = setTimeData(time,1)
	
	function history(date){
		return new Promise((resolve, reject)=>{
			uni.request({
					url: 'https://v.juhe.cn/todayOnhistory/queryEvent.php?key=45ccf20dc4184a4d40acf697559471f2&date='+date,
					type:'get',
					success: (res) => {
						console.log(res.data.result);
						let list = res.data.result
						for (var i = 0; i < list.length; i++) {
							console.log('今日历史api', list[i].date,list[i].title);
							historyApi.addApi(list[i]).then(res=>{
								// console.log(res);
							})
						}
						resolve(res) 
					}
			});
		})
	}
	
	// 今天的历史事件
	function todayOnhistory (date = time2) {
		// 45ccf20dc4184a4d40acf697559471f2
		// https://www.apiopen.top/novelApi
		return new Promise((resolve, reject)=>{
			return historyApi.getApi({day:date}).then(res=>{
				if(res.data.length == 0){
					resolve(history(date)) 
				}else{
					resolve(res) 
				}
			}).catch()
		})

	}
	
	
	function dream(data) {
		// 周公解梦
		uni.request({
		    url: 'https://v.juhe.cn/dream/query?key=6514300cd714d4d60fa106d02ed0226d&q='+data,
				type:'get',
		    success: (res) => {
					if(res?.data){
						console.log('周公解梦api',res.data.result);
						let list = res.data.result
						for (let item of res.data.result) {
							dreamApi.addApi(item).then(res=>{
							}).catch()
						}
					}
		    }
		});
	}
	
	function getDream(text) {
		// 周公解梦
		return new Promise(function(resolve, reject) {
			dreamApi.getApi({
					title:{
						$regex:'.*'+text+'.*',
						$options:'i'
					},
				}).then(res=>{
					if(res.data.length >= 0){
						resolve(res)
					}else{
						resolve(res)
					}
			}).catch()
		})
		
	}
	
	// 周公解梦
	function dreamQuery (data = '白') {
		return new Promise(function(resolve, reject) {
        uni.request({
            url: 'https://v.juhe.cn/dream/query?key=6514300cd714d4d60fa106d02ed0226d&q='+data,
        		type:'get',
            success: (res) => {
							
        			if(res?.data && res.data.result?.length >= 0){
        				console.log('周公解梦api',res.data.result);
        				
        				let list = res.data.result
        				for (let item of res.data.result) {
        					console.log(item);
        					dreamApi.getApi({
        							id:item.id,
        						}).then(res=>{
        							if(res.data.length == 0){
        								dreamApi.addApi(item).then(res=>{
        								}).catch()
        							}
        					}).catch()
        				}
        				
        				resolve(res) 
        			}else{
        				resolve(getDream(data))  
        			}
            }
        });
    });
		
		
	}
	
	function laohuangli(date) {
		return new Promise((resolve, reject)=>{
			uni.request({
					url: `https://v.juhe.cn/laohuangli/d?date=${date}&key=87973f93871b0677731d2d1e747fa7b8`, 
					type:'get',
					success: (res) => {
						 
						console.log('今日黄历api',res.data.result);
						let list = res.data.result
						if(res.data?.result){
							laohuangliApi.addApi(res.data?.result).then(res=>{
							}).catch()
						}
						resolve(res)
						
					}
			});
		})
	}
	
	// 老黄历
	function laohuangliD (date) {
		// 87973f93871b0677731d2d1e747fa7b8
		// https://v.juhe.cn/laohuangli/d?date=2014-09-11&key=您申请的KEY
		if(date){
			date = setTimeData(date,2)
		}else{
			date = setTimeData(time,2)
		}
		return new Promise((resolve, reject)=>{
			
			laohuangliApi.getApi({
				yangli:date
			}).then(res=>{
				 
				if (res?.data.length == 0 ) {
					resolve(laohuangli(date)) 
				}else{
					resolve(res)
				}
			}).catch()
			
		})
		// laohuangli(date)
	}
	
	function joke(data) {
		// 笑话大全
		jokeApi.getApi({
			hashId:data.hashId
		}).then(res=>{
			if(res.data.length == 0){
				jokeApi.addApi(data).then(res=>{
				}).catch()
			}
		}).catch()
		
	}
	
	// 笑话大全
	function jokeRandJoke () {
		// 笑话大全
		return new Promise((resolve, reject)=>{
			uni.request({
					url: 'https://v.juhe.cn/joke/randJoke.php?key=94336aec818fe1a8535ff2eb7faacda2',
					type:'get',
					success: (res) => {
						console.log('笑话大全api',res.data.result);
						if(res?.data && res.data?.result.length > 0){
							resolve(res.data.result) 
							let list = res.data.result
							for (var i = 0; i < list?.length; i++) {
								joke(list[i])
								// console.log(list[i].content);
							}
						}else{
						 return	jokeApi.getApi({
							}).then(res=>{
								resolve(res) 
							}).catch()
						}
					}
			});
			
		})
			
		
	}

export default{
	todayOnhistory,
	laohuangliD,
	dreamQuery,
	jokeRandJoke,
}