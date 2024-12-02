const db = require('../utils/db');
const accountsController = require('./accounts')

async function getTransactionsByAccount(handler) {
	return await db.query('SELECT * FROM `transactions` WHERE `from_handler` = ? OR `to_handler` = ?', [handler, handler]);
}

async function createTransaction(body) {
	const fromAccount = await accountsController.getAccount(body.fromHandler);
	const toAccountExists = await accountsController.accountExists(body.toHandler);
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
	return await db.query('INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`, `transaction_type`) VALUES (?, ?, ?, ?, ?)',
		[body.fromHandler, body.toHandler, body.amount, body.description, 'TRANSACTION']);
}

async function createDeposit(body) {
	const account = await accountsController.getAccount(body.handler);
	if (account.length === 0) {
		throw new Error('account does not exist');
	}
	await accountsController.changeBalance(body.account, body.amount);
	return await db.query('INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`, `transaction_type`) VALUES (?, ?, ?, ?, ?)',
		[body.account, null, body.amount, body.description, 'DEPOSIT']);
}

async function createWithdraw(body) {
	const account = await accountsController.getAccount(body.handler);
	if (account.length === 0) {
		throw new Error('account does not exist');
	}
	if (body.amount > account[0].balance) {
		throw new Error('amount is greater than balance');
	}
	await accountsController.changeBalance(body.account, -body.amount);
	return await db.query('INSERT INTO `transactions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`, `transaction_type`) VALUES (?, ?, ?, ?, ?)',
		[body.account, null, body.amount, body.description, 'WITHDRAW']);
}

module.exports = {
	getTransactionsByAccount,
	createTransaction,
	createDeposit,
	createWithdraw,
};