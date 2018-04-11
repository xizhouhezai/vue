const Router = require('koa-router')

const index = require('../controllars/index')

let router = new Router()

router.get('/data/league', index.league)

module.exports = router
