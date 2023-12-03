const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../errors/validationErrors');

const validateLogin = [
    check('email').exists({checkFalsy: true}).withMessage('Email is required'),
    check('password').exists({checkFalsy: true}).withMessage('Password is required.'),
    handleValidationErrors("There was a problem signing you in")
]

const validateSignUp = [
    check('name').exists({checkFalsy: true}).withMessage('How are we going to know what to call you?'),
    check('email').exists({checkFalsy: true}).isEmail().withMessage('Really? We need a working email address.'),
    check('password').exists({checkFalsy: true}).isLength({min: 6}).withMessage('Your password is too short. Get creative.'),
    handleValidationErrors("There was a problem signing you up")
]



const validateCreateSession = [
    check('name').exists({checkFalsy: true}).isLength({min: 5}).withMessage('Name must be at leat 5 characters'),
    check('address').exists({checkFalsy: true}).withMessage('Please enter your full address'),
    check('private').exists().isBoolean().withMessage('Private must be a boolean'),
    check('startDate').custom(async (date) => {
        let convDate = new Date(date);
        let currDate = new Date();
        if (convDate < currDate) throw new Error('Start date must be in the future')
    }),
    check('endDate').custom(async (date, {req}) => {
        let convDate = new Date(date);
        let startDate = new Date(req.body.startDate)
        if (convDate < startDate) throw new Error('End date is less than start date')
    }),
    handleValidationErrors("There was a problem creating your session")
]

const validateEditSession = [
    check('name').optional().exists({checkFalsy: true}).isLength({min: 5}).withMessage('Name must be at leat 5 characters'),
    check('private').optional().exists().isBoolean().withMessage('Private must be a boolean'),
    check('startDate').optional().custom(async (date) => {
        let convDate = new Date(date);
        let currDate = new Date();
        if (convDate < currDate) throw new Error('Start date must be in the future')
    }),
    check('endDate').optional().custom(async (date, {req}) => {
        let convDate = new Date(date);
        let startDate = new Date(req.body.startDate)
        if (convDate < startDate) throw new Error('End date is less than start date')
    }),
    handleValidationErrors("There was a problem updating your session")
]

const validateCreateComment = [
    check("text").exists({checkFalsy: true}).isLength({max: 250}).withMessage("Comments can't be longer than 250 characters"),
    handleValidationErrors('There was a problem creating your comment')
]

module.exports = {
    validateLogin,
    validateSignUp,
    validateCreateComment,
    validateCreateSession,
    validateEditSession
}
