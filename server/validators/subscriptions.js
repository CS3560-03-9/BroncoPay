const {body} = require('express-validator');

const createSubscriptionValidator = [
    body('handler', 'handler invalid').trim().escape()
        .notEmpty().withMessage('handler must not be null')
        .isLength({min: 1, max: 64}).withMessage('handler must be between 1 to 64 characters'),
    body('pledgeId', 'pledgeId invalid').trim().escape()
        .notEmpty().withMessage('pledgeId must not be null')
        .isNumeric().withMessage('pledgeId must be numeric')
        .isLength({min: 1}).withMessage('pledgeId must be greater than 0'),
];

module.exports = {
    createSubscriptionValidator,
}