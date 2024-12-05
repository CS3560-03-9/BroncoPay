const db = require('../utils/db');
const accountsController = require('./accounts');
const pledgeController = require('./pledges');

async function getSubscriptions(handler) {
    let subscriptions = await db.query('SELECT * FROM `subscriptions` WHERE `handler` = ?', [handler]);
    for (let i = 0; i < subscriptions.length; i++) {
        const pledgeId = subscriptions[i].pledge_id;
        let pledge = await pledgeController.getPledge(pledgeId);
        subscriptions[i].pledge = pledge[0];
        subscriptions[i].pledge_id = undefined;
    }
    return subscriptions;
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