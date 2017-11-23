import originJSONP from 'jsonp'

/**
 * @param {*string} url 跨域请求的地址
 * @param {*obj} data 跨域请求地址后的参数
 * @param {*obj} option http请求主体
 * @return{promise}
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 拼接URL的方法
function params(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 判断是否有参数，没有则去掉&符,返回空字符串
  return url ? url.substring(1) : ''
}