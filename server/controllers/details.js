const db = require('../utils/db');

async function getAccountDetails(handler) {
    return await db.query('SELECT * FROM `account_details` WHERE `handler` = ?', [handler]);
}

async function setDisplayName(handler, displayName) {
    return await db.query('UPDATE `account_details` SET `display_name` = ? WHERE `handler` = ?', [displayName, handler]);
}

async function setDateOfBirth(handler, dob) {
    return await db.query('UPDATE `account_details` SET `dob` = ? WHERE `handler` = ?', [dob, handler]);
}

async function setDescription(handler, description) {
    return await db.query('UPDATE `account_details` SET `account_desc` = ? WHERE `handler` = ?', [description, handler]);
}

module.exports = {
    getAccountDetails,
    setDisplayName,
    setDateOfBirth,
    setDescription,
};