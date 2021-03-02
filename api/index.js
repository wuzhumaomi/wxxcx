// 文件夹里面的所有文件
const modulesFiles = require.context('./components', true, /\.js$/)

// 
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	// 名字
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	// 文件内容
	const value = modulesFiles(modulePath)
	
	modules[moduleName] = value.default
	return modules
}, {})

export default{
	...modules
}