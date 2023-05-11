const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models');


// Signup
router.post('/', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password)

    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
    })

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    }

    await setTokenCookie(res, safeUser);

    return res.json({user: safeUser})
})

module.exports = router;
