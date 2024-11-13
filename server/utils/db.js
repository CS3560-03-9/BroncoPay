const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host: 'localhost',
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	connectionLimit: 10,
})

async function query(sql) {
	try {
		const results = await pool.query(sql);
		return results[0];
	} catch (err) {
		console.log(err);
	}
}

module.exports = {query};