// pages/entry/index.js
var loginUtil = require('../../utils/login.js')
const {connect} = require( '../../libs/wechat-weapp-redux.js' )
const {updateUserInfo} = require( '../../actions/user.js' )

const pageConfig = {
  data: {
    showBtn: false,
    userInfo: null
  },
  onGotUserInfo: function (e) {
    var userInfo = e.detail.userInfo
    // 注册/更新用户信息
    wx.newRequest({
      url: wx.envConfig.host + '/user/enter',
      method: 'POST',
      data: {
        openId: wx._openId,
        userInfo: userInfo
      },
      success: (res)=>{
        if (res.data.code ==='Y200') {
          wx.switchTab({
            url: '../article/index'
          });
        }
      },
      fail: ()=>{}
    });
  }
}

const mapStateToData = state => ({
  userInfo: state.userInfo
})

const mapDispatchToPage = dispatch => ({
  updateUserInfo: userInfo => dispatch(updateUserInfo(userInfo))
})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
console.log('nextPageConfig', nextPageConfig)

function onLoad (options) {
  console.log('onLoad')
  if (wx._token || wx.getStorageSync('token')) {
    wx._token = wx.getStorageSync('token')
    wx._openId = wx.getStorageSync('openId')
    wx.newRequest = loginUtil.newRequest
    loginUtil.getUserInfo().then(userInfo => {
      console.log('userInfo', userInfo)
      this.updateUserInfo(userInfo)

      console.log('***************userInfo', this.data.userInfo)
    })
    wx.switchTab({
      url: '../article/index'
    });
    return
  } else {
    this.setData({
      showBtn: true
    })
  }
  wx.getSetting({
    success(res) {
      console.log('****', res)
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo(res => {
          console.log(res)
        })
      } else {
        this.setData({
          showBtn: true
        })
      }
    }
  })
  // 拿到openId
  loginUtil.login().then(() => {
    loginUtil.getUserInfo().then(userInfo => {
      console.log('userInfo', userInfo)
      this.updateUserInfo(userInfo)
    })
  })
}
var total = Object.assign(nextPageConfig, {onLoad: onLoad})
Page(total);