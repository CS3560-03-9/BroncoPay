const {validationResult} = require('express-validator');

const db = require('../utils/db');
const accountsController = require('../controllers/accounts');
const pledgeController = require('./pledges');

getSubscriptions = async (req,res) => {
    try {
        const {handler} = req.params;
        if (handler === undefined) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    handler: 'handler is missing',
                },
            });
        }
        
        let subscriptions = await db.query(
            'SELECT * FROM `subscriptions` WHERE `handler` = ?', 
            [handler]
        );
        for (let i = 0; i < subscriptions.length; i++) {
            const pledgeId = subscriptions[i].pledge_id;
            let pledge = await pledgeController.getPledgeWithId(pledgeId);
            subscriptions[i].pledge = pledge[0];
            subscriptions[i].pledge_id = undefined;
        }
        return res.status(200).json({
            status: 'success',
            data: {
                subscriptions: subscriptions,
            },
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

createSubscription = async (req, res) => {
    try {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                data: validation.array(),
            });
        }
        
        const {handler, pledgeId} = req.body;

        const account = await accountsController.getAccountByHandler(handler);
        if (account.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Account does not exist'
            });
        }

        const pledge = await pledgeController.getPledgeWithId(pledgeId);
        if (!pledge || pledge.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Pledge does not exist'
            });
        }

        if (pledge[0].cost > account[0].spending_limit) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cost is greater than spending limit'
            });
        }

        await db.query(
            'INSERT INTO `subscriptions` (`handler`, `pledge_id`) VALUES (?, ?)',
            [handler, pledgeId]
        );

        return res.status(200).json({
                status: 'success',
                message: 'Subscription created'
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

module.exports = {
    getSubscriptions,
    createSubscription,
};