var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  "userId": String,
  "userName": String,
  "userPwd": Number,
  "orderList": Array,
  "carList": Array,
  "addressList": Array
})

module.exports = mongoose.model('user', userSchema)