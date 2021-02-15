const CryptoJS = require('crypto-js')

require('./../lib/jCryption.js')
const $ = global.$

const order = async function (opt) {
  try {
    const res = await this._request({
      url: 'https://ecssl.pchome.com.tw/sys/cflow/fsapi/getPK',
      method: 'post',
      json: true
    })
    const AK = CryptoJS.AES.encrypt(Math.floor((Math.random() * 1000000) + 1).toString(), (new Date()).getTime().toString()) + ''
    $.jCryption.crypt.setKey(res.PK)

    const frmData = {
      'PayWay': opt.payWay, // 付款方式
      'CusName': opt.cusName, // 購買人姓名。
      'CusMobile': opt.cusMobile, // 購買人連絡電話 - 手機。
      'AcceptEDM': 'N', // 是否願意收到PChome商品特惠通知。
      'CusTel': '', // 購買人連絡電話 - 市話。
      'CusZip': opt.cusZip, // 購買人郵遞區號。
      'CusAddress': opt.cusAddress, // 購買人地址。
      'ShowCusName': 'N', // 收貨地址顯示購買人姓名。
      'ContactNo': '',
      'isSyncCust': 'N',
      'RecName': opt.recName, // 收貨人中文姓名。
      'RecTel': '', // 收貨人連絡電話 - 市話。
      'RecMobile': opt.recMobile, // 收貨人連絡電話 - 手機。
      'RecZip': opt.recZip, // 收貨人郵遞區號。
      'RecAddress': opt.recAddress, // 收貨人地址。
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

    const result = await this._request({
      url: 'https://ecssl.pchome.com.tw/sys/cflow/fsapi/BigCar/BIGCAR/OrderSubmit',
      qs: { q: Math.random().toString(36).substring(2, 12) },
      method: 'post',
      formData: {
        frmData: JSON.stringify(enFrmData),
        CouponInfo: '{"actData":[],"prodCouponData":[]}'
      }
    })

    return JSON.parse(result)
  } catch (err) {
    console.error(err)
  }
}

module.exports = order
