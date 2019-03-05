var express = require('express');
var moment = require('moment');

var comments = [
	{
		name : 'Index',
		message : 'Hello text',
		dateTime : moment().format('YYYY-MM-DD HH:mm:ss')
	}
	
]
var app = express();

app.engine('html',require('express-art-template'));

app.use('/public/', express.static('./public/'));


app.get('/', function (req, res) {
	res.render('index.html', {
		comments:comments
	})
});
app.get('/post', function (req, res) {
	res.render('post.html')
});
app.get('/addMeg', function (req, res) {
	console.log(req.query);
	var comment = req.query;
	comment.dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
	comments.unshift(comment);
	// res.statusCode = 302;
	// res.setHeader('Location','/');
	res.redirect('/');
});


app.listen(3000,function(){
	console.log('express app is running...');
});

//2018.10.25 看到P57