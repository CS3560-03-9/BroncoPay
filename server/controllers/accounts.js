const db = require('../utils/db');

getAllAccounts = async (req, res) => {
    try {
        const accounts = await db.query(
            'SELECT * FROM `accounts`'
        );
        res.status(200).json({
            status:'success',
            data: {
                accounts: accounts,
            },
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}
getHandlerAccount = async (req, res) => {
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
        const account = await db.query(
            'SELECT handler, email, balance, spending_limit FROM `accounts`'
        );
        if (account.length === 0) {
            res.status(404).json({
                status: 'fail',
                data: {
                    handler: 'Account not found',
                }
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                account: account,
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

updateSpendingLimit = async (req, res) => {
    const {handler} = req.params;
    limit = req.body.spendingLimit;

    limit = parseFloat(limit);

    if (!handler) {
        res.status(400).json({
            status:'fail',
            data: {
                handler: 'Handler is missing',
            }
        });
    }

    try {
        const account = await db.query(
            'SELECT * FROM `accounts` WHERE `handler` = ?', 
            [handler]
        );
        if (account.length === 0) {
            res.status(404).json({
                status: 'fail',
                data: {
                    handler: 'Account not found',
                },
            });
        }
        
        console.log(limit);
        if (!isNaN(limit) && isFinite(limit)) {
            const limitTest = await db.query(
                'UPDATE `accounts` SET `spending_limit` = ? WHERE `handler` = ?', 
                [limit, handler]
            );
            
            res.status(204).json({
                status: 'success',
                data: {
                    handler: 'Spending limit updated',
                },
            });
        } else {
            res.status(400).json({
                status:'fail',
                data: {
                    handler: 'Invalid Limit'
                }
            })
        }
        
    } catch(err) {
        res.status(500).json({
            status:'error',
            message: err.message,
        });
    }
}

deleteAccount = async (req, res) => {
    const {handler} = req.params;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!handler) {
        res.status(400).json({
            status: 'fail',
            data: {
                handler: 'handler is missing',
            },
        });
    }

    try {
        const deletion = await db.query(
            'DELETE FROM `accounts` WHERE `handler` = ?', 
            [handler]
        ); 

        res.status(204).json({
            status: 'success',
            data: 'Account Deletion Successful'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

async function changeBalance(handler, amount) {
    return await db.query(
        'UPDATE `accounts` SET `balance` = `balance` + ? WHERE `handler` = ?', 
        [amount, handler]
    );
}

async function existingAccount(handler, email) {
    let query = "SELECT * FROM 'accounts' WHERE ";
    const params = [];

    if (email) {
        query += "`email` = ?";
        params.push(email);
    }

    if (handler) {
        if (email) query += " OR ";
        query += "`handler` = ?";
        params.push(handler);
    }

    return await db.query(
        query, 
        params
    );
}

module.exports = {
    getAllAccounts,
    getHandlerAccount,
    updateSpendingLimit,
    deleteAccount,
    changeBalance,
    existingAccount,
};