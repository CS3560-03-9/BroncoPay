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

        const pledge = getPledgeWithId(id);
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

deletePledge = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "fail",
                data: {
                handler: "id is missing",
                },
            });
        }

        // Deletes subscriptions
        await db.query(
            "DELETE FROM `subscriptions` WHERE `pledge_id` = ?",
            [id]
        );

        // Delete pledges
        const deletion = await db.query(
            "DELETE FROM `pledges` WHERE `pledge_id` = ?",
            [id]
        );

        if (deletion.affectedRows === 0) {
            return res.status(404).json({
                status: "fail",
                data: {
                    handler: "Pledge not found",
                },
            });
        }

        return res.status(204).json({
            status: "success",
            data: "Account Deletion Successful",
        });

    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };

getHandlersWithPledge = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({
                status: "fail",
                data: {
                handler: "id is missing",
                },
            });
        }

        console.log(id);
        const handlers = await db.query(
            'SELECT `handler` FROM `subscriptions` WHERE `pledge_id` = ?',
            [id]
        )

        return res.status(200).json({
            status: "success",
            data: {
                handlers: handlers,
            }
        })
    } catch(err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
}

getAllPledges = async (req, res) => {
    try {
        const pledges = await db.query('SELECT * FROM `pledges`');
        res.status(200).json({
            status: 'success',
            data: {
                pledges: pledges,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

async function getPledgeWithId(Id) {
    return await db.query(
        'SELECT * FROM `pledges` WHERE `pledge_id` = ?', 
        [Id]
    );
}

module.exports = {
    getPledges,
    getPledgebyId,
    createPledge,
    deletePledge,
    getHandlersWithPledge,
    getAllPledges,
    getPledgeWithId
}