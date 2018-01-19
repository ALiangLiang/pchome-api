const request = require('request-promise')

const add2Cart = function (productionId, quantity = 1) {
  return request({
    url: 'http://24h.pchome.com.tw/cart/index.php/prod/modify',
    method: 'post',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    },
    formData: {
      data: `{"G":[],"A":[],"B":[],"TB":"24H","TP":2,"T":"ADD","TI":"${productionId}-000","RS":"","YTQ":${quantity}}`
    },
    jar: this._jar
  })
}

module.exports = add2Cart
