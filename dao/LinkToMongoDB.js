const mongoose = require('mongoose');
const link = require('../config/keys')
mongoose.connect(link.mongodbLink,
    { useNewUrlParser: true })
    .then(() => { console.log('数据库已连接') })
    .catch((err) => { console.log(err) })