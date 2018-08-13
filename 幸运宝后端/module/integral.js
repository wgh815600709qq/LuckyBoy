var { connection, Sequelize } = require('../database/connect.js')
const integralModel = require('../schema/integral.js')
var Integral = integralModel(connection, Sequelize)

async function queryByPageAndSort(query) {
  let res = await Integral.findAndCountAll({
    where: query.data,
    limit: +query.pageSize,
    offset: +(query.pageNo - 1) * query.pageSize,
    order: [query.sort]
  })
  return res
}

export {
  queryByPageAndSort
}
