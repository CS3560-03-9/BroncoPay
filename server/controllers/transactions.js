const db = require("../utils/db");

async function getTransactionsByAccount(handler) {
	return await db.query('SELECT * FROM `transactions` WHERE `from_handler` = ? OR `to_handler` = ?', [handler, handler]);
}

async function createTransaction(transactionData) {
	const {from, to, amount, desc} = transactionData;
	return await db.query('INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`) VALUES (?, ?, ?, ?)',
		[from, to, amount, desc]);
}

module.exports = {
	getTransactionsByAccount,
	createTransaction,
};