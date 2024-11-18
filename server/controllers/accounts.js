const db = require("../utils/db");

async function getUsers() {
  return await db.query("SELECT * FROM `accounts`");
}

async function getUser(handler) {
  try {
    if (!handler) throw new Error("Invalid handler");
    const results = await db.query(
      "SELECT * FROM `accounts` WHERE `handler` = ?",
      [handler]
    );
    return results.length ? results[0] : null;
  } catch (err) {
    console.error("Error fetching user:", err.message);
    throw new Error("Failed to fetch user");
  }
}

async function deleteUser(handler) {
  try {
    if (!handler) throw new Error("Invalid handler");
    const results = await db.query(
      "DELETE FROM `accounts` WHERE `handler` = ?",
      [handler]
    );
    if (results.affectedRows === 0) throw new Error("User not found");
    return results;
  } catch (err) {
    console.error("Error deleting user:", err.message);
    throw new Error("Failed to delete user");
  }
}

async function existsUser(handler) {
  try {
    if (!handler) throw new Error("Invalid handler");
    const [[exists]] = await db.query(
      "SELECT EXISTS(SELECT * FROM `accounts` WHERE `handler` = ?) AS exists",
      [handler]
    );
    return exists.exists;
  } catch (err) {
    console.error("Error checking user existence:", err.message);
    throw new Error("Failed to check user existence");
  }
}

async function changeBalance(handler, amount) {
  try {
    if (!handler) throw new Error("Invalid handler");
    if (typeof amount !== "number" || isNaN(amount))
      throw new Error("Invalid amount");

    const results = await db.query(
      "UPDATE `accounts` SET `balance` = `balance` + ? WHERE `handler` = ?",
      [amount, handler]
    );
    if (results.affectedRows === 0) throw new Error("User not found");
    return results;
  } catch (err) {
    console.error("Error changing balance:", err.message);
    throw new Error("Failed to change balance");
  }
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  existsUser,
  changeBalance,
};
