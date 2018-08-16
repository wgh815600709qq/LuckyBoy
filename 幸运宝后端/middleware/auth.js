/*
  Router-interceptor Middleware
*/
const jwt = require('jsonwebtoken')
var { PublicKey } = require('../config/index.js')
function Auth(req, res, next) {
    // 授权以后将在headers里面的cookie带上token=token，此处解密
    var cookie = req.headers.cookie
    if (cookie) {
        var token = cookie.match(/token=[^\s]+/)[0].replace('token=', '')
        jwt.verify(token, PublicKey, function(err, decoded) {
            if (!err) {
                next()
            } else {
                res.status(401).send({code: err.name, msg: err.message })
            }
        })
    } else {
        res.status(401).send({code: err.name, msg: err.message })
    }
}
module.exports = Auth
