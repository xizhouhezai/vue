import axios from 'axios'
import {commonParams} from './config'

export function getLyric(mid) {
  let hostname = window.location.hostname
  let uri = ''
  if (hostname === 'www.xizhouhezai.com') {
    uri = `${hostname}:9000`
  } else {
    uri = 'localhost:3003'
  }
  const url = uri + '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios(url, {
    params: data
  }).then((res) => {
    var ret = res.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    return Promise.resolve(ret)
  })
}
