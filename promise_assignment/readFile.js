const fs = require('fs');

fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
      return console.error('發生錯誤', err);
    }
    console.log(data);
  });