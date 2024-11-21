const db = require('../utils/db');
const accountsController = require('./accounts');

async function getSubscriptionsByAccount(handler) {
    return await db.query('SELECT * FROM `subscriptions` WHERE `handler` = ?', [handler]);
}

async function createSubscription(body) {
    const fromAccount = await accountsController.getAccount(body.fromHandler);
    if (fromAccount.length === 0) {
        throw new Error('account does not exist');
    }

    const pledgeInfo = await getPledgeInfo(body.pledgeId);
    if (!pledgeInfo) {
        throw new Error('pledge information not found');
    }

    if (pledgeInfo.cost > fromAccount[0].spending_limit) {
        throw new Error('amount is greater than spending limit');
    }

    return await db.query('INSERT INTO `subscriptions` (`handler`, `pledge_id`, `amount`, `transaction_desc`) VALUES (?, ?, ?, ?)',
        [body.handler, body.pledgeId, pledgeInfo.cost, body.description]);
}

async function getPledgeInfo(pledgeId) {
    return await db.query('SELECT * FROM `pledges` WHERE `pledge_id` = ?', [pledgeId]);
}

module.exports = {
    getSubscriptionsByAccount,
    createSubscription,
    getPledgeInfo,
};