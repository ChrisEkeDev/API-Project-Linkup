const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors.array().forEach(error => error[error.param] = error.msg);

        const error = Error('Bad Request.');
        error.errors = errors;
        error.status = 400;
        error.title = 'Bad Request.'
        next(error)
    }
    next()
}

module.exports = { handleValidationErrors };
