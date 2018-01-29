var mongoose = require('mongoose')
var express = require('express')
var Users = require('../models/users')

var router = express.Router()

mongoose.connect('mongodb://127.0.0.1:27017/dumall')

mongoose.connection.on('connected', () => {
  console.log("MongoDB connected success.")
})

mongoose.connection.on('error', () => {
  console.log("MongoDB connected fail.")
})

mongoose.connection.on('disconnected', () => {
  console.log("MongoDB connected disconnected.")
})

router.get('/users', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  let usrsModel = Users.find()
  usrsModel.exec((err, doc) => {
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
        })
      }
  })
})

module.exports = router