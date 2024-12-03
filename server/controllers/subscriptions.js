const db = require('../utils/db');
const accountsController = require('./accounts');
const pledgeController = require('./pledges');

async function getSubscriptions(handler) {
    return await db.query('SELECT * FROM `subscriptions` WHERE `handler` = ?', [handler]);
}

async function createSubscription(body) {
    const account = await accountsController.getAccount(body.handler);
    if (account.length === 0) {
        throw new Error('account does not exist');
    }
    const pledge = await pledgeController.getPledge(body.pledgeId);
    if (!pledge) {
        throw new Error('pledge not found');
    }
    if (pledge.cost > account[0].spending_limit) {
        throw new Error('cost is greater than spending limit');
    }
    return await db.query('INSERT INTO `subscriptions` (`handler`, `pledge_id`) VALUES (?, ?)',
        [body.handler, body.pledgeId]);
}

module.exports = {
    getSubscriptions,
    createSubscription,
};