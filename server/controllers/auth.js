const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../utils/db");

async function signup(handler, password, email, spendingLimit = 0) {

  const existingAccount = await db.query(
    "SELECT * FROM `accounts` WHERE `email` = ? OR `handler` = ?",
    [email, handler]
  );
  if (existingAccount.length > 0) {
    throw new Error("Email or handler already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.query(
    "INSERT INTO `accounts` (`handler`, `password`, `email`,`spending_limit`, `balance`) VALUES (?, ?, ?, ?, ?)",
    [handler, hashedPassword, email, spendingLimit, 0]
  );
}

async function login(handler, password) {
  const result = await db.query(
    "SELECT * FROM `accounts` WHERE `handler` = ?",
    [handler]
  );
  if (result.length === 0) {
    throw new Error("Account not found");
  }

  const account = result[0];
  const isPasswordValid = await bcrypt.compare(password, account.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ handler: account.handler }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
}

module.exports = {
  signup,
  login,
};
