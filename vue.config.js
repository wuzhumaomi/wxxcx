// 官方文档 https://nodejs.org/api/path.html#path_path_join_paths
const path = require('path')
// 官方文档 https://www.webpackjs.com/plugins/copy-webpack-plugin/
const CopyWebpackPlugin = require('copy-webpack-plugin')
 
module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          // from 为要打包的文件
          // to 为输出（复制）到哪
          // cloudfunctions 为存放云函数对应文件夹
          from: path.join(__dirname, 'cloudfunctions'),
          to: path.join(__dirname, 'unpackage/dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'cloudfunctions')
        }
      ])
    ]
  }
}
