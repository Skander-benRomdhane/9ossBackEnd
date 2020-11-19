const mysql = require("mysql");
const db = require('../Configuration/index.js')

//get all seats
const getAllSeats = function () {
    return new Promise((resolve, reject) => {
        db.connection.query(`SELECT * FROM  seats`, (error, results) => {
            if (error) {
                reject(error);
            }
                resolve(results);
        });
    });
};

//update seat by aviability
const updateSeatAvailability = (av) => {
    let syntax = `UPDATE seats
  SET availability = '${av.availability}',
  WHERE id = '${id}'`;

    return new Promise((resolve, reject) => {
        db.connection.query(syntax, (error, results) => {
            if (error) {
                reject(error);
            }

            else {
                resolve(results);
            }
        })
    })
};


module.exports = {
    getAllSeats,
    updateSeatAvailability
};