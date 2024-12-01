const db = require('../utils/db');
const accountsController = require('./accounts')

async function getTransactionsByAccount(handler) {
	return await db.query('SELECT * FROM `transactions` WHERE `from_handler` = ? OR `to_handler` = ?', [handler, handler]);
}

async function createTransaction(body) {
	const fromAccount = await accountsController.getUser(body.fromHandler);
	const toAccountExists = await accountsController.existsUser(body.toHandler);
	console.log(fromAccount);
	if (fromAccount.length === 0 || !toAccountExists) {
		throw new Error('account(s) does not exist');
	}
	if (body.amount > fromAccount[0].spending_limit) {
		throw new Error('amount is greater than spending limit');
	}
	if (body.amount > fromAccount[0].balance) {
		throw new Error('amount is greater than balance');
	}
	await accountsController.changeBalance(body.fromHandler, -body.amount);
	await accountsController.changeBalance(body.toHandler, body.amount);
	return await db.query('INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`) VALUES (?, ?, ?, ?)',
		[body.fromHandler, body.toHandler, body.amount, body.description]);
}

module.exports = {
	getTransactionsByAccount,
	createTransaction,
};