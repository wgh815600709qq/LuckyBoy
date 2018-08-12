var { connection, Sequelize } = require('../database/connect.js')
var { success, fail } = require('../config/code-msg.js')
const articlesModel = require('../schema/articles.js')
var Articles = articlesModel(connection, Sequelize)
const userModel = require('../schema/user.js')
var User = userModel(connection, Sequelize)
const ArtHistoryModel = require('../schema/article_history.js')
var ArtHistory = ArtHistoryModel(connection, Sequelize)
const IntegralModel = require('../schema/integral.js')
var Integral = IntegralModel(connection, Sequelize)
const messageModel = require('../schema/message.js')
var Message = messageModel(connection, Sequelize)

async function queryAll() {
  let res = await Articles.findAll({
  })
  return res
}

/* 分页查询遵循结构
 *  {
 *      pageNo: 1,
 *      pageSize: 10,
 *      data: { // 查询条件
 *      },
 *      sort: [] // 排序要求
 *  }
 */

async function queryByPageAndSort(query) {
  let res = await Articles.findAndCountAll({
    where: query.data,
    limit: +query.pageSize,
    offset: +(query.pageNo - 1) * query.pageSize,
    order: [query.sort]
  })
  return res
}

// 查详情关联查找
async function queryByOne(data) {
  // 文章 && 用户 关联关系 Articles._author == User.id
  User.hasMany(Articles, { foreignKey: '_author' })
  Articles.belongsTo(User, { foreignKey: '_author' })
  let res = await Articles.findOne({
    where: data,
    include: [
      { model: User }
    ]
  })
  return res
}

// 文章提交
async function add(data) {

  return connection.transaction(t => {
    // 发布文章
    return Articles.create(data, {transaction: t}).then(articles => {
        // 确定哪些是管理员(1,2)
        return User.findAll({where: {_identity: {$and: {$gt: 0, $lt: 3}}}}, {transaction: t}).then(async (user) => {
            let messagePromises = []
            for (var i =0; i< user.length; i++) {
              messagePromises.push(
                Message.create({
                  _from: 2,
                  _to: user[i].id,
                  _message: '有新的文章需要审核。'
                }, {transaction: t})
              )
            }
            return Promise.all(messagePromises)
        })
    })
  }).then(res => {
    return success
  }).catch(err => {
    return fail
  }) 
}

async function deleteByOne(data) {
  let res = await Articles.destroy({
    where: data
  })
  return res
}

async function editArticleById(id, data) {
  let res = await Articles.update(data, {
    where: { id: id }
  })
  return res
}

// 文章审核通过
async function allow(data) {
  // id 文章id, _auditor审核人id
  return connection.transaction(t => {
    // articles表修改文章状态
    return Articles.update({ _status: 1 }, { where: { id: data.id }, transaction: t }).then(articles => {
      // 生成文章操作记录article_history
      return ArtHistory.create({ _auditor: data._auditor, article_id: data.id, _action: 1 }, { transaction: t }).then(arthistory => {
        // 修改个人积分user
        return User.findOne({ where: { id: +data._author } }).then(user => {
          var _score = +user._score + 5
          return User.update({ _score: _score }, { where: { id: +data._author }, transaction: t }).then(user => {
            // 生成积分记录integral
            return Integral.create({
              _action: 'lauch-article',
              _remark: '文章发表送5积分',
              _integral: 5
            }, { transaction: t })
          })
        })
      })

    })
  }).then(res => {
    return res
  }).catch(err => {
    return err
  })
}

export {
  queryAll,
  add,
  queryByOne,
  deleteByOne,
  editArticleById,
  queryByPageAndSort,
  allow
}
