// 用 axios 去抓目標資料;

const axios = require('axios');
//開始抓資料
axios
  .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378514253')
  .then((response) => {
    console.log(response);
    // console.log(response.data);
  })
  .catch((error) => {
    console.error(error)
  })