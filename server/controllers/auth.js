const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const accountController = require('../controllers/accounts');
dotenv.config();
const db = require("../utils/db");

signup = async (req, res) => {
  const { handler, password, email } = req.body;

  if (!handler || !password || !email) {
    return res.status(400).json({ 
      status: "fail", 
      message: "Handler, Password, and Email are required" 
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAccount = await db.query(
    "SELECT * FROM `accounts` WHERE `email` = ? OR `handler` = ?",
    [email, handler]
  );
  if (existingAccount.length > 0) {
    return res.status(400).json({
      status: "fail",
      message: "User Exists",
    });
  }

  try {
    await db.query(
      "INSERT INTO `accounts` (`handler`, `password`, `email`,`spending_limit`, `balance`) VALUES (?, ?, ?, ?, ?)",
      [handler, hashedPassword, email, 0, 0]
    );
    return res.status(201).json({
      status: "success",
      message: "Account created successfully",
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        status:'fail',
        error: 'Duplicate entry. Email or Handler already exists'
      });
    } else {
      return res.status(500).json({ 
        status: "error", 
        message: err.message 
      });
    }
  }
}

login = async (req,res) => {
  try {
    const { handler, password } = req.body;
    if (!handler || !password) {
      return res.status(400).json({ 
        status: "fail", 
        message: "Handler and password are required",
      });
    }

    const result = await db.query(
      "SELECT * FROM `accounts` WHERE `handler` = ?",
      [handler]
    );
    if (result.length === 0) {
      return res.status(400).json({ 
        status: "fail", 
        message:  "Login Failed",  
      });
    }

    const account = result[0];
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        status: "fail", 
        message:  "Login Failed",  
      });
    }

    const token = jwt.sign({ handler: account.handler }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return res.status(200).json({ 
      status: "success", 
      data: { token } 
    });
  } catch (err) {
      return res.status(401).json({ 
        status: "fail", 
        message: err.message 
      });
  }
}

module.exports = {
  signup,
  login,
};
