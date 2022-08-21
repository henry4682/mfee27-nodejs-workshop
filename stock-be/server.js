const express = require('express');

require ('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;

const cors = require('cors')
app.use(cors())

const mysql = require('mysql2')
let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit:10,
})
.promise();



app.set('view engine', 'pug');
app.set('views','views')

app.use((res, req, next) => {
  console.log('這是第一個中間件');
  next();
});


app.get('/', (req, res, next) => {
  console.log('這是首頁');
  res.send('Hello Express');
});

//GET stocks
app.get('/api/1.0/stocks', async(req,res,next) => {
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0]
  let [data] = await pool.execute('SELECT * FROM stocks');
  console.log('result', data)
  res.json(data);
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

