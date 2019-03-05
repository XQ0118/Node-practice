const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

for(var i = 0; i < 100; i++){

	//实例化一个Cat
	const kitty = new Cat({ name: 'Zildjian' + i });

	//持久化保存Kitty实例
	kitty.save().then(() => console.log('meow'));
}


//下一次看P83-mongoose开始