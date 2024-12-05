const express = require('express');
const router = express.Router();
const authToken = require("../middlewares/authMiddleware.js");
const accountController = require('../controllers/accounts.js');

// Gets all Accounts in Database
router.get('/', authToken.authenticateToken, accountController.getAllAccounts);

// Gets Handler Account
router.get('/:handler', authToken.authenticateToken, accountController.getHandlerAccount);

// Update Spending Limit of Handler
router.patch('/:handler', authToken.authenticateToken, accountController.updateSpendingLimit);

// Delete Handler
router.delete('/:handler',authToken.authenticateToken, accountController.deleteAccount);


module.exports = router;
