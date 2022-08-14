const axios = require('axios')
const moment = require('moment')
const fs =require('fs')


let readFilePromise = new Promise ((resolve,reject) => {
  fs.readFile('stock.txt','utf-8',(err,data) => {
    if (err) {
      reject(err);
    }
    resolve(parseInt(data));
  })
});


let stockNo = readFilePromise;
let queryDate = moment().format('YYYYMMDD');

(async() => {
  try {
    let result = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?`, {
      params: {
        response: JSON,
        data: queryDate,
        stockNo : await stockNo,
      },
    });
    console.log(result.data);
  } catch (e) {
    console.error(e);
  }
  })();
