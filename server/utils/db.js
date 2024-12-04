const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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

module.exports = {query};