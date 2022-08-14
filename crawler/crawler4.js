const axios = require('axios');
const moment = require('moment');
const fs = require('fs');



let readFilePromise = new Promise ((resolve,reject) => {
  fs.readFile('stock.txt','utf-8',(err,data) => {
    if (err) {
      reject(err);
    }
    resolve(parseInt(data));
  })
});


(async () => {
  try {

    let stockNo = readFilePromise;

    let queryNameResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery?', {
      params: {
        query: await stockNo,
      },
    });

    let suggestions = queryNameResponse.data.suggestions;
    let suggestion = suggestions[0];
    if (suggestion === '(無符合之代碼或名稱)') {
      console.error(suggestion);
      throw new Error(suggestion);
    }

    // console.log(suggestions)

    let stockName = suggestion.split('\t').pop();
    console.log('stock name',stockName);

    let queryDate = moment().format('YYYYMMDD');
    let result = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?`, {
      params: {
        response: JSON,
        data: queryDate,
        stockNo : await stockNo,
      },
    });
    // console.log(result.data);
  } catch (e) {
    console.error(e);
  }
  })();