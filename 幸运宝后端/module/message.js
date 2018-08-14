var { connection, Sequelize } = require('../database/connect.js')
const messageModel = require('../schema/message.js')
var Message = messageModel(connection, Sequelize)
const userModel = require('../schema/user.js')
var User = userModel(connection, Sequelize)
var { success, fail } = require('../config/code-msg.js')
User.hasMany(Message, { foreignKey: '_from' })
Message.belongsTo(User, { foreignKey: '_from' })
// 获取我的所有消息, 分页
async function queryAllByPage(query) {
    let res = await Message.findAndCountAll({
        where: query.data,
        limit: +query.pageSize,
        offset: +(query.pageNo - 1) * query.pageSize,
        order: query.sort,
        include: [
            { model: User }
        ]
    })
    return res
}

// 查看消息详情,重置未读数 
async function queryDetail(data) {
    return connection.transaction(t => {
        return Message.update({ _read: 1 }, { where: { id: data.id }, transaction: t }).then(() => {
            return Message.findOne({
                where: { id: data.id },
                include: [{ model: User }],
                transaction: t
            })
        })
    }).then((res) => {
        return Object.assign({}, success, { data: res })
    }).catch(() => {
        return fail
    })

}

// 查询我的消息未读数
async function queryUnread(data) {
    let res = await Message.count({
        where: {
            _to: data.id,
            $and: {
                _read: 0
            }
        }
    })
    console.log('res', res)
    return res
}
export {
    queryAllByPage,
    queryDetail,
    queryUnread
}
