var { connection, Sequelize } = require('../database/connect.js')
const userModel = require('../schema/user.js')
var User = userModel(connection, Sequelize)
var request = require('sync-request')
const jwt = require('jsonwebtoken')
var { AppID, AppSecret, PublicKey } = require('../config/index.js')

// 根据openId查询用户
async function queryByOne(data) {
    let res = await User.findOne({
        where: data
    })
    return res
}

// 注册用户
async function add(data) {
    let res = await User.create(data)
    return res
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
