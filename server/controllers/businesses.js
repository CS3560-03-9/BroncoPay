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
  const result = await db.query('SELECT EXISTS(SELECT 1 FROM `businesses` WHERE `handler` = ?) AS `exists`', [handler]);
  return result[0].exists === 1;
}

module.exports = {
    getAllBusinesses,
    getBusiness,
    businessExists,
};