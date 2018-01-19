const request = require('request-promise')

const getCartInfo = async function () {
  const res = await request({
    url: 'https://ecssl.pchome.com.tw/sys/cflow/api/BigCar/BIGCAR/ItemList',
    method: 'post',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    },
    formData: {
      data: `CouponInfo:{"prodCouponData":[]}`
    },
    jar: this._jar
  })
  return JSON.parse(res)
}

module.exports = getCartInfo
