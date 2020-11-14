const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "koss",
  insecureAuth: true,
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
  });


module.exports.connection = connection;