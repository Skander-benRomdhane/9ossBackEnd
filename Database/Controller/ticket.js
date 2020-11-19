const db = require('../Configuration/index.js');


const getUserHistory = (phoneNumber) => {
    return new Promise((resolve, reject) => {
        let syntax = `SELECT * FROM purchases WHERE id = (SELECT id FROM users WHERE phoneNumber = '${phoneNumber}') ;`;
        db.connection.query(syntax, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        });
    });
}


















module.exports = {
    getUserHistory
}