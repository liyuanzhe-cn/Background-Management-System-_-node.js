const mongoose = require('mongoose');
//安装 moogodb驱动
const Schema = mongoose.Schema;

////Create Schema 创建模板(Schema)
// 姓名 ， 邮箱， 密码， 头像， data
const ProfileSchema = new Schema({
    // type: {
    //     type: String,
    // },
    describe: {
        type: String,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
//数据库中建立一个名字为users的表, 安照UserSchema的规则
module.exports = Profile = mongoose.model("profile", ProfileSchema)