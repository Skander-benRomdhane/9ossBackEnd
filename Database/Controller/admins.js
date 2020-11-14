const mysql = require("mysql");
const db = require('../Configuration/index.js')

//add new seat
const addNewSeat = (
    type,
    Number,
    availability
) => {
    return new Promise((resolve, reject) => {
        let syntax = `INSERT INTO seats(type,Number,availability) VALUES('${type}','${Number}','${availability}')`;
        db.connection.query(syntax, (error, results) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(results);
            }
        });
    });
};

//delete all seats
const deleteAllSeats = () => {
    let syntax = `DELETE FROM seats`;
    return new Promise((resolve, reject) => {
        db.connection.query(syntax, (error, results) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(results);
            }
        });
    });
};

module.exports = {
    addNewSeat,
    deleteAllSeats
}