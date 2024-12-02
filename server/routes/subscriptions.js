const express = require('express');
const {validationResult} = require('express-validator');

const router = express.Router();
const subscriptionsController = require('../controllers/subscriptions');
const subscriptionsValidator = require('../validators/subscriptions');

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
        const subscriptions= await subscriptionsController.getSubscriptions(handler);
        res.status(200).json({
            status: 'success',
            data: {
                subscriptions: subscriptions,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});

router.post('/', subscriptionsValidator.createSubscriptionValidator,
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
            await subscriptionsController.createSubscription(req.body);
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
