// pages/article/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    newComment: '',
    openInput: false,
    placeholder: ''
  },
  getDetail() {
    wx.newRequest({
      url: wx.envConfig.host + '/articles/queryDetail',
      method: 'POST',
      data: {
        id: this.id,
        user_id: wx.getStorageSync('userInfo').id
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
  // 点赞
  toPraise() {
    if (this.data.detail.is_praised) {
      wx.showToast({
        title: '你已经点过赞',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
      return
    }
    wx.newRequest({
      url: wx.envConfig.host + '/articles/praise',
      method: 'POST',
      data: {
        article_id: this.id,
        user_id: wx.getStorageSync('userInfo').id
      },
      success: (res) => {
        this.getDetail()
      }
    })
  },
  // 评论作者
  toComment() {
    // 打开评论列表
    // article_id, reply_id回复id, _content, user_id, replyman_id被回复的人id
    this.reply_id = 0
    this.replyman_id = this.data.detail._author
    this.setData({
      openInput: true,
      placeholder: '评论'
    })
  },
  // 回复
  toReply(e) {
    var item = e.currentTarget.dataset.item
    if (wx.getStorageSync('userInfo').id === item.user_id) {
      return
    }
    this.reply_id = e.currentTarget.dataset.reply_id
    this.setData({
      openInput: true,
      placeholder: '回复'
    })
  },
  inputChange(e) {
    console.log('e', e.detail.value)
    this.setData({
      newComment: e.detail.value
    })
  },
  // 发送评论
  sendMsg() {
    if (!this.data.newComment) {
      return
    }
    wx.newRequest({
      url: wx.envConfig.host + '/articles/comment',
      method: 'POST',
      data: {
        article_id: this.data.detail.id,
        _content: this.data.newComment,
        reply_id: this.reply_id,
        user_id: wx.getStorageSync('userInfo').id,
        replyman_id: this.replyman_id
      },
      success: (res) => {
        this.getDetail()
        this.setData({
          openInput: false,
          placeholder: '',
          newComment: ''
        })
      },
      fail: (err) => {

      }
    })
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