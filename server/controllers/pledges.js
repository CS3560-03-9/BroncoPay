const {validationResult} = require("express-validator");

const db = require('../utils/db');
const businessController = require("../controllers/businesses");

getPledges = async (req, res) => {
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

        const pledges = await db.query(
            'SELECT * FROM `pledges` WHERE `handler` = ?', 
            [handler]
        );
        return res.status(200).json({
            status: 'success',
            data: {
                pledges: pledges,
            },
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}


getPledgebyId = async (req, res) => {
    try {
        const {id} = req.params;
        if (id === undefined) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    id: 'id is missing',
                },
            });
        }

        const pledge = await db.query(
            'SELECT * FROM `pledges` WHERE `pledge_id` = ?', 
            [id]
        );
        return res.status(200).json({
            status: 'success',
            data: {
                pledge: pledge[0],
            },
        });
    } catch(err) {
        return res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

createPledge = async (req, res) => {
    try {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
                return res.status(400).json({
                    status: 'fail',
                    data: validation.array(),
                });
        }

        const {handler, cost, interval, description} = req.body;

        const businessExists = await businessController.businessExists(handler);
        if (!businessExists) {
            return res.status(404).json({
                    status: 'fail',
                    message: 'Business does not exist',
            });
        }

        await db.query(
        'INSERT INTO `pledges` (`handler`, `cost`, `pledge_interval`, `pledge_desc`) VALUES (?, ?, ?, ?)',
        [handler, cost, interval, description]
        );

        return res.status(200).json({
            status: 'success',
            message: 'Pledge created',
        });
    } catch(err) {
        return res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

module.exports = {
    getPledges,
    getPledgebyId,
    createPledge,
}