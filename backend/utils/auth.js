const jwt = require('jsonwebtoken');
const { jwtConfig } = require ('../config');
const { User } = require('../db/models');

const  { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie after a User is sucessfully logged in
const setTokenCookie = (res, user) => {

    // Creates safe user object
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    };

    // Generates token with user object
    const token = jwt.sign(
        { date: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    })

    return token
}


const restoreUser = (req, res, next) => {

    // token parsed from the cookies
    const { token } = req.cookies;
    req.user = null;

    // verify the token from the parsed cookie
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {

        if (err) {
            return next()
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.findByPk(id, {
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt']
                }
            });
        } catch(error) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();

    })
};


const requireAuth = (req, _res, next) => {
    if (req.user) return next();

    const error = new Error('Authentication required');
    error.title = 'Authentication required';
    error.errors = { message: 'Authentication required'};
    error.status = 401;
    return next(error)
}

module.exports = { setTokenCookie, restoreUser, requireAuth }
