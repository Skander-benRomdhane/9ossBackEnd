const express = require("express");
const process = require('../../secrets.js')
const Auth = require('../Auth-Hash/authToken.js');
const db = require("../../../Database/Controller/thirdp.js");
const bcrypt = require('bcrypt');
const router = express.Router();


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
            //create and assign a token
            // const Token = process.ACCESS_TOKEN_SECRET;
            // const accessToken = Auth.accessToken(req.body.identifier, Token);
            // const refToken = process.REFRESH_TOKEN_SECRET;
            // const refreshToken = Auth.refreshToken(req.body.identifier, refToken)
            // const UserToken = db.addRefreshToken(refreshToken, req.body.identifier);
            // getting the history of the user from  database and send it to user profile
            // res.json({ accessToken, refreshToken })
            res.status(200).json(process.ACCESS_TOKEN_SECRET)
        }
    } catch (error) {
        console.log(error)
    }
})

///////////////////////////////////////// Refresh Token Post /////////////////////////////////////////

router.post('/token', async (req, res) => {
    const refreshTokens = req.body.token
    if (refreshTokens == null) return res.send(401)
    const tokenCheck = await db.getRefreshToken(refreshTokens)
    if (!tokenCheck.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshTokens, process.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accesToken = Auth.accessToken(user.identifier, process.ACCESS_TOKEN_SECRET)
        res.json({ accesToken })
    })
})

///////////////////////////////////////// Refresh Token End /////////////////////////////////////////

///////////////////////////////////////// Log Out And Delete Token  ////////////////////////////////

router.delete('/signout', (req, res) => {
    db.deletethirdPToken(req.body.token)
    res.sendStatus(204)
})

///////////////////////////////////// Log Out And Delete Token End  ////////////////////////////////

////////////////////////////////////////  Scan the ticket /////////////////////////////////////////

router.delete('/scan',async (req,res)=>{
   const qr = await db.checkQrCode(req.body.code)
   if(!qr){
       res.status(204).json('there is no code!')
   }else{
     const allowed = await db.deleteQrCode(req.body.code);
     res.status(200).json({allowed: allowed, message: 'Code is valid!' })
   }
})


module.exports = router;