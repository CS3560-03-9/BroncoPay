const db = require("../utils/db");

async function getAllUsers() {
    return await db.query('SELECT * FROM `account`');
}

module.exports = { getAllUsers };