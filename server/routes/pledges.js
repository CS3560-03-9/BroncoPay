const express = require('express');
const {validationResult} = require("express-validator");

const router = express.Router();
const pledgeController = require('../controllers/pledges');
const pledgeValidator = require('../validators/pledges');

router.get('/:handler', async function (req, res) {
	const {handler} = req.params;
	if (handler === undefined) {
		res.status(400).json({
			status: 'fail',
			data: {
				handler: 'handler is missing',
			},
		});
		return;
	}
	try {
		const pledges = await pledgeController.getPledges(handler)
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
});

router.post('/', pledgeValidator.createPledgeValidator,
	async function (req, res) {
		try {
			const validation = validationResult(req);
			if (!validation.isEmpty()) {
				res.status(200).json({
					status: 'fail',
					data: validation.array(),
				});
				return;
			}
			await pledgeController.createPledge(req.body);
			res.status(200).json({
				status: 'success',
				data: null,
			});
		} catch (err) {
			res.status(500).json({
				status: 'error',
				message: err.message,
			});
		}
	});

module.exports = router;
