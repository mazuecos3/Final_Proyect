const mysql = require("mysql");

// With this we open and close the conections automatically
// because if we dont don`t creathe the pool, maybe sometimes can close the conections
// max 100 conections 



const pool = mysql.createPool({
    connectionLimit: 100,
    host: "gupoe.com",
    user: "gupoecom_mazuecos3",
    password: "minimazu3",
    database: "gupoecom_valenrunner",
    charset: "utf8mb4",
    debug: false,
    multipleStatements: true,
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