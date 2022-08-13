const fs = require('fs/promises');

fs.readFile('test.txt','utf-8')
  .then((data) => {
    console.log('promise', data)
  })
  .catch(console.error);

(async () => {
    try {
        let data = await fs.readFile('test.txt', 'utf-8');
        console.log('await', data);
    } catch (e) {
        console.error(e);
    }
})();