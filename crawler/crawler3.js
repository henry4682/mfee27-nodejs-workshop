const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');


(async () => {
  try {
    let stockNo =  fs.readFile('stock.txt','utf-8')
    let queryDate = moment().format('YYYYMMDD');

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
