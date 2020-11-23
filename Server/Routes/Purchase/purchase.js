const express = require("express");
const db = require("../../../Database/Controller/purchase.js");
const router = express.Router();
const qr = require("qrcode");
const paypal = require('paypal-rest-sdk')
const moment = require('moment')

// here the verification of paypal will happen
router.get('/success', (req, res) => {
    const paymentInfo = {
        paymentId: req.query.paymentId,
        PayerID: req.query.PayerID
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
    paypal.payment.execute(paymentInfo.paymentId, payment, (err, pay) => {
        if (err) console.log(err)
        console.log(pay, 'payment done!')
    })
})



// waiting for confirmation from paypall then running the qr generator 
router.post("/pay", async (req, res) => {
    var possible = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f", "g", "h", "e", "j", "k", "m", "n", "o", "l", "y", "x", "z"]
    var newCode = '';
    // const a = await payment(req,res)
    // console.log(a)
    // get all codes from database and shuffle the array of codes and compare if it exists in the database else make a qr code out of that shuffled code
    for (let i = possible.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let temp = possible[i]
        possible[i] = possible[j]
        possible[j] = temp
    }
    const codeList = await db.getAllCodes()
    function generateCode() {
        let onePossibility = possible.toString().replace(/,/g, '');
        if (codeList.includes(onePossibility)) {
            return generateCode()
        } else {
            let date = moment().add(10, 'days').calendar();
            newCode = onePossibility
            db.addNewCode(newCode)
            db.addPurchase(newCode, date, req.body.price, req.body.phoneNumber)
        }
    }
    generateCode()
    console.log(newCode)
    await qr.toDataURL(newCode, (err, src) => {
        if (err) res.send("Error occured");
        res.json({src})
    });
});

const payment = (req, res) => {

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
            "return_url": "http://localhost:5000/purchase/success",
            "cancel_url": "http://localhost:5000/purchase/fail"
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
            console.log(error)
        } else {
            console.log("Create Payment Response");
            for (let l in payment.links) {
                if (payment.links[l].rel == "approval_url") {
                    console.log('success')
                    console.log(payment)
                }
            }
        }
    });
};

// get the purchase's history 

router.post('/history', async (req, res) => {
    const phone = req.body.numberPhone;
    var counter = 0;
    const history = await db.getAllPurchases(phone)
     await history.map(info => {

         qr.toDataURL(info.code)
         .then(src =>{
             info.code = src
             counter ++
             if( counter === history.length){
               res.status(200).json(history)
             }
         })
})
})
module.exports = router;