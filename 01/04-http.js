//使用node构建一个web服务器
//在node中专门提供了一个核心模块：http，负责创建编写服务器

//1.加载http核心模块
var http = require('http');

//2.使用http.createServer()方法创建一个web服务器
//  返回一个server 实例
var server = http.createServer();

 
server.on('request',function (request,response) {
	

	
		// 在服务器端默认发送的数据是utf-8编码内容，但是浏览器不知道utf-8编码内容
		// 服务器在不知道的情况下会按照当前操作系统的默认编码去解析
		// 中文操作系统默认是 gbk 编码
		// 解决 正确告诉浏览器发送的编码
 		// 响应内容只能是二进制数据或者字符串

		// 在http协议中Content-Type 用来告知发送的数据类型
		// response.setHeader('Content-Type','text/plain; charset=utf-8');
		// response.end('hello 世界');
	var url = request.url;
	if(url === '/plain') {
		response.setHeader('Content-Type','text/plain; charset=utf-8');
		response.end('hello 世界');
	}else if(url === '/html') {
		response.end('<h1>Hello HTML</h1>')
	}

	
})

//4.绑定端口号，启动服务器
server.listen(3000,function() {
	console.log("Server is Running...");
});

// 本次看到P16 15:00左右