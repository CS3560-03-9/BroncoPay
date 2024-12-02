const db = require('../utils/db');

async function getAccounts() {
    return await db.query('SELECT * FROM `accounts`');
}

async function getAccount(handler) {
    return await db.query('SELECT * FROM `accounts` WHERE `handler` = ?', [handler]);
}

async function deleteAccount(handler) {
    return await db.query('DELETE FROM `accounts` WHERE `handler` = ?', [handler]);
}

async function setSpendingLimit(handler, limit) {
    return await db.query('UPDATE `accounts` SET `spending_limit` = ? WHERE `handler` = ?', [limit, handler]);
}

async function accountExists(handler) {
    return await db.query('SELECT EXISTS(SELECT * FROM `accounts` WHERE `handler` = ?)', [handler]);
}

async function changeBalance(handler, amount) {
    return await db.query('UPDATE `accounts` SET `balance` = `balance` + ? WHERE `handler` = ?', [amount, handler]);
}

module.exports = {
    getAccounts,
    getAccount,
    deleteAccount,
    setSpendingLimit,
    accountExists,
    changeBalance,
};