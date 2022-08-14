const axios = require('axios')

// 改成await版本

let stockNo = 2330;
let queryDate = 20220814;

(async() => {
  try{
    let response = await axios
    .get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${stockNo}&_=1660378514253`)
    console.log(response.data)
  } catch (e) {
    console.error(e);
  };
})()