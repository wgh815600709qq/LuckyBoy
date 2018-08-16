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
    this.setData({
      id: options.id
    })
    if (+options.id) {
      this.setData({
        model: 'edit'
      })
      this.queryDetail()
    } else {
      this.setData({
        model: 'add'
      })
    }
  },
  queryDetail() {
    wx.newRequest({
      url: wx.envConfig.host + '/address/queryDetail',
      method: 'POST',
      data: {
        id: this.data.id
      },
      success: (res) => {
        this.setData({
          receiver: res.data.data._receiver,
          phone: res.data.data._phone,
          province: res.data.data._province,
          city: res.data.data._city,
          district: res.data.data._district,
          detail: res.data.data._detail
        })
      }
    })
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
      wx.newRequest({
        url: wx.envConfig.host + '/address/update',
        method: 'POST',
        data: {
            id: this.data.id,
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
              title: '修改成功',
            })
          } else {
            wx.showToast({
              title: '修改失败',
            })
          }
        },
        fail: (err) => {
          console.log(err)
        }

      }) 
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