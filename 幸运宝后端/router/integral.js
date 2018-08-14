const express = require('express')
const router = express.Router()
var { success, fail } = require('../config/code-msg.js')
var { queryByPageAndSort } = require('../module/integral.js')

// 获取积分记录 // pageSize pageNo id
router.post('/queryHistory', async (req, res) => {
    var data = req.body
    var result = await queryByPageAndSort(Object.assign(data, {sort: ['created_at', 'DESC']}))
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

export default router
