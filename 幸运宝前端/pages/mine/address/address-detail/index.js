Page({

  data: {
     model: '',
     receiver: '',
     phone: '',
     province: '',
     city: '',
     district: '',
     detail: ''
  },

  onLoad: function(options) {
    this.id = options.id
    if (this.id) {
      this.setData({
        model: 'edit'
      })
    } else {
      this.setData({
        model: 'add'
      })
    }
  },
  cityChange(e) {
    var data = e.detail.value
    this.setData({
      province: data.province,
      city: data.city,
      district: data.district
    })
  },
  receiverChange(e) {
    this.setData({
      receiver: e.detail.value
    })
  },
  phoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  detailChange(e) {
    this.setData({
      detail: e.detail.value
    })
  },

  save() {
    // todo校验
    if (this.data.model === 'edit') {

    }
    if (this.data.model === 'add') {
      wx.newRequest({
        url: wx.envConfig.host + '/address/add',
        method: 'POST',
        data: {
          _receiver: this.data.receiver,
          _phone: this.data.phone,
          _province: this.data.province,
          _city: this.data.city,
          _district: this.data.district,
          _detail: this.data.detail,
          user_id: wx.getStorageSync('userInfo').id
        },
        success: (res) => {
          if (res.data.code === 'Y200') {
            wx.showToast({
              title: '新增地址成功',
              icon: 'none',
              duration: 1500,
              mask: false
            });
          } else {
            wx.showToast({
              title: '新增地址失败',
              icon: 'none',
              duration: 1500,
              mask: false
            }); 
          }
        },
        fail: (err) => {
          console.log('err', err)
        }
      })
    }
  },
  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  }
});