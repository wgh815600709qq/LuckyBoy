// pages/mine/my-article/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  goDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/article/detail/index?id=' + id
    });
  },
  getMyArticle(pageNo) {
    wx.newRequest({
      url: wx.envConfig.host + '/articles/queryMyArticles',
      method: 'POST',
      data: {
        pageNo: pageNo,
        pageSize: 10,
        data: { // 查询条件
          _author: wx.getStorageSync('userInfo').id
        }
      },
      success: (res) => {
        this.setData({
          list: res.data.data.rows
        })
      },
      fail: (err) => {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyArticle(1)
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