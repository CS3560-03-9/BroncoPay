const mysql = require('mysql');
const pool = mysql.createPool({
    connection_limit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: 'bronco',
})

async function query(sql) {
    pool.query(sql, function (err, results) {
        if (err) console.error(err.message)
        return results;
    });
}

module.exports = { query };