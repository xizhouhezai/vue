var http = require('http')

exports.Json = function(url, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(options)
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const { statusCode } = res

      let error
      if (statusCode !== 200) {
        error = new Error('请求失败。\n' +
          `状态码: ${statusCode}`)
      }
      if (error) {
        console.error(error.message)
        // 消耗响应数据以释放内存
        res.resume()
        return
      }

      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
        } catch (e) {
          reject(e.message)
        }
      })
    }).on('error', (e) => {
      console.error(`错误: ${e.message}`)
    })
  })
}

function params(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
