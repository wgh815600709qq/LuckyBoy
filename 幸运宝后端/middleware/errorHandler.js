// Sever Error Handler
function errorHandler(err, req, res, next) {
  console.log('百慕大错误区...')
  res.status(500).send({ msg: err })
}
module.exports = errorHandler
