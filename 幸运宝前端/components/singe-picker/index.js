Component({
    properties: {
        range: {
            type: Array
        }
    },
    data: {
        value: [0], // 默认选中第一个
        show: false
    },
    methods: {
        cancel() {
            this.setData({show:false})
            this.triggerEvent('cancel')
        },
        confirm() {
            // 立即点击的处理时间
            setTimeout(() => {
                this.setData({show:false})
                this.triggerEvent('change', {value:this.data.value[0]})
            }, 500)
        },
        // 只是改变
        bindChange(e) {
            console.log('singe-picker:change', e.detail.value)
            this.setData({
                value: e.detail.value
            })
        },
        open() {
            this.setData({
                show:true
            })
            this.triggerEvent('tap')
        }
    }
})