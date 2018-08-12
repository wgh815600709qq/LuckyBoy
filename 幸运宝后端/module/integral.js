var { connection, Sequelize } = require('../database/connect.js')
const integralModel = require('../schema/integral.js')
var Integral = integralModel(connection, Sequelize)

async function queryAll () {
  let res = await Integral.findAll({
    attributes: ['name', '_username', 'id']
  })
  return res
}

async function queryByOne (data) {
  let res = await Integral.findOne({
    where: data
  })
  return res
}

async function add_Integral (data) {
  let res = await Integral.create(data)
  return res
}

async function deleteByOne (data) {
  let res = await Integral.destroy({
    where: data
  })
  return res
}

async function editById (id, data) {
  let res = await Integral.update(data, {
    where: {id: id}
  })
  return res
}

export {
  queryAll,
  add_Integral,
  queryByOne,
  deleteByOne,
  editById
}
