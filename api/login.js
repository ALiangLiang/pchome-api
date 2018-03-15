const login = async function (account, password) {
  await this._request({
    url: 'http://shopping.pchome.com.tw/',
    method: 'get',
    jar: this._jar
  })

  return this._request({
    url: 'https://ecvip.pchome.com.tw/ecapi/member/v2/member?op=login',
    method: 'post',
    body: `{"Account":"${account}", "Pwd":"${password}", "IsSave":0}`
  })
}

module.exports = login
