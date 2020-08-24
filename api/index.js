const request = require('request-promise')

function API (cookies) {
  // 初始化 cookie jar
  this._jar = request.jar()

  // 設置 cookies
  Object.keys(cookies).forEach((cookieKey) => {
    const cookieValue = cookies[cookieKey]
    const cookie = request.cookie(cookieKey + '=' + cookieValue)
    cookie.domain = 'pchome.com.tw' // 手動 assign domain
    this._jar.setCookie(cookie, 'https://24h.pchome.com.tw/')
  })

  this._request = request.defaults({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    },
    jar: this._jar
  })
}

const apis = [
  'snapup',
  'add2Cart',
  'getCartInfo',
  'prodCouponInfo',
  'order'
]

apis.forEach((api) => (API.prototype[api] = require('./' + api)))

module.exports = API
