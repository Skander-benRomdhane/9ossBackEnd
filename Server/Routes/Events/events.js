const express = require("express");
const db = require("../../../Database/Controller/events.js");
const router = express.Router();


router.get("/", async (req, res) => {
   await db.getAllEvents({})
   .then(data => {
       res.json(data);
   })
   .catch(error=>{
       console.log(error);
   })
  });
  






  


module.exports = router;
// requests to tickets route