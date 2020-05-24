const assert = require('assert')
const API = require('./api')

const productionId = process.env.PROD_ID

async function test () {
  console.log('env:')
  console.log('  PROD_ID:', process.env.PROD_ID)
  console.log('  COOKIE_ECC:', process.env.COOKIE_ECC)
  console.log('  COOKIE_COOKIE_ECWEBSESS:', process.env.COOKIE_COOKIE_ECWEBSESS)

  // 設定 cookie
  const api = new API({
    ECC: process.env.COOKIE_ECC,
    ECWEBSESS: process.env.COOKIE_COOKIE_ECWEBSESS
  })

  // 在加入購物車前，必須先呼叫這支 API，來取得產品狀況
  const snapupResult = await api.snapup(productionId)
  console.log('snapup result:', snapupResult)

  // 加入購物車
  const add2CartResult = await api.add2Cart(productionId, snapupResult, 1)
  console.log('add2Cart result:', add2CartResult)
  assert(Number(add2CartResult.PRODCOUNT) > 0 || Number(add2CartResult.PRODADD) > 0)

  /**
   * 取得購物車資料與送出訂單，皆須登入，所以就不測試了
   */
}

test().catch(() => process.exit(1))
