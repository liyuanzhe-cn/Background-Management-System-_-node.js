//登录注册路由接口
const express = require('express');

//引入express路由
const router = express.Router();

//数据库操作接口
const User = require('../../dao/users');

//转MD5加密
const bcrypt = require('bcrypt');

// wordpress头像插件
const gravatar = require('gravatar');

// jsonwebtoken 用于加密
const jwt = require('jsonwebtoken');

//passport-jwt和passport验证token
const passport = require('passport');

// 环境变量中用于混淆token加密的字符串
const secretOrKey = require("../../config/keys").secretOrKey;

//注册接口
router.post('/register', (req, res) => {
    //查询数据库中是否有该邮箱
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .then((user) => {
            // findone方法如果可以查到的话，会返回这个json对象，查不到的话，会返回null
            console.log(user)
            if (user) {
                return res.status(400).json({ email: "邮箱已被注册" })
            } else {
                //gravatar.url(gravatar注册账号, { s: 尺寸, r: 格式, d: 'mm'是默认无样式头像 });
                var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })

                //bcrypt 的加密接口转为md5
                bcrypt.genSalt(10, (err, salt) => {
                    //salt 是一串加密字符串 会成为密码前面的一段
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        //没有问题给密码赋值
                        newUser.password = hash;
                        //密码md5处理过之后存入到数据库中
                        newUser.save()
                            .then((user) => res.json(user))
                            .catch(err => console.log(err))
                    });
                });

            }
        })
})

//登录接口 
router.post('/login', (req, res) => {
    //获取登陆者的邮箱和密码
    let { email, password } = req.body;
    console.log(req.body)

    //查询数据库中是否有该邮箱
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(404).json('用户不存在')
            } else {
                // bcrypt.compare(待加密文件,数据库中的现有密码) 
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // jwt.sign('规则'， "加密名字"， "过期时间 秒"， 回调函数)
                            // passport-jwt 目的是把用户的 如id 和 name + 过期时间转为 一串字符串 
                            // 下次用户登录的时候在验证这个字符串来判断是哪个用户，token是否过期
                            // 除了rules之外的信息，还含有 生效时间（毫秒） 和token 的失效时间
            
                            const rules = { id: user.id, name: user.name, avatar: user.avatar, identity: user.identity };

                            jwt.sign(rules, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                if (err) throw err;
                                // 加密成功，给前端返回成功的json
                                res.json({
                                    success: true,
                                    token: "Bearer " + token /*根据插件作者的要求， 这里一定要写 Bearer空格*/
                                })
                            });
                            // jwt.sign(rules, 加密的时候用于混淆的字符串, { expiresIn: 3600 },回调函数（失败，token））
                            //加密的时候用于混淆的字符串 za
                        } else {
                            res.status(400).json('用户名或密码错误')
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }).catch((err) => {
            console.log(err)
        })
})


// token解析： passport.authenticate("加密算法类型", {session:false}， )
//passport.authenticate("jwt", { session: false }) 
//来判断是否执行下一步 如果passport是done(null,user) 箭头函数执行, 否则不执行
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        name: req.user.name,
        id: req.user.id,
        email: req.user.email,
        identity: req.url.identity
    });
})

// 或者使用 jsonwebtoken 解密
// jwt.verify(token, secret, function (err, decoded) {
//      if (!err) {
//          console.log(decoded.name);  //会输出123，如果过了60秒，则有错误。
//      }
// })

module.exports = router;
