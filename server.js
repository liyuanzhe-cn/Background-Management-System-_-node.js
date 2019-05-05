const express = require('express');
const server = express();
//数据中间件
const bodyParser = require('body-parser');
//加密解析插件
const passport = require('passport');
//交互接口
const users = require('./routers/api/users');
const profiles = require('./routers/api/profiles')

//链接mongoDB
require('./dao/LinkToMongoDB');

//数据解析中间件
server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

//初始化 passport 中间件
// passport中引入配置文件（json）
server.use(passport.initialize());
require('./config/passport')(passport);

//交互路由接口
server.use('/api/users', users);
server.use('/api/profiles', profiles);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`服务器已经开启，端口号为${port}`);
})

// 静态资源目录
server.use(express.static('./client'));