const db = require("../utils/db");

export async function getAllUsers() {
    return await db.query("SELECT * FROM accounts");
}

module.exports = getAllUsers();