
//为了目录结构清晰，吧所用HTML文件放在views目录下
//为了方便的统一处理静态资源，吧所有的静态资源存放在publi目录中


var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url');
var moment = require('moment');

var comments = [
	{
		name : 'Index',
		message : 'Hello text',
		dateTime : moment().format('YYYY-MM-DD HH:mm:ss')
	}
	
]

http.createServer(function (req, res) {
	//使用url.parse()方法将路径解析为一个方便操作的对象
	//第二个参数true表示可以直接将查询字符串转为一个对象
	//通过query属性来访问
	var parseObj = url.parse(req.url, true);
	var now = moment();
	//单独获取不包含查询字符串的路径部分(不包含?后内容)
	var pathname = parseObj.pathname;

	if(pathname === '/')
	{
		fs.readFile('./views/index.html', function(err, data) {
			if(err){
				return res.end('404 Not Found.');
			}
			var htmlStr = template.render(data.toString(), {
				comments : comments
			});
			res.end(htmlStr);
		});
	} 
	else if(pathname === '/post')
	{
		fs.readFile('./views/post.html', function(err, data){
			if(err){
				return res.end('404 Not Found.');
			}
			res.end(data); 	
		});
	}
	else if(pathname.indexOf('/public/') === 0) 
	{
		console.log(pathname);
		fs.readFile('.' + pathname, function(err, data){
			if(err){
				return res.end('404 Not Found.');
			}
			res.end(data);
		});
	}
	else if(pathname === '/addMeg')
	{
		//无论/addMeg?xxxx之后是什么，都不用担心，因为pathname
		//不包含?之后的路径
		//1.获取表单数据；2.生成日期到数据对象中，存储到数组
		//3.用户定向跳转到首页
		
		var comment = parseObj.query;
		comment.dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
		comments.unshift(comment);
		//服务端这时候已经存储好数据了

		//302临时重定向；301永久重定向

		res.statusCode = 302;
		res.setHeader('Location', '/');
		res.end();
	}
	else
	{
		//其他的都处理成404找不到页面
		fs.readFile('./views/404.html', function(err, data){
			if(err){
				return res.end('404 Not Found.');
			}
			res.end(data); 	
		});
	}

}).listen(3000, function(){
	console.log('running...');
});

//P33   2018.10.20周六
//完成一个node留言板
//下一次看P34

//P48   2018.10.24周3  晚
//完成一个node留言板
//下一次看P49