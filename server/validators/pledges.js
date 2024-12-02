const { body } = require('express-validator');

const createPledgeValidator = [
	body('handler', 'handler invalid').trim().escape()
		.notEmpty().withMessage('handler must not be null')
		.isLength({min: 1, max: 64}).withMessage('handler must be between 1 to 64 characters'),
	body('cost', 'cost invalid').trim().escape()
		.notEmpty().withMessage('cost must not be null')
		.isNumeric().withMessage('cost must be numeric')
		.isLength({min: 1}).withMessage('cost must be greater than 0'),
	body('interval', 'interval invalid').trim().escape()
		.notEmpty().withMessage('interval must not be null')
		.isNumeric().withMessage('interval must be numeric')
		.isLength({min: 1}).withMessage('interval must be greater than 0'),
	body('description', 'description invalid').trim().escape()
		.isLength({min: 0, max: 1024}).withMessage('description must be between 0 to 1024 characters'),
];

module.exports = {
	createPledgeValidator,
}