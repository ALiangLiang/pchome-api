const add2Cart = function (productionId, quantity = 1) {
  return this._request({
    url: 'http://24h.pchome.com.tw/cart/index.php/prod/modify',
    method: 'post',
    formData: {
      data: `{"G":[],"A":[],"B":[],"TB":"24H","TP":2,"T":"ADD","TI":"${productionId}","RS":"","YTQ":${quantity}}`
    }
  })
}

module.exports = add2Cart
