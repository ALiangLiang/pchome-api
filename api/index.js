const request = require('request-promise')

function API () {
  this._jar = request.jar()
  this._request = request.defaults({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    },
    jar: this._jar
  })
}

const apis = [
  'login',
  'add2Cart',
  'getCartInfo',
  'order'
]

apis.forEach((api) => (API.prototype[api] = require('./' + api)))

module.exports = API
