var express = require('express')
var axios = require('axios')

var app = new express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    var data = {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json',
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
    }

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: data
    }).then((response) => {
        res.json(response.data)
    }).catch((err) => {
        console.log(err)
    })
})

apiRoutes.get('/lyric', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((err) => {
        console.log(err)
    })
})

app.use('/api', apiRoutes)

app.listen(3003, () => {
    console.log('server is runing')
})