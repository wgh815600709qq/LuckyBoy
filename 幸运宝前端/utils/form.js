function checkIsOk(checkObj) { // 入口页面的表单校验
  var str
  for (var key in checkObj) {
    var value = checkObj[key]
    str = checkList[key](value)
    if (str) {
      break
    }
  }
  return str
}

// 策略模式

var checkList = { //校验规则
  'title': function (value) {
    return rules['isEmpty'](value, '文章标题')
  },
  'classId': function (value) {
    return rules['isEmpty'](value, '文章分类')
  },
  'content': function (value) {
    return rules['isEmpty'](value, '文章内容')
  },
  'name': function (value) {
    return rules['isPhone'](value)
  },
  'vcode': function (value) {
    return rules['isEmpty'](value, '验证码')
  },
  'password': function (value) {
    return rules['isShortEnough'](value, 8, '密码') ||
      rules['isLongEnough'](value, 20, '密码') ||
      rules['password'](value)
  }
}

// 校验规则
var rules = {
  'isPhone': function (value) { // 合法手机
    var reg = /^1[3|5|7|8|9][0-9]{9}$/
    return reg.test(value) ? '' : '手机号不合法'
  },
  'isEmpty': function (value, area) { // 非空规则
    value =  value.toString()
    if (!value || !value.trim()) {
      return area + '不能为空'
    }
  },
  'password': function (value) { // 密码规则
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
    return reg.test(value) ? '' : '密码不符合规范'
  },
  'isShortEnough': function (value, length, area) { // 太短
    if (value.length < length) {
      return area + '长度不够'
    }
  },
  'isLongEnough': function (value, length, area) { // 太长
    if (value.length > length) {
      return area + '长度太长'
    }
  }
}

module.exports = {
  checkIsOk: checkIsOk
}