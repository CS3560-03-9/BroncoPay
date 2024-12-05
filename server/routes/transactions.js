const express = require('express');

const router = express.Router();
const transactionsController = require('../controllers/transactions');
const transactionsValidator = require('../validators/transactions');
const authToken = require('../middlewares/authMiddleware');

// Get Account Transactions
router.get(
    '/:handler',
    authToken.authenticateToken,
    transactionsController.
    getAccountTransactions
);

// Create Transactions
router.post(
    '/',
    authToken.authenticateToken,
    transactionsValidator.createTransactionValidator, 
    transactionsController.createTransaction
);

// Make deposit
router.post(
    '/deposit',
    authToken.authenticateToken, 
    transactionsValidator.createDepositOrWithdrawValidator, 
    transactionsController.createDeposit
);

// Make Withdraw
router.post(
    '/withdraw', 
    authToken.authenticateToken, 
    transactionsValidator.createDepositOrWithdrawValidator, 
    transactionsController.createWithdraw
);

module.exports = router;
