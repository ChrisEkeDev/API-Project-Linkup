const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../errors/validationErrors');
const { CheckIn, Session, Player, Team, SessionImage, Membership } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { uploadImage, deleteImages } = require('../../utils/aws');

const sessionNotFound = {
    status: 404,
    message: "Session couldn't be found",
    data: null,
    errors: {
        session: "The 'sessionId' is not recognized as a valid entity"
    }
};

const playerNotAuthorized = {
    status: 403,
    message: "not authorized",
    data: null,
    errors: {
        player: "You are not authorized to make this request"
    }
}

// Get All Sessions with optional query filters
router.get('/', async (req, res) => {
    // let { page, size, query } = req.query;

    // let where = {}
    // const pagination = {}

    // if (size) {
    //     if (size >= 1 && size <= 30 ) {
    //         pagination.limit = parseInt(size)
    //     } else {
    //         pagination.limit = 20
    //     }
    // }

    // if (page) {
    //     if ( page >= 1 && page <= 10 ) {
    //         pagination.offset = parseInt(size) * (parseInt(page) - 1)
    //     } else {
    //         pagination.offset = parseInt(size) * (parseInt(1) - 1)
    //     }
    // }

    // if ( query ) {
    //     where = {
    //         [Op.or]: [
    //             { name: { [Op.like]:`%${query}%`  }}
    //         ]
    //     }
    // }


    const sessions = await Session.findAll({
        include: {
                model: CheckIn
        }
    });

    return res.status(200).json({
        status: 200,
        message: "",
        data: sessions,
        errors: {}
    })
})

// Get all Sessions created by the current players
router.get('/current', requireAuth, async (req, res) => {
    const playerId = req.player.id;

    const sessions = await Session.findAll({
        where: { creatorId: playerId }
    })

    return res.status(200).json({
        status: 200,
        message: "",
        data: sessions,
        errors: {}
    })
})


// Get details of an Session specified by its id
router.get('/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const session = await Session.findByPk(sessionId, {

    })

    // Checks if event exists
    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    return res.status(200).json({
        status: 200,
        message: "",
        data: session,
        errors: {}
    })
})

// // Create an Session for a Team specified by its id
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

router.post('/', requireAuth, uploadImage, validateCreateSession, async (req, res) => {
    const { teamId } = req.params;
    const { name, address, private, startDate, endDate } = req.body;
    const image = req.file;
    const playerId = req.player.id;
    const team = await Team.findByPk(teamId);

    // Checks if the group exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const membership = await Membership.findOne({
        where: { playerId, teamId }
    })

    if (!membership) {
        return res.status(404).json({
            status: 404,
            message: "Membership not found",
            data: null,
            errors: {
                membership: "You need to join or create a team to post a session."
            }
        })
    }

    const session = await Session.create({
        name, address, private, startDate, endDate,
        lat: 20.000000005,
        lng: 20.000046776,
    })

    if (image) {
        await SessionImage.create({
            sessionId: session.id,
            url: image.location
        })
    }

    return res.status(201).json({
        status: 201,
        message: "",
        data: session,
        errors: {}
    })

})



// Edit an Session specified by its id
const validateEditSession = [
    check('name').optional().exists({checkFalsy: true}).isLength({min: 5}).withMessage('Name must be at leat 5 characters'),
    check('address').optional().exists({checkFalsy: true}).withMessage('Please enter an address'),
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

router.put('/:sessionId', requireAuth, validateEditSession, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const { name, address, startDate, endDate } = req.body;
    let session = await Session.findByPk(sessionId);

    // Checks if event exists
    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const isAuthorized = playerId == session.creatorId;
    // Authorization
    if (!isAuthorized) {
        return res.status(403),json(playerNotAuthorized)
    }

    // Update event
    await session.set({
        name: name ? name : session.name,
        address: address ? address : session.address,
        startDate: startDate ? startDate : session.startDate,
        lat: 40.00000000, lng: 100.34453434,
        endDate: endDate ? endDate : session.endDate
    })

    await session.save();

    return res.status(200).json({
        status: 200,
        message: "",
        data: session,
        errors: {}
    })

})


// Delete an Session specified by its id
router.delete('/:sessionId', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    let session = await Session.findByPk(sessionId);

    // Checks if event exists
    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const isAuthorized = playerId == session.creatorId;

    await session.destroy();
    await deleteImages(images);

    return res.status(200).json({
        status: 200,
        message: "",
        data: null,
        errors: {}
    })
})


// Get all CheckIns of an Session specified by its id
router.get('/:sessionId/check-ins', async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;

    // Checks if the session exists
    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const checkIns = await CheckIn.findAll({
        where: { sessionId },
        include: {
            model: Player
        }
    })

    return res.status(200).json({
        status: 200,
        message: "",
        data: checkIns,
        errors: {}
    })



})



// Check In to a Session
router.post('/:sessionId/check-ins', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const session = await Session.findByPk(sessionId);

    // Checks if the session exists
    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const existingCheckIn = await CheckIn.findOne({
        where: { sessionId, playerId }
    })

    if (existingCheckIn) {
        return res.status(405).json({
            status: 405,
            message: "You've already checked in to this session",
            data: null,
            errors: {}
        })
    }

    const checkIn = await CheckIn.create({
        sessionId, playerId
    })

    return res.status(201).json({
        status: 201,
        message: "",
        data: checkIn,
        errors: {}

    })
})



module.exports = router;
