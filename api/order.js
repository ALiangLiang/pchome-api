const request = require('request-promise')
const CryptoJS = require('crypto-js')

require('./../lib/jCryption.js')
const $ = global.$

const order = async function (opt) {
  console.log('test')
  try {
    const res = await request({
      url: 'https://ecssl.pchome.com.tw/sys/cflow/api/getPK',
      method: 'post',
      json: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
      },
      jar: this._jar
    })
    const AK = CryptoJS.AES.encrypt(Math.floor((Math.random() * 1000000) + 1).toString(), (new Date()).getTime().toString()) + ''
    $.jCryption.crypt.setKey(res.PK)

    const frmData = {
      'PayWay': 'COD', // 付款方式，COD為貨到付款。
      'CusName': opt.cusName, // 購買人姓名。
      'CusMobile': opt.cusMobile, // 購買人連絡電話 - 手機。
      'AcceptEDM': 'N', // 是否願意收到PChome商品特惠通知。
      'CusTel': '', // 購買人連絡電話 - 市話。
      'CusZip': opt.cusZip, // 購買人郵遞區號。
      'CusAddress': opt.cusAddress, // 購買人地址。
      'ShowCusName': 'N', // 收貨地址顯示購買人姓名。
      'ContactNo': '',
      'isSyncCust': 'N',
      'RecName': opt.RecName, // 收貨人中文姓名。
      'RecTel': '', // 收貨人連絡電話 - 市話。
      'RecMobile': opt.RecMobile, // 收貨人連絡電話 - 手機。
      'RecZip': opt.RecZip, // 收貨人郵遞區號。
      'RecAddress': opt.RecAddress, // 收貨人地址。
      'AddContact': 'N', // 資料加入收貨人通訊錄。
      'ConfirmIsLand': 'N',
      'RecMail': '',
      'PaperInvoice': 'N', // 是否願意將發票進行捐贈。
      'InvoiceType': 'P', // 個人電子發票。
      'TaxNO': '', // 發票種類為公司戶電子發票時，統一編號。
      'AddTaxNO': 'N', // 資料加入公司統編備忘錄。
      'CashPoint': '0',
      'Token': '',
      'DeviceID': '',
      'DeviceOS': '',
      'DeviceName': '',
      'DeviceOSVersion': '',
      'DeviceAppVersion': '',
      'IsSkipOTP': 'N',
      'availableDepositPoint': '0',
      'availableVoucherPoint': '0',
      'depositUsed': '0',
      'voucherUsed': '0',
      'BindMobile': ''
    }

    const enc = (text) => CryptoJS.AES.encrypt(text, AK) + ''
    const enFrmData = {}
    for (let k in frmData) {
      enFrmData[k] = enc(frmData[k])
    }
    const enAK = $.jCryption.crypt.encrypt(AK)
    const enToken = enc(res.Token)
    enFrmData.enAK = enAK
    enFrmData.Token = enToken
    console.log(enFrmData)

    if (opt.test) {
      return {}
    }

    const result = await request({
      url: 'https://ecssl.pchome.com.tw/sys/cflow/api/BigCar/BIGCAR/OrderSubmit',
      qs: {
        q: Math.random().toString(36).substring(2, 12)
      },
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
      },
      formData: {
        frmData: JSON.stringify(enFrmData),
        CouponInfo: '{"actData":[],"prodCouponData":[]}'
      },
      jar: this._jar
    })

    return JSON.parse(result)
  } catch (err) {
    console.error(err)
  }
}

module.exports = order
