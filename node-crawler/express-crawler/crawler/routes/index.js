var express = require('express');
var router = express.Router();
var http = require('http');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.js->crawler' });
});

router.get('/getJobs', function(req, res, next){
	//浏览器端发来请求
	var page = req.param('page'); //获取get请求中的参数page
	console.log("page" + page);
	var Res = res; //保存res
    
    //目标网页
    var url = 'http://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=';

    http.get(url + page, function(res){
    	var chunks = [];
    	var size = 0;
    	res.on('data', function(chunk){ //监听事件传输
    		chunks.push(chunk);
    		size += chunk.length();
    	});

    	res.on('end', function(){ //数据传输完成
    		var data = Buffer.concat(chunks, size);
    		var html = data.toString();

    		var $ = cheerio.load(html); //cheerio模块开始DOM处理
    		var jobs = [];

    		var jobs_list = $(".item_con_list li");
    		$(".item_con_list > li").each(function(){
    			//对页面岗位栏信息进行处理  每个岗位对应一个 li  ,各标识符到页面进行分析得出
    			var job = [];
    			job.company = $(this).find(".list_item_top div").eq(1).find("a").html(); //公司名
  	            job.period = $(this).find(".list_item_top span").eq(1).html(); //阶段
                job.scale = $(this).find(".list_item_top span").eq(2).html(); //规模
    
                job.name = $(this).find(".hot_pos_l a").attr("title"); //岗位名
                job.src = $(this).find(".hot_pos_l a").attr("href"); //岗位链接
                job.city = $(this).find(".hot_pos_l .c9").html(); //岗位所在城市
                job.salary = $(this).find(".hot_pos_l span").eq(1).html(); //薪资
                job.exp = $(this).find(".hot_pos_l span").eq(2).html(); //岗位所需经验
                job.time = $(this).find(".hot_pos_l span").eq(5).html(); //发布时间

                console.log(job.name); //控制台输出岗位名
                jobs.push(job);
    		});

    		Res.json({ //返回json格式数据给浏览器
    			jobs: jobs
    		});
    	});
    });

});

module.exports = router;
