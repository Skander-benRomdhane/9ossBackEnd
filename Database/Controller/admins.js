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

const addNewEvent = (
  homeTeam,
  awayTeam,
  place,
  category,
  date,
  description,
  price
) => {
  return new Promise((resolve, reject) => {
    let syntax = `INSERT INTO events(homeTeam,awayTeam,place,category,date,description,price) VALUES('${homeTeam}','${awayTeam}','${place}','${category}','${date}','${description}','${price}')`;
    db.connection.query(syntax, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(results);
      }
    });
  });
};



const deleteAllEvents = () => {
  let syntax = `DELETE FROM events`;
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

const updateEventInfo = (info) => {
  let syntax = `UPDATE events SET description = '${info.description}', date = '${info.date}' WHERE id =${info.id}`;
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

// add new admin

const addAdmin = (info) => {
  let syntax = `INSERT INTO admins(firstName,lastName,email,password) VALUES('${info.firstName}','${info.lastName}','${info.email}','${info.password}') ;`;

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

// get admin by email

const getOneAdmin = (email) => {
  let syntax = `SELECT * FROM admins WHERE email = '${email}' ;`;

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

// add a refresh token to admin

const addRefreshToken = (token,phoneNumber) => {
  return new Promise((resolve, reject) => {
      let syntax = `INSERT INTO tokens(token,id_user) VALUES('${token}',(SELECT id FROM admins WHERE email = '${email}'));`;
      db.connection.query(syntax, (err, row) => {
          if (err) {
              reject(err)
          } else {
              resolve(row)
          }
      })
  })
};

// get a admin refresh token

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



// delete a admin refresh token

const deleteAdminToken = (token) => {
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

module.exports = {
  addNewEvent,
  deleteAllEvents,
  updateEventInfo,
  addNewSeat,
  deleteAllSeats,
  addAdmin,
  getOneAdmin,
  deleteAdminToken,
  getRefreshToken,
  addRefreshToken
};
