const express = require('express');

require ('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3002 ;

//對不同源的網址做連結或共享資料
const cors = require('cors')

// const corsOptions={
//   origin:['http://localhost:3000']
// }

app.use(cors())



const pool = require('./utils/db')



app.set('view engine', 'pug');
app.set('views','views')

app.get('/ssr',(res, req, next) => {
  res.render('index',{
    stocks:['台積電','長榮航','聯發科'],
  })
});

app.use((req, res, next) => {
  console.log('這是中間件 A');
  let now = new Date();
  console.log(`有人來訪問喔 at ${now.toISOString()}`);
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

app.use((req, res, next) => {
  console.log('這是中間件 C');
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

app.get('/', (req, res, next) => {
  console.log('這是首頁');
  res.send('Hello Express');
});


//GET stocks
let stockRouter = require('./routers/stocks');
app.use("/api/1.0/stocks",stockRouter);



app.get('/test', (req, res, next) => {
  console.log('這是test頁');
  res.send('Hello Test');
});

app.get('/ssr', (req, res, next) => {
  res.render('index', {
    stocks:['台積電', '長榮航', '聯發科'],
  })
});

app.use((req, res, next) => {
  console.log('在所有路由中間件下面-> 404了!!')
  res.status(404).send('Not found 404')
})

app.listen(port, () => {
  console.log(`server start at ${port}`);
});

