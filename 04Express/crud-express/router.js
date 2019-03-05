var fs = require('fs');

var express = require('express');
var Student = require('./student.js');


//express提供一种更好的封装方式,专门包装路由
var router = express.Router();

router.get('/students', function (req, res) {

	Student.find(function (err, students) {
		if(err){
			return res.status(500).send('Server err');
		}
		//从文件中读入数据一定是字符串要手动转换为对象
		//var student = JSON.parse(data).students;
		res.render('index.html', {
		fruits: [
	 		'苹果',
	 		'葡萄',
	 		'桃子',
	 		'香蕉'
	 	],
	 	students: students
	 	});
	});
});

router.get('/students/new', function (req, res) {
	//render方法默认在views中找到html文件
	res.render('new.html');
	
});

router.post('/students/new', function (req, res) {
	//1.获取表单数据2.处理3.发送请求 
	Student.save(req.body, function (err) {
		if (err) {
			return res.status(500).send('Server err');
		}
		res.redirect('/students');
	})
});

router.get('/students/edit', function (req, res) {
	//1.在客户端的列表页面处理连接问题（需要id参数
	//2.获取要编辑学生的id => 渲染页面
	Student.findById(parseInt(req.query.id), function (err, student) {
		if (err) {
			return res.status(500).send('Server err.');
		}
		res.render('edit.html', {
			student:student
		});
	});
	
});

router.post('/students/edit', function (req, res) {
	 Student.updateById(req.body, function (err) {
	 	if (err) {
	 		return res.status(500).send('Server err.');
	 	}
	 	res.redirect('/students');
	 });
	
});

router.get('/students/delete', function (req, res) {
	
	Student.deleteById(req.query.id, function (err) {
		if(err){
			return res.status(500).send('Server err.');
		}
		res.redirect('/students');
	});
});

//把router导出
module.exports = router;

 
// module.exports = function(app){

// 	app.get('/', function (req, res) {
// 	//data.toString()也可以
// 	fs.readFile('./db.json', 'utf8', function(err, data){
// 		if(err){
// 			return res.status(500).send('server err');
// 		}
// 		//从文件中读入数据一定是字符串要手动转换为对象
// 		var student = JSON.parse(data).students;
// 		res.render('index.html', {
// 		fruits: [
// 			'苹果',
// 			'葡萄',
// 			'桃子',
// 			'香蕉'
// 		],
// 		students: student
// 	});
// 	});
	
// });

// app.get('/students', function (req, res) {
	
	
// });
// app.get('/students/new', function (req, res) {
	
	
// });
// app.get('/', function (req, res) {
	
	
// });
// app.get('/', function (req, res) {
	
	
// });
// app.get('/', function (req, res) {
	
	
// });

// }


