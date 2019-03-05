var fs = require('fs');



//常见promise容器，给别人一个承诺;容器内部是异步函数;它本身不是异步的
var p1 = new Promise(function (resolve, reject) {


	fs.readFile('./data/a.txt', 'utf8', function(err, data){
		if(err){
			//console.log(err);
			//把容器的pending状态变为reject
			reject(err);
		}
		else{
			//console.log(data); 
			resolve(data);
		}
	});
});

//then方法接收的function就是容器中的resolve函数
//参数2 ，就是reject函数
p1.then(function(data){
	console.log(data);
}, function(err){
	console.log('failed.',err);
});