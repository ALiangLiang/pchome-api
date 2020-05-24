# (非官方) PChome API

![npm](https://img.shields.io/npm/v/pchome-api)
![NPM](https://img.shields.io/npm/l/pchome-api)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ALiangLiang/pchome-api/Node.js-CI)

一套 Nodejs Package，可以透過 API 來完成自動訂購。

## 簡介

基本上能做到從加入購物車到結帳的流程，不支援線上付款但可以貨到付款。如果還需要其他文件需求，歡迎發 ISSUE 叫我更新。

## APIs

- snapup - 確認目前產品的狀態。  
      照字面意思應該為加入購物車前的狀態確認，如果為可訂購狀態，會返回兩項資料 `MAC`、`MACExpire`，用來給 `add2Cart` API 使用。
- add2Cart - 將產品加入購物車。  
      給入產品 ID 和數量，例如「DYAPC0-A90084I39-000」，注意最後一部分是規格編號，通常不會在網址上出現。
- getCartInfo - 取得購物車當前資訊。
- order - 訂購。  
      目前只支援貨到付款，倘若目前訂單不支援貨到付款則無法使用。(例如訂單中的貨物從不同倉庫發貨的情況)

## 使用說明

```shell
npm install pchome-api
```

- 因為懶得寫，各位就直接參考 [example.js](example.js) 吧。
- PCHome 採用 Google reCaptcha 來保護它的驗證程序，所以目前只能手動登入並設定 cookies。
- PCHome 在面對高頻率請求有流量管制，所以建議不要過於積極的發送請求，不然會有暫時性的 403 forbidden，如果有測試出最佳的請求頻率，歡迎發 ISSUE。

## 聲明

此 API 不保證流程能完全符合 PChome 官方，僅測試過可以成功訂購，所以若無法使用或造成任何損失，我可不負責任的喔。
