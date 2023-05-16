const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        console.log(validationErrors)
        validationErrors.array().forEach(error => errors[error.path] = error.msg);

        const error = new Error('Bad Request.');
        error.errors = errors;
        error.status = 400;
        error.title = 'Bad Request.'
        next(error)
    }
    next()
}

module.exports = { handleValidationErrors };
