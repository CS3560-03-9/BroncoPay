const db = require('../utils/db');

async function getBusinesses() {
	return await db.query('SELECT * FROM `businesses`');
}

async function getBusiness(handler) {
	return await db.query('SELECT * FROM `businesses` WHERE `handler` = ?', [handler]);
}

async function businessExists(handler) {
	return await db.query('SELECT EXISTS(SELECT * FROM `businesses` WHERE `handler` = ?)', [handler]);
}

module.exports = {
	getBusinesses,
	getBusiness,
	businessExists,
};