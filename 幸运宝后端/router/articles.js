import { queryByOne } from '../module/articles.js';
const express = require('express')
const router = express.Router()
var { success, fail } = require('../config/code-msg.js')
var { add, queryByPageAndSort, allow } = require('../module/articles.js')

// 新增文章
router.post('/add', async (req, res, next) => {
    var data = req.body
    data.praise_num = 0
    data.comment_num = 0
    data._status = 0
    data.area_id = 0
    var result = await add(data)
    res.send(result)
})

// 查询未审核文章(排序)
router.post('/queryUnaudited', async (req, res, next) => {
    var data = req.body
    var result = await queryByPageAndSort(Object.assign(data, {data: {
        _status: 0 // 未审核
    }, sort: ['created_at', 'DESC']}))
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 查询文章详情
router.post('/queryDetail', async (req, res) => {
    var data = req.body
    var result = await queryByOne(data)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 文章审核通过
router.post('/allow', async(req, res) => {
    var data = req.body
    var result = await allow(data)
    if (result && Object.keys(result).length) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 查询已发布的文章(排序)
router.post('/queryPublished', async (req, res, next) => {
    var data = req.body
    var result = await queryByPageAndSort(Object.assign(data, {data: {
        _status: 1 // 已发布
    }, sort: ['updated_at', 'DESC']}))
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

export default router
