// pages/article/check/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total: 0,
    pageNo: 1
  },
  getCheckedList(pageNo) {
    wx.newRequest({
      url: wx.envConfig.host + '/articles/queryUnaudited',
      method: 'POST',
      data: {
        pageNo: pageNo,
        pageSize: 10
      },
      success: (res) => {
        console.log(res)
        if (res.data.code === 'Y200') {
          var list = res.data.data.rows
          list.map(it => {
            var date = new Date(it.created_at)
            var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
            var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
            var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
            var min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
            it.time = date.getFullYear() + '-' + month
             + '-' + day + ' ' + hour  + ':' + min
            return it
          })
          this.setData({
            list: list,
            total: res.data.data.count
          })
          console.log(this.data.list)
        }
      }
    })
  },
  goDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/index?id=' + id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCheckedList(1)
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