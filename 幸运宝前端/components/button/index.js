Component({
  properties: {
    disabled: {
      type: Boolean,
      value: false,
      observer: function (newval, oldval) {
        console.log('********', newval)
      }
    }
  },
  methods: {
    btnClick() {
      if (!this.data.disabled) {
        this.triggerEvent('tap')
      }
    }
  }
})