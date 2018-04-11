var Koa = require('koa')
var app = new Koa()
const cors = require('koa2-cors')
let router = require('./router/index')

app.use(router.routes())
app.use(cors())

app.listen(3333)

console.log('app is run, and listen localhost: 3333')
