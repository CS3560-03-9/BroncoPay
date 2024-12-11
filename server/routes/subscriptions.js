const express = require('express');

const router = express.Router();
const subscriptionsController = require('../controllers/subscriptions');
const subscriptionsValidator = require('../validators/subscriptions');
const authToken = require('../middlewares/authMiddleware');

// Gets Subscription from handler
router.get(
    '/:handler', 
    authToken.authenticateToken, 
    subscriptionsController.getSubscriptions
);

// Create Subscription
router.post(
    '/', 
    authToken.authenticateToken, 
    subscriptionsValidator.createSubscriptionValidator, 
    subscriptionsController.createSubscription
);

module.exports = router;
