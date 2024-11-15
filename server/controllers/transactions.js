const db = require("../utils/db");

async function getTransactionsByAccount(handler) {
	return await db.query('SELECT * FROM `transactions` WHERE `from_handler` = ? OR `to_handler` = ?', [handler, handler]);
}

async function createTransaction(body) {
	// TODO change balance of accounts' balances
	return await db.query('INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`) VALUES (?, ?, ?, ?)',
		[body.fromHandler, body.toHandler, body.amount, body.description]);
}

module.exports = {
	getTransactionsByAccount,
	createTransaction,
};