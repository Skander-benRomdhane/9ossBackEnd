const express = require("express");
const db = require("../../../Database/Controller/admins.js");
const { genSalt } = require('../Auth-Hash/salt.js');
const { genHash } = require('../Auth-Hash/hash.js');
const bcrypt = require('bcrypt');

const router = express.Router();

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

router.delete("/seats/remove", async (req, res) => {
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

router.put("/events/update", async (req, res) => {
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
        res.json(registredUser);
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
            res.status(200).json(admin)
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

module.exports = router;