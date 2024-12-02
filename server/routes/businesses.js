const express = require('express');
const router = express.Router();

const businessController = require('../controllers/businesses');

router.get('/', async function (req, res) {
    try {
        const businesses = await businessController.getBusinesses();
        res.status(200).json({
            status: 'success',
            data: {
                businesses: businesses,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
});

module.exports = router;
