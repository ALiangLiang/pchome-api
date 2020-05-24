const getCartInfo = async function () {
  const res = await this._request({
    url: 'https://ecssl.pchome.com.tw/sys/cflow/api/BigCar/BIGCAR/ItemList',
    method: 'post',
    json: true,
    formData: {
      data: `CouponInfo:{"prodCouponData":[]}`
    }
  })
  return res
}

module.exports = getCartInfo
