const express = require('express');
const router = express.Router();
const authToken = require("../middlewares/authMiddleware.js");
const accountController = require('../controllers/accounts');

// Gets all Accounts in Database
router.get('/', authToken.authenticateToken , async function (req, res) {
    try {
        const accounts = await accountController.getAccounts();
        res.status(200).json({
            status: 'success',
            data: {
                accounts: accounts,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});

// Gets Handler Account
router.get('/:handler', authToken.authenticateToken , async function (req, res) {
    const {handler} = req.params;
    if (handler === undefined) {
        res.status(400).json({
            status: 'fail',
            data: {
                handler: 'handler is missing',
            },
        });
        return;
    }
    try {
        const account = await accountController.getAccount(handler);
        if (account.length === 0) {
            res.status(404).json({
                status: 'fail',
                data: {
                    handler: 'account not found',
                },
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                account: account,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});

router.patch('/:handler', authToken.authenticateToken , async function (req, res) {
    const {handler} = req.params;
    if (handler === undefined) {
        res.status(400).json({
            status: 'fail',
            data: {
                handler: 'handler is missing',
            },
        });
        return;
    }
    try {
        const account = await accountController.getAccount(handler);
        if (account.length === 0) {
            res.status(404).json({
                status: 'fail',
                data: {
                    handler: 'account not found',
                },
            });
            return;
        }
        const limit = req.body.spendingLimit;
        if (limit !== undefined) {
            await accountController.setSpendingLimit(handler, limit);
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});

router.delete('/:handler', authToken.authenticateToken, async function (req, res) {
    const {handler} = req.params;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (handler === undefined) {
        res.status(400).json({
            status: 'fail',
            data: {
                handler: 'handler is missing',
            },
        });
        return;
    }
    try {
        await accountController.deleteAccount(handler);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});

module.exports = router;
