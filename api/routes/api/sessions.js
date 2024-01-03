const express = require('express');
const router = express.Router();
const { CheckIn, Session, Player, Team, SessionImage, Membership, Court } = require('../../db/models');
const { Op, fn, col } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { uploadImage, deleteImages } = require('../../utils/aws');
const { geocodeAddress } = require('../../utils/googleServices');
const { validateCreateSession, validateEditSession } = require('./validation/expressValidations')
const { sessionNotFound, playerNotAuthorized } =require('./constants/responseMessages');


// Search Sessions Sorted by Relevance
router.get('/search/*', async(req, res) => {
    const { query, sortBy, sortDir } = req.query;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayISOString = yesterday.toISOString()
    const lowerCaseQuery = query ? query.toLowerCase() : '';
    const sessions = await Session.findAll({
        where: {
            endDate: {
                [Op.gte]: yesterdayISOString
            }
        },
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court,
                attributes: ['address', 'lat', 'lng']
            },
            {
                model: CheckIn,
                attributes: []
            }
        ],
        attributes: {
            include: [
                'id',
                'name',
                'startDate',
                [fn('COUNT', col('CheckIns.id')), 'checkInCount' ]
            ],
            exclude: ['CheckIn', 'courtId', 'creatorId', 'endDate', 'updatedAt', 'createdAt', 'private']
        },
        group: ['Session.id'],
        order: [
            [sortBy ? sortBy : 'startDate', sortBy === 'startDate' ? 'ASC' : 'DESC']
        ]
    });

function calculateRelevance(session) {
        let relevance = 0;
        if (query && session.name.toLowerCase().includes(lowerCaseQuery)) {
            relevance++;
        }
        // if (article.title.toLowerCase().includes(lowerCaseQuery)) {
        //     relevance++;
        // }
        // relevance += article.content.toLowerCase().split(lowerCaseQuery).length - 1;
        // ... add more rules if needed ...
        return relevance;
    }

  // Return the sorted objects
    return res.status(200).json({
        status: 200,
        message: "",
        data: sessions.sort((a, b) => calculateRelevance(b) - calculateRelevance(a)),
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

    await CheckIn.create({
        sessionId: session.id, playerId
    })

    if (image) {
        await SessionImage.create({
            sessionId: session.id,
            url: image.location
        })
    }

    const newSession = await Session.findByPk(session.id, {
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


    return res.status(201).json({
        status: 201,
        message: "",
        data: newSession,
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
        return res.status(403).json({
            status: 403,
            message: "You have already checked in to this session.",
            data: null,
            errors: {}

        })

    }

    const checkIn = await CheckIn.create({
        sessionId, playerId
    })

    const newCheckIn = await CheckIn.findByPk(checkIn.id, {
        include: {
            model: Player,
            as: 'player',
        }
    })

    return res.status(201).json({
        status: 201,
        message: "You have checked in to this session.",
        data: newCheckIn,
        errors: {}

    })
})


////////////////////////////////////////////////////////////

// Check Out of a Session

////////////////////
router.delete('/:sessionId/check-ins', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const session = await Session.findByPk(sessionId);

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const existingCheckIn = await CheckIn.findOne({
        where: { sessionId, playerId }
    })

    if (!existingCheckIn) {
        return res.status(404).json({
            status: 404,
            message: "You haven't checked in to this session yet.",
            data: null,
            errors: {}

        })

    }

    await existingCheckIn.destroy();
    return res.status(200).json({
        status: 200,
        message: "You have checked out of this session.",
        data: existingCheckIn,
        errors: {}

    })
})

module.exports = router;
