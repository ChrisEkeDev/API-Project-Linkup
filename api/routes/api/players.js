const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../errors/validationErrors');
const { Player } = require('../../db/models');
const { uploadImage, deleteImages } = require('../../utils/aws');

const validateSignUp = [
    check('name').exists({checkFalsy: true}).withMessage('How are we going to know what to call you?'),
    check('email').exists({checkFalsy: true}).isEmail().withMessage('Really? We need a working email address.'),
    check('password').exists({checkFalsy: true}).isLength({min: 6}).withMessage('Your password is too short. Get creative.'),
    handleValidationErrors("There was a problem signing you up")
]

// Signup
router.post('/', uploadImage, validateSignUp, async (req, res) => {
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

    let hashedPassword = bcrypt.hashSync(password, 13)

    const player = await Player.create({
        name,
        email,
        hashedPassword,
        profileImage: image ? image.location : null
    })

    const playerPublic = {
        id: player.id,
        name: player.firstName,
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
