const express = require('express')
const router = express.Router();


router.post('/api/1.0/auth/register',(req, res, next) => {
    console.log("register",req.body)

    res.json({})
})

module.exports = router;
