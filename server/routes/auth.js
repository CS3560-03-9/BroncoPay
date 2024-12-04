const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Signup route
router.post("/signup", async (req, res) => {
  const { handler, password, email, spendingLimit } = req.body;
  if (!handler || !password || !email) {
    return res.status(400).json({ 
      status: "fail", 
      message: "Handler, Password, and Email are required" 
    });
  }

  try {
    const result = await authController.signup(handler, password, email, spendingLimit);
    console.log("PROBLEM: " + result);
    res.status(201).json({ 
      status: "success", 
      message: "Account created successfully" 
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({
        status:'fail',
        error: 'Duplicate entry. Email or Handler already exists'
      });
    } else {
      res.status(500).json({ 
        status: "error", 
        message: err.message 
      });
    }
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { handler, password } = req.body;
  if (!handler || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "Handler and password are required" });
  }

  try {
    const token = await authController.login(handler, password);
    res.status(200).json({ status: "success", data: { token } });
  } catch (err) {
    res.status(401).json({ status: "fail", message: err.message });
  }
});

module.exports = router;
