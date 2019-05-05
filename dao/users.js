const mongoose = require('mongoose');
//安装 moogodb驱动
const Schema = mongoose.Schema;

////Create Schema 创建模板(Schema)
// 姓名 ， 邮箱， 密码， 头像， data
const UserSchema = new Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type:String
    },
    date: {
        type: Date,
        default:Date.now
    },
    identity: {
        type: String,
        required: true
    }
});
//数据库中建立一个名字为users的表, 安照UserSchema的规则
module.exports = User = mongoose.model("users", UserSchema)