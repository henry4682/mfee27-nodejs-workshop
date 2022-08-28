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



const mysql = require('mysql2')
const { application }= require('express')
let pool = mysql
.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit:10,
  dateStrings:true,
})
.promise();



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
app.get('/api/1.0/stocks', async(req,res,next) => {
console.log('/api/1.0/stocks');
  //寫法1:
  
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0]
  
  //寫法2:

  let [data] = await pool.execute('SELECT * FROM stocks');

  console.log('result', data)
  
  res.json(data);
})

app.get('/api/1.0/stocks/:stockId',async(req ,res ,next)=>{
  const stockId=req.params.stockId

  //去資料庫把資料撈出來
  // let [data] = await pool.execute(`SELECT * FROM stock_prices WHERE stock_id=?`,[stockId]);
   //  把取得的資料回覆給前端
  

   //分頁
  let page= req.query.page || 1;
  const perPage = 5
  let [total]=await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=? ',[stockId])

  total=total[0].total

  let lastPage = Math.ceil(total/perPage)

  const offset = perPage * (page-1)

  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id =? ORDER BY date LIMIT ? OFFSET ?',[stockId,perPage,offset])
  
  res.json({
    pagination:{
      total,
      perPage,
      page,
      lastPage
    },
    data,
  });
  
  
})

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

