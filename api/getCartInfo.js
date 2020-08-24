const getCartInfo = async function (formData) {
  const res = await this._request({
    url: 'https://ecssl.pchome.com.tw/sys/cflow/fsapi/BigCar/BIGCAR/ItemList',
    method: 'post',
    json: true,
    formData
  })
  return res
}

module.exports = getCartInfo
