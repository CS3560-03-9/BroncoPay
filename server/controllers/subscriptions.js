const db = require('../utils/db');
const accountsController = require('./accounts')

async function getSubscriptionsByAccount(handler) {
	return await db.query('SELECT * FROM `subscriptions` WHERE `from_handler` = ?', [handler]);
}

async function createSubscription(body) {
	const fromAccount = await accountsController.getAccount(body.fromHandler);
	const subscriptionInfo = undefined; // TODO GET SUB INFO
	if (fromAccount.length === 0) {
		throw new Error('account does not exist');
	}
	if (subscriptionInfo.amount > fromAccount[0].spending_limit) {
		throw new Error('amount is greater than spending limit');
	}
	return await db.query('INSERT INTO `subscriptions` (`from_handler`, `to_handler`, `amount`, `transaction_desc`) VALUES (?, ?, ?, ?)',
		[body.fromHandler, body.toHandler, body.amount, body.description]);
}

module.exports = {
	getSubscriptionsByAccount,
	createSubscription,
};