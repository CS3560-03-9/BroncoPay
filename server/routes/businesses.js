const express = require('express');
const router = express.Router();
const authToken = require("../middlewares/authMiddleware.js");
const businessController = require('../controllers/businesses');

// Get all Businesses
router.get(
    '/', 
    authToken.authenticateToken, 
    businessController.getAllBusinesses
);

// Get a Business
router.get(
    '/:handler', 
    authToken.authenticateToken, 
    businessController.getBusiness
);

module.exports = router;