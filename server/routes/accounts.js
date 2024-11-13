const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accounts');

router.get('/', async function(req, res) {
    try {
        const accounts = await accountController.getAllUsers();
        res.status(200).json({
            status: 'success',
            data: accounts,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
})

module.exports = router;
