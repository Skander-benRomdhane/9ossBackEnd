const db = require('../Configuration/index.js');

// check a registred thirdP informations

const checkThirdP = (identifier) => {
    return new Promise((resolve, reject) => {
        let syntax = `SELECT * from thirdp WHERE identifier = '${identifier}';`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        });
    });
};

// add a refresh token to thirdp

const addRefreshToken = (token,identifier) => {
    return new Promise((resolve, reject) => {
        let syntax = `INSERT INTO tokens(token,id_user) VALUES('${token}',(SELECT id FROM thirdp WHERE identifier = '${identifier}'));`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

// get a thirdp refresh token

const getRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        let syntax = `SELECT * FROM tokens WHERE token = '${token}';`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

// delete a thirdp refresh token

const deleteUserToken = (token) => {
    return new Promise((resolve, reject) => {
        let syntax = `DELETE FROM tokens WHERE token = '${token}';`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

const checkQrCode = (code) => {
    return new Promise((resolve, reject) => {
        let syntax = `Select * FROM weekCodes WHERE codes = '${code}';`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

const deleteQrCode = (code) => {
    return new Promise((resolve, reject) => {
        let syntax = `DELETE  FROM weekCodes WHERE codes = '${code}';`;
        db.connection.query(syntax, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
};

const getAllCodes = () =>{
    return new Promise((resolve,reject)=>{
        let syntax = `SELECT * FROM weekCodes`;
        db.connection.query(syntax,(err,row)=>{
            if(err){
                reject(err)
            }else{
                resolve(row)
            }
        })
    })
};


module.exports = {
    checkThirdP,
    addRefreshToken,
    getRefreshToken,
    deleteUserToken,
    checkQrCode,
    deleteQrCode,
    getAllCodes

};
