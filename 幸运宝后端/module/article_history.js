var { connection, Sequelize } = require('../database/connect.js')
const artHistoryModel = require('../schema/article_history.js')
var ArtHistory = artHistoryModel(connection, Sequelize)

async function queryAll () {
  let res = await ArtHistory.findAll({
    attributes: ['name', '_username', 'id']
  })
  return res
}

async function queryByOne (data) {
  let res = await ArtHistory.findOne({
    where: data
  })
  return res
}

async function add_artHistory (data) {
  let res = await ArtHistory.create(data)
  return res
}

async function deleteByOne (data) {
  let res = await ArtHistory.destroy({
    where: data
  })
  return res
}

async function editById (id, data) {
  let res = await ArtHistory.update(data, {
    where: {id: id}
  })
  return res
}

export {
  queryAll,
  add_artHistory,
  queryByOne,
  deleteByOne,
  editById
}
