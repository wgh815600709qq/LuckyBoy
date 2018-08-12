import express from 'express'
import authRouter from './router/auth'
import userRouter from './router/user'
import articlesRouter from './router/articles'
import messageRouter from './router/message'
const path = require('path')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8888
var bodyParser = require('body-parser') // Request header to parse middleware
var clientErrorHandler = require('./middleware/clientErrorHandler.js')
var errorHandler = require('./middleware/errorHandler.js')
var Interceptor = require('./middleware/Interceptor.js')
var Auth = require('./middleware/auth.js')
app.set('port', port)
app.use(express.static(path.resolve(__dirname, '../static'))) // Static resources
app.use(bodyParser.json({limit: '2048kb'})) // Request content is not not more than 2G
app.use(bodyParser.urlencoded({ extended: false }))
app.use(Interceptor) // Router Interceptor
/*
*  Put routers in the block
*/
app.use('/auth', authRouter)
app.use(Auth) // Router Auth
// 需要授权的接口
app.use('/user', userRouter)
app.use('/articles', articlesRouter)
app.use('/message', messageRouter)




// At last solve 404
app.use('*', function(req, res) {
  res.status(404).send({ code: 'Y404' , msg: '未定义接口' })
})

app.use(clientErrorHandler) // Client Error Solution
app.use(errorHandler) // Sever Error Solution
app.listen(port, host)// Listen the server


console.warn('Server Start on', new Date().toLocaleString())
console.log('Server listening on ' + host + ':' + port)
