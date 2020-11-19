const express = require("express");
const process = require('../../secrets.js')
const Auth = require('../Auth-Hash/authToken.js');
const db = require("../../../Database/Controller/thirdp.js");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

///////////////////////////////////////// access Token  /////////////////////////////////////////

const auth = (req, res, next) => {
    try{
        const {authorized} = req.headers;
        if(authorized){
            const token = authorized.split('')[1];
            const Token = process.ACCESS_TOKEN_SECRET;
            const result = jwt.verify(token, Token);
            req.user = result;
            next()
        }else{
            res.send('No Token')
        }
    }catch(err){
        res.send(err)
    }
}

///////////////////////////////////////// access Token End /////////////////////////////////////////
// here we gonna handle the third parties server requests 
// mainly gonna be signin and log out request and scanning the codes

router.post('/signin', async (req, res) => {
    console.log(req.body)
    const identifier = req.body.identifier;
    try {
        // const { error } = await loginschema.validateAsync(req.body);
        const thirdP = await db.checkThirdP(identifier);
        if (thirdP.length === 0) return res.status(500).json({message: 'Wrong id or password'});
        //check password
        const validPass = await bcrypt.compare(req.body.password, thirdP[0].password)
        console.log(validPass)
        if (validPass === false) {
            return res.json({});
        } else {
                const Token = process.ACCESS_TOKEN_SECRET;
                const token = jwt.sign({identifier: req.body.identifier},Token)
                res.json({ token })
        }
    } catch (error) {
        console.log(error)
    }
})

////////////////////////////////////////  Scan the ticket /////////////////////////////////////////

router.delete('/scan', auth,async (req,res)=>{
    console.log(req.body.code)
   const qr = await db.checkQrCode(req.body.code)
   console.log(qr)
   if(qr.length === 0){
       res.status(204).json('Code is not valid!')
   }else{
     const allowed = await db.deleteQrCode(req.body.code);
     res.status(200).json({allowed: allowed, message: 'Code is valid!' })
   }
})

router.get('/all',async (req,res)=>{
   const allCodes = await db.getAllCodes()
   console.log(allCodes)
})


module.exports = router;