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

async function reading () {
    try{
        console.log(await readFile('test.txt','utf8'));
    }catch(err){
        console.error(err);
    };
};

reading();