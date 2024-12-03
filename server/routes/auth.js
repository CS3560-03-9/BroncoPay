const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Signup route
router.post("/signup", async (req, res) => {
  const { handler, password, spendingLimit } = req.body;
  if (!handler || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "Handler and password are required" });
  }

  try {
    await authController.signup(handler, password, spendingLimit);
    res
      .status(201)
      .json({ status: "success", message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
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
