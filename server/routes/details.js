const express = require('express');
const router = express.Router();

const accountDetailsController = require('../controllers/details');

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
		const details = await accountDetailsController.getAccountDetails(handler);
		if (details.length === 0) {
			res.status(404).json({
				status: 'fail',
				data: {
					handler: 'account not found',
				},
			});
			return;
		}
		res.status(200).json({
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
});

router.patch('/:handler', async function (req, res) {
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
		const details = await accountDetailsController.getAccountDetails(handler);
		if (details.length === 0) {
			res.status(404).json({
				status: 'fail',
				data: {
					handler: 'account not found',
				},
			});
			return;
		}
		const displayName = req.body.displayName;
		if (displayName !== undefined) {
			await accountDetailsController.setDisplayName(handler, displayName);
		}
		const dob = req.body.dob;
		if (dob !== undefined) {
			await accountDetailsController.setDateOfBirth(handler, dob);
		}
		const description = req.body.description;
		if (description !== undefined) {
			await accountDetailsController.setDescription(handler, description);
		}
		res.status(204).json({
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
