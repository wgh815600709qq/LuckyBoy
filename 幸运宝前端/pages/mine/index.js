// pages/mine/index.js
const { connect } = require('../../libs/wechat-weapp-redux.js')
const pageConfig = {
  data: {
    userInfo: {},
    unread: 0
  },
  queryUnread() {
    wx.newRequest({
      url: wx.envConfig.host + '/message/queryUnread',
      method: 'POST',
      data: {
        id: wx.getStorageSync('userInfo').id
      },
      success: (res) => {
        this.setData({
          unread: res.data.data
        })
      }
    })
  },
  linkTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  }
}
const mapStateToData = state => ({
  userInfo: state.userInfo,
  todos: state.todos
})

const mapDispatchToPage = dispatch => ({
})
const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
nextPageConfig.onShow = function (options) {
  // 刷新消息列表
  console.log('刷新消息')
  this.queryUnread()
}

Page(nextPageConfig);