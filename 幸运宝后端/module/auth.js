var { connection, Sequelize } = require('../database/connect.js')
const userModel = require('../schema/user.js')
var User = userModel(connection, Sequelize)
var request = require('sync-request')
const jwt = require('jsonwebtoken')
var { AppID, AppSecret, PublicKey } = require('../config/index.js')
const messageModel = require('../schema/message.js')
var Message = messageModel(connection, Sequelize)

// 根据openId查询用户
async function queryByOne(data) {
    let res = await User.findOne({
        where: data
    })
    return res
}

// 注册用户
async function add(data) {
    return connection.transaction(t => {
            // 注册
        return User.create(data, {transaction: t}).then(user => {
            return Message.create({
                _from: 3,
                _to: user.id,
                _message: '欢迎来到幸运宝，我是系统机器人，我将给您介绍积分规则。1、发布新文章审核通过可获得5积分;2、您的文章被选为精品区，可获得10积分;3、购买商品，根据价格多少获取积分多少'
            }, {transaction: t})
        })
    }).then(res => {
        return user
    }).catch(err => {
        return null
    })
}

// 修改用户信息
async function editByOne(query, data) {
    let res = await User.update(data, {
        where: query
    })
    return res
}

// 根据code获取openId
async function getOpenId(code) {
    var res = await request('GET', `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`)
    var data = res.getBody('utf8')
    return JSON.parse(data).openid
}

// 生成token
async function genToken(openId) {
    var token = jwt.sign({
        openId: openId
    }, PublicKey, {
        expiresIn: 7200 // 2h到期
    })
    return token
}

export {
    add,
    queryByOne,
    editByOne,
    getOpenId,
    genToken
}
