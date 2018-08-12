const express = require('express')
const router = express.Router()
var { success, fail } = require('../config/code-msg.js')
var { getOpenId, genToken } = require('../module/auth.js')

router.get('/getToken', async (req, res, next) => {
    console.log('code',req.query.code)
    let openid = await getOpenId(req.query.code)
    console.log(openid)
    let token = await genToken(openid)
    // 签发token
    res.send(Object.assign(success, {data: {
        openid: openid,
        token: token
    }}))
})

export default router
