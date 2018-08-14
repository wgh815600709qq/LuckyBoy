import { queryByOne } from '../module/articles.js';
const express = require('express')
const router = express.Router()
var { success, fail } = require('../config/code-msg.js')
var { add, queryByPageAndSort, allow, fuzzySearch, editArticleById, praiseArticle, cancelPraise,commentArticle } = require('../module/articles.js')

// 文章提交审核
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
    }, sort: [['created_at', 'DESC']]}))
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

// 查询已发布的文章(首页接口、排序)
router.post('/queryPublished', async (req, res, next) => {
    var data = req.body
    var result = await queryByPageAndSort(Object.assign(data, {data: {
        _status: 1 // 已发布
    }, sort: [['updated_at', 'DESC']]}))
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 查询我的文章 pageNo pageSize id
router.post('/queryMyArticles', async(req, res, next) => {
    var data = req.body
    var result = await queryByPageAndSort(Object.assign(data, {data: {
        _author: data.id
    }, sort: [['_status', 'DESC'], ['created_at', 'DESC']]}))
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 模糊搜索文章关键词
router.post('/fuzzySearch', async(req, res, next) => {
    var data = req.body
    let result = await fuzzySearch(data)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})


// 设置文章的分类 [id, class_id]
router.post('/setClass', async(req, res, next) => {
    let data = req.body
    let result = await editArticleById(data.id, {
        class_id: data.class_id
    })
    res.send(result)
})

// 点赞
router.post('/praise', async(req, res) => {
    let result = await praiseArticle(req.body)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

// 取消赞
router.post('/cancelPraise', async(req, res) => {
    let result = await cancelPraise(req.body)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})

router.post('/comment', async(req, res) => {
    let result = await commentArticle(req.body)
    if (result) {
        res.send(Object.assign({}, success, { data: result }))
    } else {
        res.send(fail)
    }
})
export default router
