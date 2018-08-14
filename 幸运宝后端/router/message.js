const express = require('express')
const router = express.Router()
var { success, fail } = require('../config/code-msg.js')
var { queryAllByPage, queryDetail,queryUnread  } = require('../module/message.js')

router.get('/queryAllByPage', async (req, res, next) => {
    var data = req.query
    var result = await queryAllByPage(Object.assign(data, {data: {
        _to: data.id
    }, sort: [['_read', 'ASC'], ['created_at', 'DESC']]}))
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

router.post('/queryDetail', async (req, res, next) => {
    var result = await queryDetail(req.body)
    res.send(result)
})

router.post('/queryUnread', async (req, res, next) => {
    var result = await queryUnread(req.body)
    if (result != null) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})
export default router
