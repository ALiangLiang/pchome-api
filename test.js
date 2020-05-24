const assert = require('assert')
const API = require('./api')

const productionId = process.env.PROD_ID

async function test () {
  // 設定 cookie
  const api = new API({
    ECC: process.env.COOKIE_ECC,
    COOKIE_ECWEBSESS: process.env.COOKIE_COOKIE_ECWEBSESS
  })

  // 在加入購物車前，必須先呼叫這支 API，來取得產品狀況
  const snapupResult = await api.snapup(productionId)

  // 加入購物車
  const add2CartResult = await api.add2Cart(productionId, snapupResult, 1)
  assert(add2CartResult.PRODCOUNT > 0)

  /**
   * 取得購物車資料與送出訂單，皆須登入，所以就不測試了
   */
}

test()
