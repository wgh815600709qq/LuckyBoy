//app.js
const {Provider} = require('./libs/wechat-weapp-redux.js');
const configureStore = require('./configureStore.js');

App(Provider(configureStore())({
  onLaunch: function () {
    console.log("onLaunch")
    wx.hideTabBar()
    wx.envConfig = this.global.config[this.global.env]
  },
  global: {
    env: 'dev',
    config: {
      dev: {
        host: 'http://localhost:8888'
      }
    }
  }
}))