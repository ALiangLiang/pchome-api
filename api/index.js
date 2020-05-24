const request = require('request-promise')
const tough = require('tough-cookie');

function API (cookies) {
  // 初始化 cookie jar
  this._jar = request.jar()

  // 設置 cookies
  Object.keys(cookies).forEach((cookieKey) => {
    const cookieValue = cookies[cookieKey]
    const ck = tough.Cookie.fromJSON({
      domain: 'pchome.com.tw',
      hostOnly: false,
      httpOnly: true,
      key: cookieKey,
      path: '/',
      secure: false,
      session: false,
      value: cookieValue,
    })
    this._jar.setCookie(ck, 'https://24h.pchome.com.tw/')
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
  'order'
]

apis.forEach((api) => (API.prototype[api] = require('./' + api)))

module.exports = API
