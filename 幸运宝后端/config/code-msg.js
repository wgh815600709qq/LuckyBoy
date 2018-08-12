/**
 * @ Define Return Code Type
 */
// 业务逻辑代码
const success = {
  code: 'Y200',
  msg: '操作成功'
}

// 业务权限
const unAuthorize = {
  code: 'Y401',
  msg: '未授权操作'
}

const fail = {
  code: 'Y500',
  msg: '操作失败'
}

module.exports = {
  success,
  fail,
  unAuthorize
}
