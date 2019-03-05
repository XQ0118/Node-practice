var express = require('express');
var path = require('path');
var artTemplate=require('art-template');
var bodyParser = require('body-parser');
var router = require('./router');
var session = require('express-session');

var app = express();

// app.use('/public/', express.static('/public/'));
// app.use('/node_modules/', express.static('/node_modules/'));

//开放public目录资源
app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));

//配置使用art-template 模版引擎
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'));

//配置解析表单 POST 请求体插件一定要在 app.use(router); 之前
app.use(bodyParser.urlencoded({ extended: false}));
//
app.use(bodyParser.json()); 

//第三方中间件express-session 来处理
//配置session
app.use(session({
	secret: 'keyboard blog', //配置加密字符串
	resave: false,
	saveUninitialized: false  //true默认分配钥匙，false使用session才分配钥匙
}));

//把路由挂载到APP中
app.use(router);

app.listen(3000, function(){
	console.log('running...');
});   

// 下一次看P114