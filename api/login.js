// 已廢棄，目前 PCHome 採用 reCaptcha 加入登入程序，這支舊版 API 也無法使用了。
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
