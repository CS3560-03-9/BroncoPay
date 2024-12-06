const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: 10,
});

async function query(sql, data) {
	try {
		const results = await pool.execute(sql, data);
		return results[0];
	} catch (err) {
		console.log(err);
	}
}

async function checkConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('Database connection successful');
        return true;
    } catch (err) {
        console.error('Database connection failed:', err);
        return false;
    }
}

module.exports = {query, checkConnection};