//加载http核心模块
//Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询

var http = require('http');
var cheerio = require('cheerio');

//定义爬虫目标网站
var url = "http://www.ziroom.com/";

http.get(url, function (res) {
	var html = '';
	//获取页面数据
	res.on('data', function(data){
		html += data;
	});

	//数据获取结束
	res.on('end', function () {
		// 通过过滤页面信息获取实际需要求的轮播图信息
		var slideListData = filterSlideList(html);
		
		//打印信息
		printInfo(slideListData);
		//保存信息
		save(slideListData);
	});
}).on('error', function () {
	console.log('获取信息失败.');
});

//过滤页面信息
function filterSlideList(html) {
	if(html){
		//用JQuery风格，定义$
		var $ = cheerio.load(html);
		//根据id获取轮播图列表信息
		var slideList = $('#foucsSlideList');
		//轮播图数据
		var slideListData = [];

		//遍历轮播图信息
		slideList.find('li').each(function(item) {
			var pic = $(this);
			//找到a标签的href属性
			var pic_href = pic.find('a').attr('href');
			//找到a标签的子标签img获取src
			var pic_src = pic.find('a').children('img').attr('_src');
			//找到a标签的子标签img获取alt
			var pic_msg = pic.find('a').children('img').attr('alt');

			//向数组插入数据
			slideListData.push({
				pic_href: pic_href,
				pic_msg: pic_msg,
				pic_src: pic_src
			});
		});
		//返回轮播图列表信息
		return slideListData;
	} else {
		console.log('无数据传入.');
	}
}

//打印数据信息
function printInfo(slideListData) {
	//计数
	var count = 0;
	//遍历信息列表
	slideListData.forEach(function(item) {
		//获取图片
		var pic_src = item.pic_src;
		// 获取图片对应的链接地址
        var pic_href = item.pic_href;
        // 获取图片信息
        var pic_msg = item.pic_msg;

        //打印信息
        console.log('The' + (++count) + 'slide pic');
        console.log(pic_msg);
        console.log(pic_href);
        console.log(pic_src);
        console.log('\n');
	});
}

function save(slideListData) {

	fs.writeFile('/data.json', JSON.stringify(slideListData), 'utf-8', function(err){
		if(err){
			console.log('failed...');
		}else{
			console.log('success...');
		}
	})
}