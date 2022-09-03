const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

const bcrypt = require('bcrypt')

const {body, validationResult} =require('express-validator')

const registerRules=[
    //email是否合法
    body('email').isEmail().withMessage('Email欄位請填寫正確'),
    //檢查密碼長度
    body('password').isLength({ min:8 }).withMessage('密碼長度至少為 8'),
    //confirm password
    body('confirmPassword').custom((value,{ req })=>{
        return value === req.body.password;
    }).withMessage('密碼驗證不一致')
]


const path =require('path')

//圖片用的
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname,'..','public','uploads'))
    },
    filename: function(req, file,cb) {
        console.log('file',file)
        const ext = file.originalname.split('.').pop();
        cb(null, `member-${Date.now()}.${ext}`)
    }
})

const uploader = multer({
    storage : storage,
    fileFilter:function(req,file,cb) {
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
            cb(new Error('上船的檔案類型不接受'), false);
        }else{
            cb(null, true);
        }
    },
    limits:{
        fileSize: 200 * 1024,
    }
})


router.post('/api/1.0/auth/register', registerRules, async (req, res, next) => {
    console.log("register",req.body)



    // 驗證來自前端的資料
    const validateResult =validationResult(req);
    console.log('validateResult',validateResult);
    if(!validateResult.isEmpty()) {
        return res.status(400).json({errors:validateResult.array()})
    }

    // 檢查 email 有沒有重複
    //METHOD 1: DB把EMAIL欄設UNIQUE
    //METHOD 2: 自己檢查 --> 去資料庫看email存不存在
    let [members] = await pool.execute('SELECT * FROM members WHERE email = ?',[req.body.email])
    if(members.length>0){
       //有資料-->註冊過
       return res.status(400).json({message:'這個 email 已經註冊過'});
    }
    //密碼雜湊 hash
    let hashedPassword = await bcrypt.hash(req.body.password, 10); 
    //資料存到資料庫
    let filename = req.file ? '/uploads/' + req.file.filename : '';
    let result = await pool.execute('INSERT INTO members (email, password, name) VALUES(?,?,?, ?);',[req.body.email, hashedPassword, req.body.name, filename])
    console.log('insert new member',result)
    //回復前端
    res.json({message:'ok'})

})
module.exports = router;
