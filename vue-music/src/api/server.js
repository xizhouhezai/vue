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
apiRoutes.get('/disc', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    var url = 'http://music.163.com/weapi/discovery/recommend/resource'
    var data = {
        csrf_token: 'dcbc50d1f2b78deeb95ffe8099710ffb'
    }
    axios.get(url, {
        headers: {
            referer: 'http://music.163.com/discover',
            host: 'music.163.com',
            origin: 'http://music.163.com',
            ContentType: 'application/x-www-form-urlencoded',
            Cookie: '_ntes_nnid=62c9d150d5ed401923a2294b841bd775,1501575474669; _ntes_nuid=62c9d150d5ed401923a2294b841bd775; __gads=ID=6e2d173a651bf9ac:T=1507269876:S=ALNI_MaStSc1MJBVGyYjhJfhy1dRa5zJzw; UM_distinctid=15ef04758d54ac-0d5e982d6cb4a8-5d153916-100200-15ef04758d62b8; vjuids=-354326b4b.15ef0476581.0.0b02775900f1; vjlast=1507269764.1507269764.30; vinfo_n_f_l_n3=19ba8a8668f95228.1.0.1507269764497.0.1507269800443; _ngd_tid=4Y53bFW4HmhfX2LEsbNN35PAkQo1z2EN; usertrack=ezq0pVouQdeWqUt8BErRAg==; _ga=GA1.2.927359793.1512980957; JSESSIONID-WYYY=Bhc34rdmHe8%5CIEKFYtbdAksao%5CQax61i8%2FaFSHCdxOp%2BCyNlBGCHfdqU%2BA%2B82e64x4C8ls%5CmR6DdKMCVAq%5CrIiM892FBp4VyfWyvGJPA6c5xGiRGn9zxPxxjUzT6%2BwRfVNVCiW8AG8KBdo2mqdCBdZKa57k6oQiq6n7x21eBns0a86jA%3A1514272061057; _iuqxldmzr_=32; MUSIC_U=1c33d6962b68f6dd5af08882146e57a25053be85f4706fa6c34c1a10a0af7dc11ec2cbba27817ee5be45bb4b8a2c5fb1ffcfc2895c1e7e02af9e62a8590fd08a; __remember_me=true; __csrf=dcbc50d1f2b78deeb95ffe8099710ffb; __utma=94650624.2063490327.1501575476.1514180098.1514270262.152; __utmb=94650624.7.10.1514270262; __utmc=94650624; __utmz=94650624.1501575476.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)'
        },
        params: data
    }).then((response) => {
        console.log(response)
        // var list = JSON.parse(response)
        // res.json(list)
    }).catch((err) => {
        console.log(err)
    })
})


app.use('/api', apiRoutes)

app.listen(3003, () => {
    console.log('server is runing')
})