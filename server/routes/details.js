const express = require('express');
const router = express.Router();

const accountDetailsController = require('../controllers/details');
const authToken = require("../middlewares/authMiddleware");

// Gets Account Details
router.get(
    '/:handler',
    authToken.authenticateToken,
    accountDetailsController.getAccountDetails
);

//Updates Account Details
router.patch(
    '/:handler', 
    authToken.authenticateToken, 
    accountDetailsController.updateDetails
);

module.exports = router;
