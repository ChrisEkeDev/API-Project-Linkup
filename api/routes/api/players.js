const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie } = require('../../utils/jwt')
const { Player, PlayerSettings } = require('../../db/models');
const { uploadMedia, deleteMedia } = require('../../utils/aws');
const { validateSignUp } = require('./validation/expressValidations');
const { v4: uuidv4 } = require('uuid');

// Signup
router.post('/', uploadMedia, validateSignUp, async (req, res) => {
    const { name, email, password } = req.body;
    const image = req.file;

    const userExistsEmail = await Player.findOne({
        where: { email }
    })

    if (userExistsEmail) {
        return res.status(500).json({
            status: 500,
            message: "There was a problem signing you up",
            data: null,
            errors: {
                email: "Player with that email already exists"
            },
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 13)

    const player = await Player.create({
        id: uuidv4(),
        name,
        email,
        hashedPassword,
        profileImage: image ? image.location : null
    })

    const playerSettings = await PlayerSettings.create({
        id: uuidv4(),
        playerId: player.id,
        theme: 'light',
        locations: false,
        notifications: false
    })

    const playerPublic = {
        id: player.id,
        name: player.name,
        email: player.email,
        profileImage: player.profileImage,
        createdAt: player.createdAt,
    }

    await setTokenCookie(res, playerPublic);

    return res.status(201).json({
        status: 201,
        message: "Congrats. You created a player.",
        data: playerPublic,
        errors: {},
    })
})

module.exports = router;