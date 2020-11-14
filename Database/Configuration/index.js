const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "9oss",
  insecureAuth: true,
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
  });


module.exports.connection = connection;