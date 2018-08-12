// pages/article/add/index.js
var formTool = require('../../../utils/form.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleClass: ['全部', '宝宝健康', '宝宝饮食', '宝宝教育', '宝妈须知'],
    content: '',
    title: '',
    classId: ''
  },
  addNew() {
    var str = formTool.checkIsOk({ "title": this.data.title, "classId": this.data.classId, "content": this.data.content })
    if (str) {
      wx.showToast({
        title: str,
        icon: 'none',
        duration: 3000,
        mask: false,
      });
      return
    }
    wx.newRequest({
      url: wx.envConfig.host + '/articles/add', 
      method: "POST",
      data: {
        _title: this.data.title,
        class_id: this.data.classId,
        _content: this.data.content,
        _author: wx.getStorageSync('userInfo').id
      },
      success: (res) => {
        if (res.data.code === 'Y200') {
          wx.showToast({
            title: '发布文章成功',
            duration: 2000,
            icon: 'success'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 2000)
        }
      },
      fail: (err) => {

      }
    })
  },
  titleChange(e) {
    this.setData({
      title: e.detail.value
    })
  },
  classChange(e) {
    this.setData({
      classId: e.detail.value,
      selectClass: this.data.articleClass[e.detail.value]
    })
  },
  contentChange(e) {
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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