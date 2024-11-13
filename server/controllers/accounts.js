const db = require("../utils/db");

async function getAllUsers() {
	return await db.query('SELECT * FROM `account`');
}

async function getUser(handler) {
	return await db.query('SELECT * FROM `account` WHERE `handler` = ?', [handler]);
}

async function deleteUser(handler) {
	return await db.query('DELETE FROM `account` WHERE `handler` = ?', [handler]);
}

module.exports = {
	getAllUsers,
	getUser,
	deleteUser,
};