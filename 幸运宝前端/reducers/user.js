const userInfo = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_USER_INFO':
        state = Object.assign({}, action.userInfo)
        console.log('state', state)
        return state
      default:
        return state
    }
  }
  
  module.exports = userInfo