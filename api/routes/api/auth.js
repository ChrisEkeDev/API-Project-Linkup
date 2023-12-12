const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie } = require('../../utils/jwt')
const { validateLogin } = require('./validation/expressValidations');
const { Player } = require('../../db/models');


// Restore session
router.get('/', (req, res) => {
    const { player } = req;
    if (!player) {
        return res.status(404).json({
            status: 404,
            message: "No session found",
            data: null,
            errors: {}
        })
    }

    const playerPublic = {
        id: player.id,
        name: player.name,
        email: player.email,
        profileImage: player.profileImage,
        createdAt: player.createdAt,
    }

    return res.status(200).json({
            status: 200,
            message: "Session restored",
            data: playerPublic,
            errors: {}
        })

})


// Sign in user
router.post('/', validateLogin, async (req, res, next) => {
    const { email, password } = req.body;
    const player = await Player.unscoped().findOne({
        where: { email }
    });

    if (!player || !bcrypt.compareSync(password, player.hashedPassword.toString())) {
        return res.status(401).json({
            status: 401,
            message: "Invalid credentials",
            data: null,
            errors: {
                message: "There was a problem with your credentials."
            }
        })
    }

    const playerPublic = {
        id: player.id,
        name: player.name,
        email: player.email,
        profileImage: player.profileImage,
        createdAt: player.createdAt,
    }

    await setTokenCookie(res, playerPublic);

    return res.status(200).json({
        status: 200,
        message: "Sign in successful",
        data: playerPublic,
        errors: {}
    })
})

// Sign out user
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.status(201).json({
        status: 201,
        message: 'Sign out successful',
        data: null,
        errors: {}
    })
})



module.exports = router;
