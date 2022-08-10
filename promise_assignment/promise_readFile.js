const fs = require('fs');

// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步
let readFile = (fileName, encoding) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
    })
};

readFile('te.txt', 'utf-8').then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err)
});