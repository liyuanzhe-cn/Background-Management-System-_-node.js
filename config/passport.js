/*
passport有策略(strategy)的概念. strategy是少量预约义的方法,
它们会在请求抵达真正的路由之前执行.假如你定义的strategy认定某个请求非法,
则该路由不会被执行, 而是返回401 Unauthorized.
*/
const JwtStrategy = require('passport-jwt').Strategy;
//
const ExtractJwt = require('passport-jwt').ExtractJwt;
//引入数据库操作接口
const mongoose = require('mongoose');
const User = mongoose.model('users');

// 环境变量中的key
const { secretOrKey } = require('../config/keys');

var opts = {}
// 定义从请求头的Authrization获取token数据
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// 存入环境变量的混淆密码
opts.secretOrKey = secretOrKey;

module.exports = passport => {
    var jwtConfig = new JwtStrategy(opts, (jwt_payload, done) => {
        // jwt_payload 解析好的 token字符串，
        // done 验证用的函数 function verified (){} 
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, user)
            }).catch(err => {
                console.log(err)
            })
    })
    passport.use(jwtConfig);
}

// passport的配置文件， 在passort初始化好之后，使用在passport中
//
// JwtStrategy {
// name: 'jwt',
// _secretOrKeyProvider: [Function],
// _verify: [Function],
// _jwtFromRequest: [Function],
// _passReqToCallback: undefined,
// _verifOpts:
// {
// audience: undefined,
// issuer: undefined,
// algorithms: undefined,
// ignoreExpiration: false
//     }
// }

//输出到主文件中 ， 作为passport调用的中间件