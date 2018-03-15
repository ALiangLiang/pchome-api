const getCartInfo = async function () {
  const res = await this._request({
    url: 'https://ecssl.pchome.com.tw/sys/cflow/api/BigCar/BIGCAR/ItemList',
    method: 'post',
    formData: {
      data: `CouponInfo:{"prodCouponData":[]}`
    }
  })
  return JSON.parse(res)
}

module.exports = getCartInfo
