const snapup = async function (productionId) {
  const res = await this._request({
    url: `https://24h.pchome.com.tw/prod/cart/v1/prod/${productionId}/snapup?_callback=jsonp_cartsnapup&_=${new Date().getTime()}`,
    method: 'get',
    jar: this._jar
  })
  const data = JSON.parse(res.match(/jsonp_cartsnapup\((.*?)\)/)[1])
  // Status: 'OK', 'ProdLocked'
  if (data.Status !== 'OK' || !data.MACExpire || !data.MAC) {
    throw new Error('Cannot pass snapup API')
  }
  return data
}

module.exports = snapup
