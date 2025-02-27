const mysql = require('mysql');

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nextgen_db",
});

database.connect((err) =>{
    if(err) console.log("databse connection failed", err);
    else console.log(" conncetd databse");
});

module.exports = database;