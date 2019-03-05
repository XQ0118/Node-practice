var express = require('express');
var fs = require('fs');
var router = require('./router');
var bodyParser = require('body-parser');
var app = express();


app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//注意，配置模板引擎和 body-parser 一定要在app.use(router)之前 
//挂载路由之前 

//把路由容器挂载到app服务中
app.use(router);



app.listen(3000, function(){
	console.log('running...');
});




//2018.10.27 下午看到P70
