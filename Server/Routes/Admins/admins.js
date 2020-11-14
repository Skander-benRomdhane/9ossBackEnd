const express = require("express");
const db = require("../../../Database/Configuration/index.js");
const router = express.Router();

// requests to tickets route
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

module.exports = router;