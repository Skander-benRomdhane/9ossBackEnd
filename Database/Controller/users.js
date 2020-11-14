const db = require('../Configuration/index.js');


// adding a new user

const addUser = (info) => {
    return new Promise((resolve, reject) => {
        let syntax = `INSERT INTO users(firstName,lastName,email,password,phoneNumber,profileImage) VALUES('${info.firstName}','${info.lastName}','${info.email}','${info.password}','${info.phoneNumber}','${info.profileImage}');`
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        });
    });
};

// getting a user by informations

const getOneUser = (phoneNumber) => {
    return new Promise((resolve, reject) => {
        let syntax = `SELECT firstName from users WHERE phoneNumber = ${phoneNumber} ;`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        });
    });
};

// check a registred User informations

const checkUser = (phoneNumber,password) => {
    return new Promise((resolve, reject) => {
        let syntax = `SELECT firstName from users WHERE phoneNumber = ${phoneNumber} AND password = ${password};`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        });
    });
};



// exporting the methods

module.exports = {
    addUser,
    getOneUser,
    checkUser
};
