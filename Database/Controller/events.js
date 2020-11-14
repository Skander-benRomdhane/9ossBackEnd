const mysql = require("mysql");
const db = require('../Configuration/index.js')
 


const getAllEvents = function () {
    return new Promise((resolve, reject) => {
        // let syntax = `SELECT * FROM  events`
      db.connection.query(`SELECT * FROM  events`, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  };
  
  module.exports = {
    getAllEvents,
  };