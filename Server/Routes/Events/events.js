const express = require("express");
const db = require("../../../Database/Controller/events.js");
const router = express.Router();

// requests to tickets route

router.get("/", async (req, res) => {
   await db.getAllEvents({})
   .then(data => {
       res.json(data);
   })
   .catch(error=>{
       res.send(error)
   })
  });
  
module.exports = router;
