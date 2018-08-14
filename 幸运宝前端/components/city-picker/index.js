// components/pager/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },
  
    /**
     * 组件的初始数据
     */
    data: {
        cityData: null,
        provinces: [],
        province: '',
        citys: [],
        city: '',
        districts: [],
        district: '',
        value: [0, 0, 0],
        show: false
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
        cancel() {
            this.setData({show:false})
            this.triggerEvent('cancel')
        },
        confirm() {
            // 立即点击的处理时间
            setTimeout(() => {
                this.setData({show:false})
                this.triggerEvent('change', {value:{
                    province: this.data.province,
                    city: this.data.city,
                    district: this.data.district
                }})
            }, 500)
        },
        // 只是改变
        bindChange(e) {
            console.log('date-picker:change', e.detail.value)
            const val = e.detail.value
            var province = this.data.provinces[val[0]]
            var citys = Object.keys(this.data.cityData[province])
            var city = citys[val[1]]
            var districts = this.data.cityData[province][city]
            var district = districts[val[2]]
            this.setData({
                province: province,
                citys: citys,
                city: city,
                districts: districts,
                district: district
            })
        },
        open() {
            this.getData()
        },
        getData () {
            wx.request({
                url: wx.envConfig.host + '/auth/getCCD',
                method: 'GET',
                success: (res) => {
                    if (res.data.code === 'Y200') {
                        this.setData({
                            cityData: res.data.data
                        })
                        var provinces = Object.keys(this.cityData)
                        this.setData({
                            provinces: provinces
                        })
                    }
                },
                fail: (err) => {
                    console.log('err', err)
                }
            })
        }
    }
  })
  