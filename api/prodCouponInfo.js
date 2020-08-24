const prodCouponInfo = async function (productionId) {
  return this._request({
    url: `https://ecssl.pchome.com.tw/sys/cflow/fsapi/BigCar/BIGCAR/ProdCouponInfo?_=${new Date().getTime()}`,
    method: 'get',
    jar: this._jar,
    json: true
  })
}

module.exports = prodCouponInfo
