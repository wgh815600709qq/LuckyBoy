var { connection, Sequelize } = require('../database/connect.js')
const addressModel = require('../schema/address.js')
var Address = addressModel(connection, Sequelize)

async function queryAll (data) {
  let res = await Address.findAll({where: data})
  return res
}

async function queryByOne (data) {
  let res = await Address.findOne({
    where: data
  })
  return res
}

// 最多允许5个地址
async function add (data) {
  console.log('**********')
  let count = await Address.count({where: {user_id: data.user_id}})
  if (count > 4) {
    return {errmsg: '地址不能超过5个'}
  } else if (count === 0) {
    data.is_default = 1 // 第一个地址是默认地址
    let res = await Address.create(data)
    return res
  } else {
    let res = await Address.create(data)
    return res
  }
}

async function deleteByOne (data) {
  let res = await Address.destroy({
    where: data
  })
  return res
}

// 除默认地址外其他数据的修改
async function editById (id, data) {
  let res = await Address.update(data, {
    where: {id: id}
  })
  return res
}

// 设置默认地址
async function setDefault(data) {
    return connection.transaction(t => {
        // 把原来默认地址找出来改为非默认
        return Address.findOne({where: {is_default: 1}}, {transaction: t}).then(address => {
            if (address) {
                return Address.update({is_default: 0}, {where: {id: address.id}, transaction:t}).then(_address => {
                    return Address.update({is_default: 1}, {where: {id: data.id}, transaction: t})
                })
            } else {
                // 重设默认
                return Address.update({is_default: 1}, {where: {id: data.id}, transaction: t})
            }
        })
    })
}

export {
  queryAll,
  add,
  queryByOne,
  deleteByOne,
  editById,
  setDefault
}
