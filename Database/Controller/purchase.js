const db = require('../Configuration/index.js')


const getAllPurchases = (numberPhone) =>{
        return new Promise((resolve,reject)=>{
            let syntax = `SELECT * from purchases WHERE user_id = '${numberPhone}'`;
            db.connection.query(syntax,(err,rows)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
}


module.exports = {
    getAllPurchases
};