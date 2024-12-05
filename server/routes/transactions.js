const express = require('express');
const {validationResult} = require('express-validator');

const router = express.Router();
const transactionsController = require('../controllers/transactions');
const transactionsValidator = require('../validators/transactions');

router.get('/:handler', async function (req, res) {
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
        const transactions = await transactionsController.getTransactionsByAccount(handler);
        res.status(200).json({
            status: 'success',
            data: {
                transactions: transactions,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});

router.post('/', transactionsValidator.createTransactionValidator,
    async function (req, res) {
        try {
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                res.status(200).json({
                    status: 'fail',
                    data: validation.array(),
                });
                return;
            }
            await transactionsController.createTransaction(req.body);
            res.status(200).json({
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

router.post('/deposit', transactionsValidator.createDepositOrWithdrawValidator,
    async function (req, res) {
        try {
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                res.status(200).json({
                    status: 'fail',
                    data: validation.array(),
                });
                return;
            }
            await transactionsController.createDeposit(req.body);
            res.status(200).json({
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

router.post('/withdraw', transactionsValidator.createDepositOrWithdrawValidator,
    async function (req, res) {
        try {
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                res.status(200).json({
                    status: 'fail',
                    data: validation.array(),
                });
                return;
            }
            await transactionsController.createWithdraw(req.body);
            res.status(200).json({
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
