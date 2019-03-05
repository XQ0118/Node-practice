var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//连接数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log('Connection Error:' + err)
    }
     else {
        console.log('Connection success!')
    }
});

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
        //这里now()不加（），这里调用方法，避免数据库写死
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.jpg'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: { //状态
        type: Number,
        //0 无限制
        //1 不可以评论
        //2 不可以登录使用
        enum: [0, 1, 2],
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);