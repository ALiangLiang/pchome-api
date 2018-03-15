const API = require('./api')

const config = require('./config')

Object.assign(process.env, config)

const productionId = 'DBAB04-A9008IMRM-000'

async function main () {
  try {
    const api = new API()
    await api.login(process.env.account, process.env.pwd)
    // await api.add2Cart('DYAPC0-A90084I39', 2)
    await api.add2Cart(productionId, 2)
    await api.add2Cart('DBAB2E-A9008HYRP-000', 2)
    // await api.add2Cart('DRAA6H-A90081RZN-000', 2)
    // await api.add2Cart('DAAG0U-A90084LLY-000', 2)
    const res = await api.getCartInfo()
    console.dir(res)
    console.dir(res.itemlist.houses, {depth: 8})
    console.dir(res.payment, {depth: 8})
    console.log((res.shoppingFee) ? '要運費' : '免運費')
    console.log((res.payment.COD.status === 'Y') ? '可貨到付款' : '不可貨到付款')
    // if (res.shoppingFee || res.payment.COD.status === 'N') {
    //   return console.log('取消流程')
    // }

    // const result = await api.order({
    //   test: true,
    //   cusName: 'ALiangLiang',
    //   cusMobile: '0987654321',
    //   cusZip: '40000',
    //   cusAddress: '台中市西屯區市政路',
    //   recName: 'ALiangLiang',
    //   recMobile: '0987654321',
    //   recZip: '40000',
    //   recAddress: '台中市西屯區市政路'
    // })
    //
    // if (result.status === 'ERR') {
    //   throw new Error(result.msg)
    // }
    // console.log(res)
  } catch (err) {
    console.error(err)
  }
}

main()
