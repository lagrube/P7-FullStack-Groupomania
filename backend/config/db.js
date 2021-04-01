const mysql = require("mysql");

// Conexion BDD
const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  port: "3306",
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWD,
  database: process.env.SQL_DB,
  // multipleStatements: true,
});

// Test de conexion
db.connect(function (err) {
  if (err) throw err;
  console.log(
    "Connecté à la base de données MySQL ! Database : " + process.env.SQL_DB,
  );
});

module.exports = db;
