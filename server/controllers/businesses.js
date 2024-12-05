const db = require('../utils/db');

getAllBusinesses = async (req, res) => {
    try {
        const businesses = await db.query('SELECT * FROM `businesses`');
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
}

getBusiness = async (req, res) => {
    const {handler} = req.params;
    if (!handler) {
        res.status(400).json({
            status: 'fail',
            data: {
                handler: 'Handler is missing',
            },
        })
    }

    try {
        const business = await db.query('SELECT * FROM `businesses` WHERE `handler` = ?', [handler]);
        res.status(200).json({
            status: 'success',
            data: {
                business: business
            }
        });
    } catch (err) {
        res.status(500).json({
            status:'fail',
            message: err.message,
        })
    }

    
}

async function businessExists(handler) {
    return await db.query('SELECT EXISTS(SELECT * FROM `businesses` WHERE `handler` = ?)', [handler]);
}

module.exports = {
    getAllBusinesses,
    getBusiness,
    businessExists,
};