const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

const bcrypt = require('bcrypt')

router.post('/api/1.0/auth/register', async (req, res, next) => {
    console.log("register",req.body)
    // TODO:驗證來自前端的資料


    // 檢查 email 有沒有重複
    //METHOD 1: DB把EMAIL欄設UNIQUE
    //METHOD 2:
    let [members] = await pool.execute('SELECT * FROM members WHERE email = ?',[req.body.email])
    if (members.length === 0 ) { 
        //密碼雜湊 hash
        let hashedPassword = await bcrypt.hash(req.body.password, 10); 
        //資料存到資料庫
        let result = await pool.execute('INSERT INTO members (email, password, name) VALUES(?,?,?);',[req.body.email, hashedPassword, req.body.name])
        console.log('insert new member',result)
        //回復前端
        res.json({message:'ok'})
    }else{
        //有資料-->註冊過
        return res.status(400).json({message:'這個 email 已經註冊過'});
    }
    
    // res.json(req.body)
})

module.exports = router;
