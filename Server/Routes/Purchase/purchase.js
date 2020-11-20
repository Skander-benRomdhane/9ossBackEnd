const express = require("express");
const db = require("../../../Database/Controller/purchase.js");
const router = express.Router();
const qr = require("qrcode");
const paypal = require('paypal-rest-sdk')

// here the verification of paypal will happen
router.get('/success',(req,res)=>{
    const paymentInfo = {
        paymentId : req.query.paymentId,
        PayerID : req.query.PayerID
    }
    const payment = {
        "payer_id": paymentInfo.PayerID,
        "transaction": [{
            "amount": {
                "currency": "EUR",
                "total": "10.00"
            }
        }]
    }
    paypal.payment.execute(paymentInfo.paymentId,payment,(err,pay)=>{
        if(err) console.log(err)
        console.log(pay,'payment done!')
    })
})



// waiting for confirmation from paypall then running the qr generator 
router.post("/pay",(req, res) => {

    const a = payment(req,res)
    console.log(a)
    const code = req.body.code;
    if ((code.length === 0) || (!code)) res.json("Empty Data!");
    qr.toDataURL(code, (err, src) => {
        if (err) res.send("Error occured");
        res.json(src)
    });
});
 
const payment = (req,res) =>{

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
  });

  var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:5000/success",
          "cancel_url": "http://localhost:5000/fail"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "item",
                  "sku": "item",
                  "price": req.body.price,
                  "currency": "EUR",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "EUR",
              "total": req.body.price
          },
          "description": "This is the payment description."
      }]
  };
   
   
  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          for(let l in payment.links){
              if(payment.links[l].rel == "approval_url"){
                  console.log('success')
                  console.log(payment)
              }
          }
      }
  });
};

// get the purchase's history 

router.post('/history', async (req,res)=>{
    const phone = req.body.numberPhone;
   const history = await db.getAllPurcahses(phone)
    res.status(200).json(history)
})

module.exports = router;