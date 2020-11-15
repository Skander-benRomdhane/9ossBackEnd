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

const checkUser = (phoneNumber) => {
    return new Promise((resolve, reject) => {
        let syntax = `SELECT * from users WHERE phoneNumber = '${phoneNumber}';`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        });
    });
};

// add a refresh token to user

const addRefreshToken = (token,phoneNumber) => {
    return new Promise((resolve, reject) => {
        let syntax = `INSERT INTO tokens(token,id-user) VALUES(${token},(SELECT id FROM users WHERE phoneNumber = ${phoneNumber}));`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

// get a user refresh token

const getRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        let syntax = `SELECT * FROM tokens WHERE token = ${token};`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

// delete a user refresh token

const deleteUserToken = (token) => {
    return new Promise((resolve, reject) => {
        let syntax = `DELETE FROM tokens token = '${token}';`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

// exporting the methods

module.exports = {
    addUser,
    getOneUser,
    checkUser,
    addRefreshToken,
    getRefreshToken,
    deleteUserToken
};
