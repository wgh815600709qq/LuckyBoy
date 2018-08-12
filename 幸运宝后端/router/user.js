const express = require('express')
const router = express.Router()
var { success, fail } = require('../config/code-msg.js')
var { add, queryByOne, editByOne } = require('../module/auth.js')

// 用户信息入口可以是注册，也可以是修改
router.post('/enter', async (req, res, next) => {
    var data = req.body
    var isExist = await queryByOne({open_id: data.openId})
    var result
    if (isExist) { // update
        result = await editByOne({open_id: data.openId}, {
            _nickname: data.userInfo.nickName,
            _avatar: data.userInfo.avatarUrl
        })
    } else { // add
        result = await add({
            open_id: data.openId,
            _nickname: data.userInfo.nickName,
            _avatar: data.userInfo.avatarUrl
        })
    }
    res.send(Object.assign(success, {data: result}))
})

router.get('/getUserInfo', async (req, res) => {
    var result = await queryByOne({open_id: req.query.openId})
    if (result) {
        res.send(Object.assign({}, success, {data: result}))
    } else {
        res.send(fail)
    }
})

export default router
