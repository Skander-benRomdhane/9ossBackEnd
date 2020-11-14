const db = require('../Configuration/index.js');


// adding a new user

const addUser  = (info,callback) =>{
        let syntax = `INSERT INTO users(firstName,lastName,email,password,phoneNumber,profileImage) VALUES('${info.firstName}','${info.lastName}','${info.email}','${info.password}','${info.phoneNumber}','${info.profileImage}');`
        db.connection.query(syntax,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data)
            }
        });
};

// getting a user by informations

const getOneUser = (phoneNumber,callback) =>{
        let syntax = `SELECT firstName from users WHERE phoneNumber = ${phoneNumber} ;`;
        db.connection.query(syntax,(err,data)=>{
            if(err){
                callback(err,null)
            }else{
                callback(null,data)
            }
        });
};

// exporting the methods

module.exports.addUser= addUser;
module.exports.getOneUser= getOneUser;