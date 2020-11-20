const express = require("express");
const process = require('../../secrets.js')
const db = require("../../../Database/Controller/admins.js");
const { genSalt } = require('../Auth-Hash/salt.js');
const { genHash } = require('../Auth-Hash/hash.js');
const bcrypt = require('bcrypt');
const Auth = require('../Auth-Hash/authToken.js');
const database = require("../../../Database/Controller/events.js");
const jwt = require('jsonwebtoken');


const router = express.Router();

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

router.get("/events", async (req, res) => {
    await db.getAllEvents()
    .then(data => {
        res.json(data);
    })
    .catch(error=>{
        res.send(error)
    })
   });
 

router.post('/events/add', async (req, res) => {
    let homeTeam = req.body.homeTeam;
    let awayTeam = req.body.awayTeam;
    let place = req.body.place;
    let category = req.body.category;
    let date = req.body.date;
    let description = req.body.description;
    let price = req.body.price;
    console.log(req.body)
    await db.addNewEvent(homeTeam, awayTeam, place, category, date, description, price)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.post('/seats/add', async (req, res) => {
    let type = req.body.type;
    let number = req.body.Number;
    let availability = req.body.availability;
    console.log(req.body)
    await db.addNewSeat(type, number, place, availability)
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(error => {
            console.log(error);
        })
});

router.delete("/seats/remove",async (req, res) => {
    await db.deleteAllSeats(req.body)
        .then(results => {

            res.json("all seats deleted ");
        })
        .catch(error => {
            console.log(error);
        })
});


router.delete("/events/remove", async (req, res) => {
    await db.deleteAllEvents(req.body)
        .then(results => {
            res.json("all events deleted ");
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.put("/events/update",async (req, res) => {
    console.log(req.body)
    await db.updateEventInfo(req.body)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            console.log(error)
        })
})

// admin sign up

router.post("/register", async (req, res) => {
    console.log(req.body)
    // check if user informations exists
    const emailExists = await db.getOneAdmin(req.body.email);
    if (emailExists.length > 0) return res.json({ message: "Admin already exists" });
    try {
        //hash password
        const salt = await genSalt();
        const hashedPassword = await genHash(salt, req.body.password);
        // add the new User
        req.body.password = hashedPassword;
        const registredUser = await db.addAdmin(req.body);
        res.json(registredUser.message = "New Admin Were Added");
    } catch (error) {
        console.log(error)
    }
});

// admin log in

router.post('/signin', async (req, res) => {
    console.log(req.body)
    try {
        const admin = await db.getOneAdmin(req.body.email);
        if (admin.length === 0) return res.json({});
        //check password
        const validPass = await bcrypt.compare(req.body.password, admin[0].password)
        if (validPass === false) {
            return res.json({});
        } else {
            const Token = process.ACCESS_TOKEN_SECRET;
            const token = jwt.sign({email: req.body.email},Token)
            res.json({ token })
        }
    } catch (error) {
        console.log(error)
    }
})

// remove an admin

router.delete('/remove',async (req,res)=>{
   const removed = await db.deleteAdmin(req.body.email);
   console.log(removed)
   res.status(200).json('Admin account is deleted!')
})



///////////////////////////////////////// Log Out And Delete Token  ////////////////////////////////

router.delete('/signout', auth,(req, res) => {
    db.deleteAdminToken(req.body.token)
    res.sendStatus(204)
})

///////////////////////////////////// Log Out And Delete Token End  ////////////////////////////////

// get All Admins chats

router.get('/messages', async(req,res)=>{
   try{
   const msg = await db.getAllMessages()
       res.status(200).json(msg)
   }catch(error){
       res.status(500).send(error)
   }
})

// admin send a message

router.post('/messages/add', async(req,res)=>{
    try{
        db.addMessage(req.body.msg)
        res.status(200).json('message is registred!')
    }catch(error){
        console.log(error)
    }
});

// admin get all seats 

router.get('/seats', async (req,res)=>{
    try{
       const allSeats = await db.getAllSeats();
       res.status(200).json(allSeats)
    }catch(error){
        console.log(error)
    }
})

module.exports = router;