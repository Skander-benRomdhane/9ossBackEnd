const express = require("express");
const db = require("../../../Database/Controller/users.js");
const router = express.Router();
const Joi = require('joi');

// joi schema

const schema = Joi.object().keys({
    firstName: Joi.required(),
    lastName: Joi.required(),
    password: Joi.required(),
    // repeatPassword: Joi.ref('password'),
    phoneNumber: Joi.required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }),
    profileImage: Joi.string().allow('').optional()
})

// requests to user route

router.post('/add', (req, res) => {

    req.body.firstName === req.query.firstName
    const result = schema.validateAsync(req.body);
    const { value, error } = result;
    const valid = error;

    if (!valid) {
        res.status(422).json({ message: 'invalid request' })
    } else if (valid === 'ok') {
        // do the magic
        db.getOneUser(req.body.phoneNumber,(err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    // hash the password and salt it then add a new user
                    console.log(result)
                    db.addUser(req.body, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(result)
                        }
                    })
                } else {
                    res.status(500).json('User does already exists')
                }
            }
        })

    }

    // check if user informations exists



})


module.exports = router;