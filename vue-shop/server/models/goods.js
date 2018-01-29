let Mongoose = require('mongoose')
let Schema = Mongoose.Schema

let produtSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "checked":String,
  "productNum":Number,
  "productImage":String
})

module.exports = Mongoose.model('Good',produtSchema);