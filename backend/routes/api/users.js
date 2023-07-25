const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const s3 = new AWS.S3();

AWS.config.update({
    region: process.env.AWS_S3_REGION,
    correctClockSkew: true
})

router.use(bodyParser.json())

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'linkup-bucket',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
})

const validateSignUp = [
    check('firstName').exists({checkFalsy: true}).withMessage('First Name is required'),
    check('lastName').exists({checkFalsy: true}).withMessage('Last Name is required'),
    check('username').exists({checkFalsy: true}).isLength({min: 4}).withMessage('Username must be 4 characters or more'),
    check('username').not().isEmail().withMessage('Username cannot be an email'),
    check('email').exists({checkFalsy: true}).isEmail().withMessage('Invalid email'),
    check('password').exists({checkFalsy: true}).isLength({min: 6}).withMessage('Password must be 6 characters or more'),
    handleValidationErrors
]

// Signup
router.post('/', upload.single('image'), validateSignUp, async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    const image = req.file;

    const userExistsEmail = await User.findOne({
        where: {
            email: email
        }
    })

    const userExistsUsername = await User.findOne({
        where: {
            username: username
        }
    })

    if (userExistsEmail) {
        return res.status(500).json({
            message: "User already exists",
            errors: {
                email: "User with that email already exists"
            }
        })
    }

    if (userExistsUsername) {
        return res.status(500).json({
            message: "User already exists",
            errors: {
                username: "User with that username already exists"
            }
        })
    }

    let hashedPassword = bcrypt.hashSync(password, 13)

    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
        profileImage: image ? image.location : null
    })

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage
    }

    await setTokenCookie(res, safeUser);

    return res.json({user: safeUser})
})

module.exports = router;
