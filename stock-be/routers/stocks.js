
const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

router.get('/', async(req,res,next) => {
  console.log('/api/1.0/stocks');
    //寫法1:
    
    // let result = await pool.execute('SELECT * FROM stocks');
    // let data = result[0]
    
    //寫法2:
  
    let [data] = await pool.execute('SELECT * FROM stocks');
  
    console.log('result', data)
    
    res.json(data);
  });

router.get('/:stockId',async(req ,res ,next)=>{
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
    
    
  });

module.exports= router;