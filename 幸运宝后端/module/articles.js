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
const praiseModel = require('../schema/praise.js')
var Praise = praiseModel(connection, Sequelize)
const commentModel = require('../schema/comment.js')
var Comments = commentModel(connection, Sequelize)


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
    order: query.sort
  })
  return res
}

// 查详情关联查找
async function queryByOne(data) {
  // 文章 && 用户 关联关系 Articles._author == User.id
  User.hasMany(Articles, { foreignKey: '_author'})
  Articles.belongsTo(User, { foreignKey: '_author' })
  let res = await Articles.findOne({
    where: {id: data.id},
    include: [
      { model: User }
    ]
  })
  // 文章 && 点赞
  var isPraised = await Praise.count({
    where: {
      $and: {
        article_id: data.id,
        user_id: data.user_id,
        is_praised: 1
      }
    }
  })
  Comments.belongsTo(User, {as: 'ReplyMan', foreignKey: 'replyman_id'})
  Comments.belongsTo(User, {as: 'Replyor', foreignKey: 'user_id'})
  // 文章 && 评论
  var comments = await Comments.findAll({
    where: {
      article_id: data.id
    },
    include: [
      {
        model: User,
        as: 'ReplyMan'
      },
      {
        model: User,
        as: 'Replyor'
      }
    ]
  })
  // 添加评论信息
  res.dataValues.comments = comments
  // 添加点赞字段
  res.dataValues.is_praised = isPraised ? true : false
  return res
}

// 文章提交 [文章&&用户&&消息]
async function add(data) {

  return connection.transaction(t => {
    // 发布文章
    return Articles.create(data, { transaction: t }).then(articles => {
      // 确定哪些是管理员(1,2)
      return User.findAll({ where: { _identity: { $and: { $gt: 0, $lt: 3 } } } }, { transaction: t }).then(async (user) => {
        let messagePromises = []
        for (var i = 0; i < user.length; i++) {
          messagePromises.push(
            Message.create({
              _from: 2,
              _to: user[i].id,
              _message: '有新的文章需要审核。'
            }, { transaction: t })
          )
        }
        return Promise.all(messagePromises)
      })
    })
  }).then(res => {
    return success
  }).catch(err => {
    return Object.assign(fail, {data: err})
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

// 文章审核通过[文章&&文章记录&&用户&&积分]
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
          return User.update({ _score: _score }, { where: { id: +data._author }, transaction: t }).then(users => {
            // 生成积分记录integral
            return Integral.create({
              _action: 'lauch-article',
              _remark: '文章发表送5积分',
              _integral: 5,
              user_id: user.id
            }, { transaction: t }).then(integral => {
              // TODO 发送消息通知文字被审核通过，获取积分+5
              return Message.create({
                _from: 2,
                _to: user.id,
                _message: '您的文章已经通过审核,发布上线。根据系统设定，您即获得5积分，系统已累积到您的积分，可前往积分记录查看'
              }, { transaction: t })
            })

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

// 模糊搜索标题、作者、内容、发布日期
async function fuzzySearch(data) {
  let res = await Articles.findAndCountAll({
    where: {
      $or: {
        _title: {
          $like: '%' + data.keyword + '%'
        },
        _author: {
          $like: '%' + data.keyword + '%'
        },
        _content: {
          $like: '%' + data.keyword + '%'
        },
        created_at: {
          $like: '%' + data.keyword + '%'
        }
      }
    }
  })
  return res
}


// 点赞[article_id, user_id]
async function praiseArticle(data) {
  return connection.transaction(t => {
    // 点赞表存储记录
    return Praise.create(data, { transaction: t }).then(praise => {
      // 更新文章表点赞数
      return Articles.findOne({ where: { id: data.article_id }, transaction: t }).then(articles => {
        var praises = +articles.praise_num + 1
        return Articles.update({ praise_num: praises }, { where: { id: data.article_id }, transaction: t })
      })
    })
  }).then(() => {
    return success
  }).catch(() => {
    return null
  })
}

// 取消赞 [article_id, user_id]
async function cancelPraise(data) {
  return connection.transaction(t => {
    // 更新点赞表is_praised
    return Praise.update({ is_praised: 0 }, { where: { $and: data }, transaction: t }).then(praise => {
      // 更新文章点赞数
      return Articles.findOne({ where: { id: data.article_id }, transaction: t }).then(articles => {
        var praises = +articles.praise_num - 1
        return Articles.update({ praise_num: praises }, { where: { id: data.article_id }, transaction: t })
      })
    })
  }).then(() => {
    return success
  }).catch(() => {
    return null
  })
}

// 评论 [article_id, reply_id回复id, _content, user_id, replyman_id被回复的人id]
async function commentArticle(data) {
  return connection.transaction(t => {
    // 更新评论表
    return Comments.create(data, { transaction: t }).then(comments => {
      // 更新文章评论数
      return Articles.findOne({ where: { id: data.article_id }, transaction: t }).then(articles => {
        var _comments = +articles.comment_num + 1
        return Articles.update({ comment_num: _comments }, { where: { id: data.article_id }, transaction: t }).then(aritcle => {
          // 发送给被评论人发评论消息
          return Message.create({
            _from: data.user_id,
            _to: data.replyman_id,
            _message: '新的评论，评论内容：' + data._content
          }, { transaction: t })
        })
      })
    })
  }).then(() => {
    return success
  }).catch(() => {
    return null
  })
}

export {
  queryAll,
  add,
  queryByOne,
  deleteByOne,
  editArticleById,
  queryByPageAndSort,
  allow,
  fuzzySearch,
  cancelPraise,
  praiseArticle,
  commentArticle
}
