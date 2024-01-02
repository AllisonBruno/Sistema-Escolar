const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new pass',
    database: process.env.DB_NAME
});
connection.connect((error)=>{
if (error) throw error;
console.log(`Connected to DataBase ${process.env.DB_NAME}`);
});

module.exports = connection;