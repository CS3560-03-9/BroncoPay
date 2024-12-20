const {body} = require('express-validator');

const createTransactionValidator = [
    body('fromHandler', 'fromHandler invalid').trim().escape()
        .notEmpty().withMessage('fromHandler must not be null')
        .isLength({min: 1, max: 64}).withMessage('fromHandler must be between 1 to 64 characters'),
    body('toHandler', 'toHandler invalid').trim().escape()
        .notEmpty().withMessage('toHandler must not be null')
        .isLength({min: 1, max: 64}).withMessage('toHandler must be between 1 to 64 characters'),
    body('amount', 'amount invalid').trim().escape()
        .notEmpty().withMessage('amount must not be null')
        .isNumeric().withMessage('amount must be numeric')
        .isLength({min: 1}).withMessage('amount must be greater than 0'),
    body('description', 'description invalid').trim().escape()
        .isLength({min: 0, max: 1024}).withMessage('description must be between 0 to 1024 characters'),
];

const createDepositOrWithdrawValidator = [
    body('handler', 'handler invalid').trim().escape()
        .notEmpty().withMessage('handler must not be null')
        .isLength({min: 1, max: 64}).withMessage('handler must be between 1 to 64 characters'),
    body('amount', 'amount invalid').trim().escape()
        .notEmpty().withMessage('amount must not be null')
        .isNumeric().withMessage('amount must be numeric')
        .isLength({min: 1}).withMessage('amount must be greater than 0'),
    body('description', 'description invalid').trim().escape()
        .isLength({min: 0, max: 1024}).withMessage('description must be between 0 to 1024 characters'),
];

module.exports = {
    createTransactionValidator,
    createDepositOrWithdrawValidator,
}