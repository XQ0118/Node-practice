var foo = 'Hi';
console.log(foo);


console.log("hello world");
// 三秒后显示
setTimeout(()=>{
	console.log("3 seconds have passed");
},2000);
//每个两秒循环输出
var time = 0;
var timer = setInterval(function () {
	time += 2;
	console.log(time + " seconds have passed");
	if(time > 6) {
		clearInterval(timer);
	}
},2000);

