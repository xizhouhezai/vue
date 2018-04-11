var { Json } = require('../api/json')
let appkey = 'c1cc5c07bbdff2cbf75ec239ca25558d'

module.exports = {
  async league (ctx, next) {
    let leagues = null
    if (ctx.query.type) {
      leagues = ctx.query.type
    } else {
      leagues = '中超'
    }
    const parsedData = await Json('http://op.juhe.cn/onebox/football/league', { key: appkey, dtype: 'json', league: leagues })
    ctx.response.body = {
      code: 0,
      items: parsedData
    }
    await next()
  }
}
