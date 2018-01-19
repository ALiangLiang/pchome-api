const request = require('request-promise')

const login = async function (account, password) {
  await request({
    url: 'http://shopping.pchome.com.tw/',
    method: 'get',
    jar: this._jar
  })

  return request({
    url: 'https://ecvip.pchome.com.tw/ecapi/member/v2/member?op=login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    },
    body: `{"Account":"${account}", "Pwd":"${password}", "IsSave":0}`,
    jar: this._jar
  })
}

module.exports = login
