var express = require('express')
var mongoose = require('mongoose')
var Goods = require('../models/goods');

var router = express.Router()

mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
})

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

router.get('/goods', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let sort = req.param('sort')
  let skip = (page - 1) * pageSize
  let goodsModel = null
  if (!page || !pageSize || !sort) {
    goodsModel = Goods.find()
    goodsModel.sort({'salePrice': 1})
  } else {
    goodsModel = Goods.find().skip(skip).limit(pageSize)
    goodsModel.sort({'salePrice': sort})
  }
  goodsModel.exec((err, doc) => {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      res.json({
          status:'0',
          msg:'',
          result:{
              count:doc.length,
              list:doc
          }
      });
    }
  })
})

module.exports = router