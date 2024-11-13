const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'bronco',
    user: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    connectionLimit: 10,
})

async function query(sql) {
    try {
        const [results,] = await pool.query(sql);
        return results;
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = { query };