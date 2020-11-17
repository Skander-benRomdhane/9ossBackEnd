const express = require("express");
const db = require("../../../Database/Controller/seats.js");
const router = express.Router();

// requests to seats route

router.get("/", async (req, res) => {
    await db.getAllSeats()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(error);
        })
});


router.put("/change", async (req, res) => {
    await db.updateSeatAvailability(req.body)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            console.log(error)
        })
})


module.exports = router;