//使用node构建一个web服务器
//在node中专门提供了一个核心模块：http，负责创建编写服务器

//1.加载http核心模块
var http = require('http');

//2.使用http.createServer()方法创建一个web服务器
//  返回一个server 实例
var server = http.createServer();

//3.提供服务：对数据的服务
// 发请求
// 接收请求
// 处理请求
// 给个反馈(发送响应)

//注册request 请求事件
//客户端发送请求过来，会自动触发服务器的request请求事件，然后执行第二个参数，回调处理函数
//request请求事件处理函数，需要两个参数
// request 请求对象
// 		请求对象可以获得客户端的一些请求信息
// response 响应对象
// 		响应对象可以用来给客户端发送响应消息
server.on('request',function (request,response) {
	console.log("收到客户端请求,请求路径是：" + request.url);
	console.log("请求我的客户端的端口号：",request.socket.remotePort);
	console.log("请求我的客户端的IP：",request.socket.remoteAddress);
	//response对象有一个方法 write 可以用来给客户端发送响应数据
	//write 可以使用多次，但最后要使用end来结束响应 ，否则客户端会一直等待
	// response.write('hello');
	// //结束
	// response.end();
	// response.end("hello nodejs");
	var url = request.url;
	if(url === '/') {
		// /通常表示首页
		response.end("index page");
	} else if(url === '/login') {
		response.end('login page');
	} else if(url === '/products') {
		var products = [
			{
				name:'iphone X',
				price:8888
			},
			{
				name:'huawei p20',
				price:6666
			},
			{
				name:'小米8 ',
				price:2699
			}
		]
		// 在服务器端默认发送的数据是utf-8编码内容，但是浏览器不知道utf-8编码内容
		// 服务器在不知道的情况下会按照当前操作系统的默认编码去解析
		// 中文操作系统默认是 gbk 编码
		// 解决 正确告诉浏览器发送的编码
 		// 响应内容只能是二进制数据或者字符串

		response.end(JSON.stringify(products));
		response.setHeader('Content-Type','text/plain; charset = utf-8');
		//JSON.stringify(products) 数组转换成字符串
	}
	else {
		response.end('404 Not Found');
	}
})

//4.绑定端口号，启动服务器
server.listen(3000,function() {
	console.log("服务器启动成功，可以通过localhost/http://127.0.0.1:3000/ 来启动");
});

// 下一次视频看P15