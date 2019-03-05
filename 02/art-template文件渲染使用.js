//涌入art-template

var server = require('http');
var fs = require('fs');
var template = require('art-template');

var server = server.createServer();

// 存放路径
var tplRath = 'F:/test/project/www'; 

server.on('request', function (req, res) {
	var url = req.url;
	 
	fs.readFile('./tpl.html', function (err, data) {
		if(err){
			return res.end('404 Not Found.');
		}
		fs.readdir(tplRath, function (err, files) {
			if(err){
				return res.end('Can not find dir');
			}
			var htmlStr = template.render(data.toString(),{
				title:'操你妈'
			});

			res.end(htmlStr);
		});
	});
});

server.listen(3000, function () {
	console.log('runing');
});


//P33   2018.10.20周六
//完成一个node留言板
//下一次看P34
