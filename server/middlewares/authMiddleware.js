const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Authenticates Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", message: "Access token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "fail", message: "Invalid token" });
    }

    req.user = user;
    next();
  });
}

module.exports = {authenticateToken};
