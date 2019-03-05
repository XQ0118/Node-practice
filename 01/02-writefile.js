var fs = require('fs');
// 写文件
// 第一个参数是文件路径
// 第二个参数是文件内容
// 第三个参数 回调函数 error,成功，文件写入，error为null；失败，写入失败，error为错误对象
fs.writeFile('../notes/node-notes.md','> 测试node写文件',function(error) {
	// console.log('ok');

	//error为null时候表示写入成功，error有对象表示失败，error为null表示成功
	if(error) { 
		console.log("写入失败");
	}
	else {
		console.log("写入成功");
	}
})

// 视频P7