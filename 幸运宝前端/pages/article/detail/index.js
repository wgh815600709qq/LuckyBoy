// pages/article/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },
  getDetail() {
    wx.newRequest({
      url: wx.envConfig.host + '/articles/queryDetail',
      method: 'POST',
      data: {
        id: this.id
      },
      success: (res)=>{
        if (res.data.code === 'Y200') {
          var detail = res.data.data
          var date = new Date(detail.created_at)
          var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
          var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
          var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
          var min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
          detail.created_at = date.getFullYear() + '-' + month + '-' + day + ' ' + hour  + ':' + min
          this.setData({
            detail: detail
          })
        }
      },
      fail: ()=>{}
    });
  },
  // 通过
  allowAccess() {
    wx.newRequest({
      url: wx.envConfig.host + '/articles/allow',
      method: 'POST',
      data: {
        id: this.data.detail.id,
        _auditor: this.userInfo.id,
        _author: this.data.detail._author
      },
      success: (res)=>{
        if (res.data.code === 'Y200') {
          wx.showToast({
            title: '发布成功',
            icon: 'none',
            duration: 1500,
            mask: false,
          });
          this.getDetail() // 刷新
        }
      },
      fail: ()=>{}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    this.getDetail()
    this.userInfo = wx.getStorageSync('userInfo');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})