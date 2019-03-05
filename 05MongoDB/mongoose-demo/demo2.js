var mongoose = require('mongoose');

//Schema就是模型概要的意思 >>理解为结构
var Schema = mongoose.Schema;

//1.连接数据库>>制定连接的数据库不用存在，插入第一条数据自动创建
mongoose.connect('mongodb://localhost/itcast');

//2.设计集合结构（表结构—）
//约束数据
// var blogSchema = new Schema({
// 	title: String,
// 	authot: String,
// 	body: String,
// 	comments: [{ body: String, date: Date}],
// 	date :{ type: Date, default: Date.now},
// 	hidden : Boolean,
// 	meta: {
// 		votes: Number,
// 		favs: Number
// 	}
// });

var userSchema = new Schema({
	username: {
		type: String,
		required: true  //必须有
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type:String
	}
});

//3.将文档结构发布为模型  数据库名称，架构Schema  =>返回值：模型构造函数
var User = mongoose.model('User', userSchema);

//4.使用模型构造函数，对users集合中的数据来操作

/********新增数据********/

// var admin = new User({
// 	username: 'xq',
// 	password: '123456',
// 	email: 'admin@admin.com'
// });

// admin.save(function (err, ret) {
// 	if(err){
// 		console.log('insert failed.');
// 	}
// 	else{
// 		console.log('insert success.');
// 		console.log(ret);
// 	}
// });

/********查询数据********/

User.find(function(err, ret){   //查询所有
	if(err){
 		console.log('find failed.');
 	}
 	else{
 		console.log('find success.');
 		console.log(ret);
 	}
});  

// User.findOne({
// 	username: 'xq',
// 	password: '123456'
// }, function(err, ret){
// 	if(err){
//  		console.log('find failed.');
//  	}
//  	else{
//  		console.log('find success.');
//  		console.log(ret);
//  	}
//  });

//find =>返回一个数组 / findOne =>返回一个对象




/********删除数据********/

// User.remove({
// 	username: 'xq'
// }, function(err, ret){
// 	if(err){
//  		console.log('delete failed.');
//  	}
//  	else{
//  		console.log('delete success.');
//  		console.log(ret);
//  	}
// });


/********更新数据********/

// User.findByIdAndUpdate('5bdfb7e16004c02c2c474351', {
// 	password:'666666'
// }, function(err, ret){
// 	if(err){
// 		console.log('update failed.');
// 	}else{
// 		console.log('update success.');
// 		console.log(ret);
// 	}
// });



