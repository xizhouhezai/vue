let express = require('express')
let mongoose = require('mongoose')
var goods = require('./routes/goods');
var users = require('./routes/users');

let app = new express()

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.end('这里是首页')
})
app.use('/', goods)
app.use('/', users)

app.listen(3033, (err) => {
  if (err) {
    console.log('出错了')
  }
  console.log('server is run at 3033')
})