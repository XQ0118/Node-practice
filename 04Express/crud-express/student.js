/*
student.js
数据操作文件
只处理数据不关心业务，
*/
var fs = require('fs'); 
var dbPath = './db.json';

//获取所有学生列表
exports.find = function (callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if(err){
			return callback(err);
		}
		callback(null, JSON.parse(data).students);
	}); 
}

exports.findById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if(err){
			return callback(err);
		}
		var students = JSON.parse(data).students;
		var ret = students.find(function (item) {
			return item.id === parseInt(id);
		});
		callback(null, ret);
	}); 
}

//添加保存学生
exports.save = function(student, callback){
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if(err){
			return callback(err);
		}
		var students = JSON.parse(data).students;

		//处理id唯一不重复
		student.id = students[students.length - 1].id + 1;

		students.push(student);

		//把数据对象转换为字符串
		var fileData = JSON.stringify({
			students: students
		});

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		});
	}); 
}

//更新学生
exports.updateById = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if(err){
			return callback(err);
		}
		var students = JSON.parse(data).students;

		//注意，这里必须把 id 统一转换为数字类型
		student.id = parseInt(student.id);

		// ecmascript6的数组方法find
		var stuRet = students.find(function (item) {
			return item.id === student.id;
		});
		
		for(var key in student){
			stuRet[key] = student[key];
		}

		//把数据对象转换为字符串
		var fileData = JSON.stringify({
			students: students
		});

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		});
	});	
}

//删除学生
exports.deleteById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if(err){
			return callback(err);
		}
		var students = JSON.parse(data).students;

		//findIndex方法专门用来根据条件查找元素的下标
		var deleteId = students.findIndex(function (item) {
			return item.id === parseInt(id);
		});

		//根据下标从数组中删除对应的学生对象
		students.splice(deleteId, 1);

		//把数据对象转换为字符串
		var fileData = JSON.stringify({
			students: students
		});

		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		});
	});
}