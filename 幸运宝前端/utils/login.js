function login() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                if (res.code) {
                    wx.request({
                        url: wx.envConfig.host + '/auth/getToken',
                        method: 'GET',
                        data: {
                            code: res.code
                        },
                        success: (res) => {
                            if (res.data.code === 'Y200') {
                                wx._openId = res.data.data.openid
                                wx._token = res.data.data.token
                                wx.setStorageSync('token', res.data.data.token);
                                wx.setStorageSync('openId', res.data.data.openid)
                                wx.newRequest = newRequest
                                resolve()
                            } else {
                                console.warn('失败')
                            }
                        },
                        fail: (err) => {
                            console.warn('失败')
                        }
                    })
                } else {
                    console.log('登陆失败')
                }
            }
        })
    })
}

// 授权后的request
function newRequest (options) {
    var header = options.header || {}
    header = Object.assign(header, { 'cookie': 'token='+ wx._token }) // 登陆以后会带上token
    options.header = header
    options.complete = function(res) {
        // 超时
        if (res.data.code ==='TokenExpiredError') {
            wx.showToast({
                title: '登陆过期',
                duration: 2000,
                icon: 'none'
            })
            setTimeout(() => {
                wx.showToast({
                    title: '重新登陆',
                    duration: 2000,
                    icon: 'none'
                })
                login().then(() => {
                    getUserInfo()
                })
            }, 2000)
        }
    }
    wx.request(options);
}


function getUserInfo () {
    return new Promise((resolve, reject) => {
        newRequest({
            url: wx.envConfig.host + '/user/getUserInfo',
            method: 'GET',
            data: {
                openId: wx._openId
            },
            success: (res) => {
                if (res.data.code === 'Y200') {
                    wx.setStorageSync('userInfo', res.data.data);
                    resolve(res.data.data)
                }
            }
        })
    })
}
module.exports = {
    login: login,
    newRequest: newRequest,
    getUserInfo: getUserInfo
}
