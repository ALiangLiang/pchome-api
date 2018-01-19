const request = require('request-promise')

const login = require('./login')
const add2Cart = require('./add2Cart')
const getCartInfo = require('./getCartInfo')
const order = require('./order')

function API () {
  this._jar = request.jar()
}

API.prototype.login = login
API.prototype.add2Cart = add2Cart
API.prototype.getCartInfo = getCartInfo
API.prototype.order = order

module.exports = API
