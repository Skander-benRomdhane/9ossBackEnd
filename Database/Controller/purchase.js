const db = require('../Configuration/index.js')


const getAllPurchases = (numberPhone) =>{
        return new Promise((resolve,reject)=>{
            let syntax = `SELECT * from purchases WHERE user_id = (SELECT id FROM users WHERE phoneNumber = '${numberPhone}')`;
            db.connection.query(syntax,(err,rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
}
// add a new purchase

const addPurchase = (code, date, ammount, phone) =>{
    return new Promise((resolve,reject)=>{
        let syntax= `INSERT INTO purchases(code,date,ammount,user_id) VALUES('${code}', '${date}', '${ammount}', (SELECT id FROM users WHERE phoneNumber = '${phone}'))`;
        db.connection.query(syntax,(err,row)=>{
            if(err){
                reject(err)
            }else{
                resolve(row)
            }
        })
    })
}

// get all weekly codes from database

const addNewCode = (newCode) =>{
    return new Promise((resolve,reject)=>{
        let syntax = `INSERT INTO weekCodes(codes) VALUES('${newCode}')`;
        db.connection.query(syntax,(err,row)=>{
            if(err){
                reject(err)
            }else{
                resolve(row)
            }
        })
    })
}

const getAllCodes = () =>{
    return new Promise((resolve,reject)=>{
        let syntax = `SELECT * FROM weekCodes`;
        db.connection.query(syntax,(err,rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}

const updateSeat = (number, phone) =>{
    return new Promise((resolve,reject)=>{
        let syntax = `UPDATE seats SET availability= 'false', userid = (SELECT id from users WHERE phoneNumber = '${phone}') WHERE number ='${number}'`;
        db.connection.query(syntax,(err,row)=>{
            if(err){
                reject(err)
            }else{
                resolve(row)
            }
        })
    })
}

module.exports = {
    addPurchase,
    getAllPurchases,
    getAllCodes,
    addNewCode,
    updateSeat
};