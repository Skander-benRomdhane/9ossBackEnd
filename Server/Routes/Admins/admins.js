const express = require("express");
const db = require("../../../Database/Controller/admins.js");
const router = express.Router();

router.post('/add', async (req, res) => {
    let homeTeam = req.body.homeTeam;
    let awayTeam = req.body.awayTeam;
    let place = req.body.place;
    let category = req.body.category;
    let date = req.body.date;
    let description = req.body.description;
    console.log(req.body)
    await db.addNewEvent(homeTeam, awayTeam, place, category, date, description)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});


router.post('/newSeats', async (req, res) => {
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

router.delete("/seats", async (req, res) => {
    await db.deleteAllSeats(req.body)
        .then(results => {

            res.json("all seats deleted ");
        })
        .catch(error => {
            console.log(error);
        })
});


router.delete("/delete", async (req, res) => {
    await db.deleteAllEvents(req.body)
        .then(results => {

            res.json("all events deleted ");
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.put("/change", async (req, res) => {
    await db.updateEventInfo(req.body)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            console.log(error)
        })
})

// admin sign up

router.post("/signup", async (req, res) => {
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
        if (error.isJoi === true) res.status(500).json(error.details[0].message);
    }
});

// admin log in

router.post('/signin', async (req, res) => {
    try {
        const admin = await db.getOneAdmin(req.body.email);
        if (!admin) return res.json({});
        //check password
        const validPass = await bcrypt.compare(req.body.password, admin[0].password)
        console.log(validPass)
        if (validPass === false) {
            return res.json({});
        } else {
            res.status(200).json('Logged In')
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;