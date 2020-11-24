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
  description
) => {
  return new Promise((resolve, reject) => {
    let syntax = `INSERT INTO events(homeTeam,awayTeam,place,category,date,description) VALUES('${homeTeam}','${awayTeam}','${place}','${category}','${date}','${description}')`;
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
  let syntax = `UPDATE events
SET description = '${info.description}',
 date = '${info.date}',
WHERE id = '${id}'`;

return new Promise((resolve, reject) => {
  db.connection.query(syntax, (error, results) =>{
    if (error){
       reject(error);
    }

    else{
       resolve(results);
    }
  })
})
}




module.exports = {
  addNewEvent,
  deleteAllEvents,
  updateEventInfo,
  addNewSeat,
  deleteAllSeats
};
