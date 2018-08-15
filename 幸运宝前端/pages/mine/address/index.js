// pages/mine/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 点击编辑
  edit(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "./address-detail/index?id=" + id
    });
  },

  //左滑删除
  deletes() {

  },
  addAddress() {
    wx.navigateTo({
      url: "./address-detail/index?id=" + 0
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList()
  },
  getAddressList() {
    wx.newRequest({
      url: wx.envConfig.host + '/address/queryAll',
      method: 'POST',
      data: {
        user_id: wx.getStorageSync('userInfo').id
      },
      success: (res) => {
        var list = res.data.data
        list.map(it => {
          var phone = it._phone
          it.phone = phone.slice(0, 4) + '-' + phone.slice(4, 8) + '-' + phone.slice(8, 12)
          return it
        })
        this.setData({
          list: list
        })
      }
    })
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