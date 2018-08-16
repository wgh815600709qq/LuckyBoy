const express = require('express')
const router = express.Router()
var { success, fail } = require('../config/code-msg.js')
var { queryAll, add, queryByOne, deleteByOne, updateById, setDefault } = require('../module/address.js')
// 增
router.post('/add', async (req, res, next) => {
    var result = await add(req.body)
    if (result.errmsg) {
        res.send(Object.assign({}, fail, { msg: result.errmsg }))
    } else {
        res.send(Object.assign({}, success, { data: result }))
    }
})

// 删 
router.post('/delete', async (req, res) => {
    var result = await deleteByOne(req.body)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 查全部地址
router.post('/queryAll', async (req, res) => {
    var result = await queryAll(req.body)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 查单个地址
router.post('/queryDetail', async (req, res) => {
    console.log('fuck')
    var result = await queryByOne(req.body)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 设置默认地址
router.post('/setDefault', async (req, res) => {
    var result = await setDefault(req.body)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})


// 修改
router.post('/update', async (req, res) => {
    console.log('fuck')
    var data = req.body
    var id = data.id
    delete data.id
    var result = await updateById(id, data)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

export default router
