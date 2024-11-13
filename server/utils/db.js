const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    port: 3306,
    database: 'bronco',
})

connection.connect(function (err, db) {})

async function query(sql) {
    connection.query(sql, function (err, results) {
        if (err) throw err;
        return results;
    });
}

module.exports = query;