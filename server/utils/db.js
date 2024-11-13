const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,
})

async function query(sql) {
    console.log(process.env.DB_USER);
    pool.query(sql, (err, results) => {
        if (err) console.log(err);
        return results;
    })
}

module.exports = { query };