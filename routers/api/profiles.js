//登录注册
const express = require('express');
const router = express.Router();
const Profile = require('../../dao/profile');
const passport = require('passport');


//添加新的条目
// passport.authenticate("jwt", { session: false }) 
// 会先拦截请求数据
// 再按照 'passport - jwt' 写的JwtStrategy进行验证
//来判断是否执行下一步 如果passport是done(null,user) 箭头函数执行, 否则不执行
router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
    
    const profileField = { type, describe, income, expend, cash, remark, identity } = req.body;
    new Profile(profileField).save().then((Profiles) => {
        res.json(Profiles)
    }).catch(err => {
        console.log(err)
    })

})

//获取全部
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容")
            }
            res.json(profile)
        }).catch(err => res.status(404).json("没有任何内容"))

})
//获取某一个
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容")
            }
            res.json(profile)
        }).catch(err => res.status(404).json("没有任何内容"))

})
//编辑
router.post('/edit/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileField = { type, describe, income, expend, cash, remark, identity } = req.body;
    Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileField }, { new: true })
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json("编辑失败"))

})

router.delete('/delete/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
        .then(profile => {
            profile.save().then(profile=>res.json(profile))
        })
        .catch(err => res.status(404).json("删除失败"))

})





module.exports = router;