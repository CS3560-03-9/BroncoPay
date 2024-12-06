const express = require('express');

const router = express.Router();
const pledgeController = require('../controllers/pledges');
const pledgeValidator = require('../validators/pledges');
const authToken = require('../middlewares/authMiddleware');

// Gets Pledges by handler
router.get(
    '/handler/:handler', 
    authToken.authenticateToken, 
    pledgeController.getPledges
);

// Get Pledges by id
router.get(
    '/id/:id', 
    authToken.authenticateToken, 
    pledgeController.getPledgebyId
);

// Create Pledge
router.post(
    '/',
    authToken.authenticateToken, 
    pledgeValidator.createPledgeValidator, 
    pledgeController.createPledge
);

// Get Handlers by Pledge
router.get(
    '/pledge/:id',
    authToken.authenticateToken,
    pledgeController.getHandlersWithPledge
);

// Delete Pledge
router.delete(
    '/:id',
    authToken.authenticateToken,
    pledgeController.deletePledge
);

// Get All Pledges
router.get(
    '/',
    authToken.authenticateToken,
    pledgeController.getAllPledges
)

module.exports = router;
