// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',  // Change this to your MySQL host if it's remote
  user: 'root',
  password: '',
  database: 'discord_clone',
});

module.exports = connection;
