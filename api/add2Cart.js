const add2Cart = async function (productionId, snapupData, quantity = 1) {
  const mainProdArr = productionId.split('-')
  mainProdArr.pop()
  const res = await this._request({
    url: 'https://24h.pchome.com.tw/fscart/index.php/prod/modify?callback=jsonp_addcart&' + new Date().getTime(),
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      origin: 'https://24h.pchome.com.tw',
      referer: 'https://24h.pchome.com.tw/prod/' + mainProdArr.join('-'), // 這支 header 是必須的
      'x-requested-with': 'XMLHttpRequest',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
    },
    form: {
      data: `{"G":[],"A":[],"B":[],"TB":"24H","TP":2,"T":"ADD","TI":"${productionId}","RS":"","YTQ":${quantity},"CAX":"${snapupData.MAC}","CAXE":"${snapupData.MACExpire}"}`
    },
    timeout: 1500
  })
  const data = JSON.parse(res.match(/jsonp_addcart\((.*?)\)/)[1])
  if (data.PRODTOTAL === 0) {
    throw new Error('Cart is empty')
  }
  return data
}

module.exports = add2Cart
