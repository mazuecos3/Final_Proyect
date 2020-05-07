const mysql = require("mysql");

// Con esto lo que hacemos es abrir y cerrar conexiones automaticamente
// para que no explote, un maximo de 100 conexiones

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "gupoe.com",
  user: "gupoecom_mazuecos3",
  password: "minimazu3",
  database: "gupoecom_valenrunner",
  charset: "utf8mb4",
  debug: false,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
  }
  if (connection) connection.release();
  return;
});

module.exports = pool;
