require('dotenv').config();
const express = require("express");
const db = require("../../../Database/Controller/users.js");
const router = express.Router();
const Auth = require('../Auth-Hash/authToken.js');
const Joi = require('joi');
const { genSalt } = require('../Auth-Hash/salt.js');
const { genHash } = require('../Auth-Hash/hash.js');
const client = require('twilio')('ACedb07b5f704eea898d89c689ead49e01', '6562d2669b1ce4edcfb91afd7dd25eca');
const mail = require('./email.js');
const { jwt } = require('twilio');


////////////////////////////////////// joi schema //////////////////////////////////////////

const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(6).max(18).uppercase(1).required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }),
    profileImage: Joi.string().allow('').optional()
})

////////////////////////////////////////// Sign Up //////////////////////////////////////////

router.post("/add", async (req, res) => {
    // check if user informations exists
    console.log(req.body);
    const phoneExists = await db.getOneUser(req.body.phoneNumber);
    console.log(phoneExists)
    if (phoneExists.length > 0) return res.json({ message: "User already exists" });
    if (req.body.code === `${req.body.firstName[0].charCodeAt(0)}${req.body.phoneNumber[0].charCodeAt(0)}`) {
        try {
            //hash password
            const salt = await genSalt();
            const hashedPassword = await genHash(salt, req.body.password);
            // add the new User
            req.body.password = hashedPassword;
            const { error } = await schema.validateAsync(req.body);
            const registredUser = await db.addUser(req.body);
            mail.sendEmail(req.body.firstName, req.body.password)
            res.json(registredUser);

        } catch (error) {
            if (error.isJoi === true) res.status(500).json(error.details[0].message);
            next(error);
        }
    } else {
        res.status(401).send('Code is not valid')
    }
});

router.post("/verify", async (req, res) => {
    //sending a verification SMS
    client.messages.create({
        to: `${req.body.phoneNumber}`,
        from: '+2160001110',
        body: `Your verification code is : ${req.body.firstName[0].charCodeAt(0)}${req.body.phoneNumber[0].charCodeAt(0)}`
    })
    res.status(200).json('SMS sent!')
})

////////////////////////////////////////// Sign Up End //////////////////////////////////////////

//////////////////////////////////////////// Log In ////////////////////////////////////////////


router.post('/signin', async (req, res) => {
    const phone = req.body.phoneNumber;
    const password = req.body.password;

    await db.checkUser(phone, password)
        .then((data) => {
            res.status(200).json(data);
            const Token = process.env.ACCESS_TOKEN_SECRET;
            const accessToken = Auth.accessToken(req.body.phoneNumber, Token);
            const refToken = process.env.ACCESS_TOKEN_REFRESH;
            const refreshToken = Auth.refreshToken(req.body.phoneNumber, refToken)
            const UserToken = db.addRefreshToken(refreshToken,req.body.phoneNumber);
            res.json({ accessToken, refreshToken })
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

///////////////////////////////////////// Log In End /////////////////////////////////////////

///////////////////////////////////////// Refresh Token Post /////////////////////////////////////////

router.post('/token', async (req, res) => {
    const refreshTokens = req.body.token
    if (refreshTokens == null) return res.send(401)
    const tokenCheck = await db.getRefreshToken(refreshTokens)
    if (!tokenCheck.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshTokens, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accesToken = Auth.accessToken(user.phoneNumber, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accesToken })
    })
})

///////////////////////////////////////// Refresh Token End /////////////////////////////////////////

///////////////////////////////////////// Log Out And Delete Token  ////////////////////////////////

router.delete('/logout', (req, res) => {
    tokenCheck = tokenCheck.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

///////////////////////////////////// Log Out And Delete Token End  ////////////////////////////////


module.exports = router;