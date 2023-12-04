const express = require('express');
const router = express.Router();
const { CheckIn, Session, Player, Team, SessionImage, Membership, Court } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { uploadImage, deleteImages } = require('../../utils/aws');
const { geocodeAddress } = require('../../utils/googleServices');
const { validateCreateSession, validateEditSession } = require('./validation/expressValidations')
const { sessionNotFound, playerNotAuthorized } =require('./constants/responseMessages');

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
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court,
                attributes: ['address']
            },
            {
                model: CheckIn,
                include: {
                    model: Player,
                    as: 'player',
                }
            }
        ]
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

/////////////////////////////////////////////////////////////////

// Get details of an Session specified by its id

////////////////////
router.get('/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const session = await Session.findByPk(sessionId, {
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court
            },
            {
                model: CheckIn,
                include: {
                    model: Player,
                    as: 'player',
                }
            }
        ]
    })

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

////////////////////////////////////////////////////////////////////

// Create an Session

////////////////////
router.post('/', requireAuth, uploadImage, validateCreateSession, async (req, res) => {
    const { name, address, private, startDate, endDate } = req.body;
    const image = req.file;
    const playerId = req.player.id;
    const data = await geocodeAddress(address);
    const addressData = data.results[0].formatted_address;
    const latData = data.results[0].geometry.location.lat;
    const lngData = data.results[0].geometry.location.lng;
    const placeId = data.results[0].place_id;

    const existingCourt = await Court.findOne({
        where: { placeId }
    })

    let newCourt

    if (!existingCourt) {
        newCourt = await Court.create({
            placeId,
            address: addressData,
            lat: latData,
            lng: lngData
        })
    }

    const session = await Session.create({
        creatorId: playerId,
        name,
        courtId: existingCourt ? existingCourt.id : newCourt.id,
        private,
        startDate,
        endDate,
        address: addressData,
        lat: latData,
        lng: lngData
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

    // return res.status(201).json({
    //     status: 201,
    //     message: "",
    //     data: data,
    //     errors: {}
    // })

})

/////////////////////////////////////////////////////////////////////

// Edit an Session specified by its id

///////////////////////


router.put('/:sessionId', requireAuth, validateEditSession, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const { name, startDate, endDate } = req.body;
    let session = await Session.findByPk(sessionId);

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const isAuthorized = playerId == session.creatorId;

    if (!isAuthorized) {
        return res.status(403).json(playerNotAuthorized)
    }

    await session.set({
        name: name ? name : session.name,
        startDate: startDate ? startDate : session.startDate,
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


////////////////////////////////////////////////////////////

// Delete an Session specified by its id

////////////////////
router.delete('/:sessionId', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    let session = await Session.findByPk(sessionId);

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const isAuthorized = playerId == session.creatorId;

    if (!isAuthorized) {
        return res.status(403).json(playerNotAuthorized)
    }

    await session.destroy();
    // await deleteImages(images);

    return res.status(200).json({
        status: 200,
        message: "",
        data: session,
        errors: {}
    })
})

/////////////////////////////////////////////////////////////

// Delete "outdated" sessions

/////////////////////
router.delete("/", async (req, res) => {
    const sessions = await Session.findAll();
    const today = new Date();
    const dateLimit = today.setDate(today.getDate() - 3)
    const oldSessions = sessions.filter((session) => new Date(session.endDate) < new Date(dateLimit));
    oldSessions.forEach(session => session.destroy());
    return res.status(200).json({
        status: 200,
        message: "Sessions older than 3 days have been deleted",
        data: null,
        errors: {}
    })

})


//////////////////////////////////////////////////////////

// Get all CheckIns of an Session specified by its id

////////////////
router.get('/:sessionId/check-ins', async (req, res) => {
    const { sessionId } = req.params;
    const session = await Session.findByPk(sessionId)

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const checkIns = await CheckIn.findAll({
        where: { sessionId },
        include: {
            as: "player",
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

////////////////////////////////////////////////////////////

// Check In to a Session

////////////////////
router.post('/:sessionId/check-ins', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const session = await Session.findByPk(sessionId);

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
