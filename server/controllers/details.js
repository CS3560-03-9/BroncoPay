const db = require('../utils/db');

getAccountDetails = async (req,res) => {
    try {
        const {handler} = req.params;
        const details = await db.query(
            'SELECT * FROM `account_details` WHERE `handler` = ?', 
            [handler]
        );

        if (handler === undefined) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    handler: 'handler is missing',
                },
            });
        }

        if (details.length === 0) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    handler: 'account not found',
                },
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {
                account_details: details,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

updateDetails = async (req, res) => {
    try {
        const {handler} = req.params;
        const {displayName, dob, description} = req.body;


        if (handler === undefined) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    handler: 'handler is missing',
                },
            });
        }

        const details = await db.query(
            'SELECT * FROM `account_details` WHERE `handler` = ?', 
            [handler]
        );
        if (details.length === 0) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    handler: 'account not found',
                },
            });
        }

        if (displayName !== undefined) {
            await setDisplayName(handler, displayName);
        }
        if (dob !== undefined) {
            await setDateOfBirth(handler, dob);
        }
        if (description !== undefined) {
            await setDescription(handler, description);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Successfully update details',
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

async function setDisplayName(handler, displayName) {
    return await db.query(
        'UPDATE `account_details` SET `display_name` = ? WHERE `handler` = ?', 
        [displayName, handler]
    );
}

async function setDateOfBirth(handler, dob) {
    return await db.query(
        'UPDATE `account_details` SET `dob` = ? WHERE `handler` = ?', 
        [dob, handler]
    );
}

async function setDescription(handler, description) {
    return await db.query(
        'UPDATE `account_details` SET `account_desc` = ? WHERE `handler` = ?', 
        [description, handler]
    );
}

module.exports = {
    getAccountDetails,
    updateDetails
};