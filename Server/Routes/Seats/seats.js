const express = require("express");
const db = require("../../../Database/Configuration/index.js");
const router = express.Router();

// requests to seats route

router.get("/", async (req, res) => {
    await db.getAllSeats({})
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(error);
        })
});


router.put("/seats", async (req, res) => {
    await db.updateSeatAvailability(req.body)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router;