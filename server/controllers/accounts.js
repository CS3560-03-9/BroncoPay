const db = require("../utils/db");

async function getUsers() {
	return await db.query('SELECT * FROM `accounts`');
}

async function getUser(handler) {
	return await db.query('SELECT * FROM `accounts` WHERE `handler` = ?', [handler]);
}

async function deleteUser(handler) {
	return await db.query('DELETE FROM `accounts` WHERE `handler` = ?', [handler]);
}

module.exports = {
	getUsers,
	getUser,
	deleteUser,
};