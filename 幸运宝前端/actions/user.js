const updateUserInfo = (userInfo) => ({
  type: 'UPDATE_USER_INFO',
  userInfo: userInfo
})
module.exports = {
    updateUserInfo: updateUserInfo
}