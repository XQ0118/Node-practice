var express = require('express');
var User = require('./models/user.js');
var md5 = require('blueimp-md5');

var router = express.Router();


router.get('/', function(req, res) {
    console.log(req.session.user);
    res.render('index.html', {
        user: req.session.user
    });
});

router.get('/login', function(req, res) {
    res.render('login.html');
});

router.post('/login', function(req, res) {
    //1.获取表单数据  2.查询数据库用户名密码是否正确 3.发送响应数据

    var body = req.body;

    User.findOne({

        email: body.email,
        password: md5(md5(body.password))

    }, function(err, user){
        if(err){
            return res.status(500).json({
                err_code: 500,
                message: err.message
            });
        }

        if(!user){
            return res.status(200).json({
                err_code: 1,
                message: 'email or password is invalid.'
            });
        }

        //用户存在，登录成功，用session记录登录状态
        req.session.user = user;

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        });
    });
});

router.get('/register', function(req, res) {
    res.render('register.html');
});

router.post('/register', function(req, res) {
    //获取表单提交的数据

    var body = req.body;
    User.findOne({
        $or: [{
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]

    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'server err.'
            });
        }
        console.log(data);
        console.log('ok');
        //data有说明email，nickname已经存在
        if (data) {
            return res.status(200).json({
                err_code: 1, //错误码 1 表示 已存在
                message: '邮箱或者昵称已存在.'
            });
        }

        //对密码进行哈希MD5加密
        body.password = md5(md5(body.password));
        //注册开始
        new User(body).save(function(err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500, //错误码 500 表示服务端错误
                    message: '服务端错误.'
                });
            }
            console.log("ok");

            //注册成功，使用session记录用户的登录状态
            req.session.user = user;

            return res.status(200).json({
                err_code: 0, //错误码 0 表示 ok
                message: 'ok.'
            });
        });
    });   
});

router.get('/logout', function(req, res){
    //退出 ->清除登录状态
    //req.session.user = null;
    //更严谨的删除方法
    delete req.session.user;
    //服务端重定向到登录页面 
    res.redirect('/login');
});



module.exports = router;