// components/pager/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      pageNo: {
        type: Number
      },
      total: {
        type: Number,
        value: 0,
        observer: function(newval) {
          this.setData({
            totalPage: Math.ceil(this.data.total / 10)
          })
        }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalPage: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
