const mysql = require("mysql2");
require("dotenv").config();

// I put this here, so that I can use it across multiple files. Use to make SQL queries to DB
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    multipleStatements: true,
});

module.exports = con;