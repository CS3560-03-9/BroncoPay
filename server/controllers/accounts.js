const db = require('../utils/db');

async function getUsers() {
	return await db.query('SELECT * FROM `accounts`');
}

async function getUser(handler) {
	return await db.query('SELECT * FROM `accounts` WHERE `handler` = ?', [handler]);
}

async function deleteUser(handler) {
	return await db.query('DELETE FROM `accounts` WHERE `handler` = ?', [handler]);
}

async function existsUser(handler) {
	return await db.query('SELECT EXISTS(SELECT * FROM `accounts` WHERE `handler` = ?)', [handler]);
}

async function changeBalance(handler, amount) {
	return await db.query('UPDATE `accounts` SET `balance` = `balance` + ? WHERE `handler` = ?', [amount, handler]);
}

module.exports = {
	getUsers,
	getUser,
	deleteUser,
	existsUser,
	changeBalance,
};