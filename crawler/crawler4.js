const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');


(async () => {
  try {
    let stockNo = await fs.readFile('stock.txt','utf-8')
    // let queryDate = moment().format('YYYYMMDD');
    let queryNameResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery?query=2330')
    // let result = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?`, {
    //   params: {
    //     response: JSON,
    //     data: queryDate,
    //     stockNo : stockNo,
    //   },
    // });
    // console.log(result.data);
  } catch (e) {
    console.error(e);
  }
  })();