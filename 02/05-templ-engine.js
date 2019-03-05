//在node中使用模板引擎
//art-template---js模板引擎 可以在node中使用

//在node中 如下

var template = require('art-template');
var fs = require('fs');
// template.render('模板字符串',{替换对象});

var tplStr = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Document</title>
			</head>
			<body>
				<p>Hello {{ name }}</p>
				<p>我今年 {{ age }}</p>
				<p>我来自 {{ pro }}</p>
				<h1>我喜欢 {{ each hobbies }} {{ $value }} {{/each}}</h1>
			</body>
			</html>
		`;

fs.readFile('./tpl.html', function (err, data) {
	if(err){
		console.log('读取文件失败');
	}
	// data默认是二进制数据
	// render是接受字符串的，所以要把data二进制数据转为字符串
	var ret = template.render(data.toString(),{
	name: 'Jack',
	age: 20,
	pro: '四川省',
	hobbies: [
		'q',
		's',
		'w'
	]
	});

	console.log(ret);
});

