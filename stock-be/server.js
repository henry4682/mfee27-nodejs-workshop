const express = require('express');

const app = express();

require ('dotenv').config();

const port = process.env.SERVER_PORT || 3002 ;

//對不同源的網址做連結或共享資料
const cors = require('cors')


// const corsOptions={
//代表只限定'http://localhost:3000'前台可以跨源
//   origin:['http://localhost:3000']
//若無限定則預設origin:"*" 代表對全域開放

// }
//若要使用 則app.use(cors(corsOptions))
app.use(cors())



const pool = require('./utils/db')

//讓express 認得json
app.use(express.json())


app.set('view engine', 'pug');
app.set('views','views')

//設置靜態檔案
const path =require('path')
app.use(express.static(path.join(__dirname)))

//測試不同源的
app.get('/ssr',(req, res, next) => {
  res.render('index',{
    stocks: ['台積電', '長榮航', '聯發科'],
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

//API
//GET stocks 的 資料
let stockRouter = require('./routers/stocks');
app.use("/api/1.0/stocks",stockRouter);

let authRouter = require('./routers/auth');
const { dirname } = require('path');
app.use(authRouter)



app.get('/test', (req, res, next) => {
  console.log('這是test頁');
  res.send('Hello Test');
});

app.get('/ssr', (req, res, next) => {
  res.render('index', {
    stocks:['台積電', '長榮航', '聯發科'],
  })
});


// 在之前所有路由中間件都沒接到response後會執行的
app.use((req, res, next) => {
  res.status(404).send('Not found 404')
  console.log('在所有路由中間件下面-> 404了!!')
})

app.listen(port, () => {
  console.log(`server start at ${port}`);
});

