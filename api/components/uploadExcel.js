// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// const nodeExcel = require('excel-export');
// const path = require('path'); 
// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
// 	console.log('进入');
//   var tableMap = {
//     styleXmlFile:path.join(__dirname,"styles.xml"),
//     name: Date.now()+"-export",
//     cols: [],
//     rows: [],
//   }
//   var tableHead = ["编号", "名称", "生日", "年龄"];
//   //添加表头
//   for(var i=0;i<tableHead.length;i++){
//     tableMap.cols[tableMap.cols.length]={
//       caption:tableHead[i],
//       type:'string'
//     }
//   }
//   //表体：伪数据
//   const tableList = [
//     {编号:0,名称:'张三',生日:'2019-5-1',年龄:20},
//     {编号:1,名称:'李四',生日:'2019-5-1',年龄:45}
//   ]
//   //添加每一行数据
//   for(var i=0;i<tableList.length;i++){
//     tableMap.rows[tableMap.rows.length]=[
//       tableList[i].编号,
//       tableList[i].名称,
//       tableList[i].生日,
//       tableList[i].年龄
//     ]
//   }

// 	  console.log('数据初始化');
//   //保存excelResult到相应位置
//   var excelResult = nodeExcel.execute(tableMap);
//   var filePath = "outputExcels";
//   var fileName = cloud.getWXContext().OPENID + "-" + Date.now()/1000 + '.xlsx';
//   //图片上传到云存储
//   return await cloud.uploadFile({
//     cloudPath: path.join(filePath, fileName),
//     fileContent: new Buffer(excelResult,'binary')
//   }).then(res=>{
//     console.log(res);
//     console.log(res.fileID);
//     return res;
//   }).catch(err=>{

//   });
// }