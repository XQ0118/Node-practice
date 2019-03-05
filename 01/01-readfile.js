// 浏览器中的JavaScript没有文件操作的能力，
// node中的JavaScript具有文件操作的能力(node面向服务端)

// fs 是file-system 简写，就是文件系统的意思
// 在node中如果要进行文件操作，要引入fs核心模块
// 在fs中提供了所有文件操作的API
// 例如：fs.readFile 就是读取文件

// 1.使用require 方法加载fs模块
var fs = require('fs');
// 2.读取文件
// 第一个参数是文件路径
// 第二个参数是回调函数，error，data
fs.readFile('../notes/node-notes.md',function (error,data) {
	// 默认文件是二进制数据
	// 通过 toString 方法转换为我们认识的字符
	//console.log(data);
	// console.log(data.toString());

	//通过判断error来判断是否有错误发生
	if(error) {
		console.log("读取文件失败");
	}
	else {
		console.log(data.toString());
	}
})