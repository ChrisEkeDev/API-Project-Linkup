const express = require('express');
const router = express.Router();
const { CheckIn, Session, Player, Comment, SessionImage, SessionChat, Court } = require('../../db/models');
const { Op, fn, col } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { uploadMedia, deleteMedia } = require('../../utils/aws');
const { validateCreateSession, validateEditSession } = require('./validation/expressValidations')
const { sessionNotFound, playerNotAuthorized } =require('./constants/responseMessages');


// Search Sessions Sorted by Relevance
router.get('/search/*', async(req, res) => {
    const { query, sortBy } = req.query;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayISOString = yesterday.toISOString()
    const lowerCaseQuery = query ? query.toLowerCase() : '';
    const sessions = await Session.findAll({
        attributes: {
            include: [
                'id',
                'name',
                'startDate',
                'endDate',
                'creatorId',
                [fn('COUNT', col('CheckIns.id')), 'checkInCount' ]
            ],
            exclude: ['CheckIn', 'courtId','updatedAt', 'createdAt', 'private']
        },
        group: ['Session.id'],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court,
                attributes: ['id', 'address', 'lat', 'lng']
            },
            {
                model: CheckIn,
                attributes: []
            }
        ],
        where: {
            endDate: {
                [Op.gte]: yesterdayISOString
            }
        },
        order: [
            [sortBy ? sortBy : 'startDate', sortBy === 'startDate' ? 'ASC' : 'DESC']
        ]
    });

    function calculateRelevance(session) {
        let relevance = 0;
        if (query) {
            lowerCaseQuery.split(' ').forEach(word => {
                if (session.name.toLowerCase().includes(word)) {
                    relevance++;
                }
                if (session.Court.address.toLowerCase().includes(word)) {
                    relevance++;
                }
                if (session.creator.name.toLowerCase().includes(word)) {
                    relevance++;
                }
            })
        }
        return relevance;
    }

  // Return the sorted objects
    return res.status(200).json({
        status: 200,
        message: null,
        data: sessions.sort((a, b) => calculateRelevance(b) - calculateRelevance(a)),
        error: null
    })

})


// Get all Sessions created by the current players
router.get('/current', requireAuth, async (req, res) => {
    const playerId = req.player.id;

    const sessions = await Session.findAll({
        where: {
            [Op.or]: [
                { creatorId: playerId },
                { '$CheckIns.playerId$': playerId}
            ]
        },
        attributes: {
            include: [
                'id',
                'name',
                'startDate',
                'endDate',
                'creatorId',
                [fn('COUNT', col('CheckIns.id')), 'checkInCount' ]
            ],
            exclude: ['CheckIn', 'courtId','updatedAt', 'createdAt', 'private']
        },
        group: ['Session.id'],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court,
                attributes: ['id', 'address', 'lat', 'lng']
            },
            {
                model: CheckIn,
                attributes: []
            }
        ]
    });


    return res.status(200).json({
        status: 200,
        message: null,
        data: sessions,
        error: null
    })
})

/////////////////////////////////////////////////////////////////

// Get details of an Session specified by its id

////////////////////
router.get('/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const session = await Session.findByPk(sessionId, {
        attributes: {
            include: [
                'id',
                'name',
                'startDate',
                'endDate',
                'creatorId',
                [fn('COUNT', col('CheckIns.id')), 'checkInCount' ]
            ],
            exclude: ['CheckIn', 'courtId','updatedAt', 'createdAt', 'private']
        },
        group: ['Session.id'],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court,
                attributes: ['id', 'address', 'lat', 'lng']
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
        message: null,
        data: session,
        error: null
    })
})

////////////////////////////////////////////////////////////////////

// Create an Session

////////////////////
router.post('/', requireAuth, uploadMedia, validateCreateSession, async (req, res) => {
    const { name, address, private, startDate, endDate } = req.body;
    const image = req.file;
    const playerId = req.player.id;

    const existingCourt = await Court.findOne({
        where: { placeId: address.id }
    })

    let newCourt;

    if (!existingCourt) {
        newCourt = await Court.create({
            placeId: address.id,
            name: address.name,
            address: address.address,
            lat: address.lat,
            lng: address.lng
        })
    }

    const session = await Session.create({
        creatorId: playerId,
        name,
        courtId: existingCourt ? existingCourt.id : newCourt.id,
        private,
        startDate,
        endDate
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
        attributes: {
            include: [
                'id',
                'name',
                'startDate',
                'endDate',
                'creatorId',
                [fn('COUNT', col('CheckIns.id')), 'checkInCount' ]
            ],
            exclude: ['CheckIn', 'courtId','updatedAt', 'createdAt', 'private']
        },
        group: ['Session.id'],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court,
                attributes: ['id', 'address', 'lat', 'lng']
            },
            {
                model: CheckIn,
                attributes: []
            }
        ]
    });


    return res.status(201).json({
        status: 201,
        message: null,
        data: newSession,
        error: null
    })

})

/////////////////////////////////////////////////////////////////////

// Edit an Session specified by its id

///////////////////////


router.put('/:sessionId', requireAuth, validateEditSession, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const { name, startDate, endDate } = req.body;
    let session = await Session.scope(null).findByPk(sessionId);

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

    const updatedSession = await Session.findByPk(session.id, {
        attributes: {
            include: [
                'id',
                'name',
                'startDate',
                'endDate',
                'creatorId',
                [fn('COUNT', col('CheckIns.id')), 'checkInCount' ]
            ],
            exclude: ['CheckIn', 'courtId', 'updatedAt', 'createdAt', 'private']
        },
        group: ['Session.id'],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['name', 'profileImage']
            },
            {
                model: Court,
                attributes: ['id', 'address', 'lat', 'lng']
            },
            {
                model: CheckIn,
                attributes: []
            }
        ]
    });

    return res.status(200).json({
        status: 200,
        message: null,
        data: updatedSession,
        error: null
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
        message: null,
        data: session,
        error: null
    })
})

// /////////////////////////////////////////////////////////////

// // Delete "outdated" sessions

// /////////////////////
// router.delete("/", async (req, res) => {
//     const sessions = await Session.findAll();
//     const today = new Date();
//     const dateLimit = today.setDate(today.getDate() - 3)
//     const oldSessions = sessions.filter((session) => new Date(session.endDate) < new Date(dateLimit));
//     oldSessions.forEach(session => session.destroy());
//     return res.status(200).json({
//         status: 200,
//         message: "Sessions older than 3 days have been deleted",
//         data: null,
//         error: null
//     })

// })


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
        message: null,
        data: checkIns,
        error: null
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

    if (new Date(session.endDate) < new Date()) {
        return res.status(403).json({
            status: 403,
            message: "This session has expired.",
            data: null,
            error: null
        })
    }

    const existingCheckIn = await CheckIn.findOne({
        where: { sessionId, playerId }
    })

    if (existingCheckIn) {
        return res.status(403).json({
            status: 403,
            message: "You have already checked in to this session.",
            data: null,
            error: null
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
        error: null
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

    if (new Date(session.endDate) < new Date()) {
        return res.status(403).json({
            status: 403,
            message: "This session has expired.",
            data: null,
            error: null
        })
    }

    const existingCheckIn = await CheckIn.findOne({
        where: { sessionId, playerId }
    })

    if (!existingCheckIn) {
        return res.status(404).json({
            status: 404,
            message: "You haven't checked in to this session yet.",
            data: null,
            error: null

        })

    }

    await existingCheckIn.destroy();
    return res.status(200).json({
        status: 200,
        message: "You have checked out of this session.",
        data: existingCheckIn,
        error: null

    })
})


router.get('/:sessionId/chat-feed', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const sessionFeed = await SessionChat.findAll({
        where: { sessionId },
        include: {
            model: Player,
            attributes: ['name', 'profileImage']
        },
        order: [['createdAt', 'ASC']]
    })
    return res.status(200).json({
        status: 200,
        message: null,
        data: sessionFeed,
        error: null
    })
})


router.post('/:sessionId/chat-feed', requireAuth, async (req, res) => {
    const playerId = req.player.id;
    const { sessionId } = req.params;
    const { content } = req.body;
    const session = await Session.findByPk(sessionId);
    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const checkIn = await CheckIn.findOne({
        where: { playerId, sessionId }
    })

    if (!checkIn) {
        return res.status(404).json(checkInNotFound)
    }
    const sessionChat = await SessionChat.create({
        content,
        playerId,
        teamId
    })

    const chat = await SessionChat.findByPk(sessionChat.id, {
        include: {
            model: Player,
            attributes: ['name', 'profileImage']
        }
    })

    return res.status(201).json({
        status: 201,
        message: "Chat created successfully",
        data: chat,
        error: null
    })
})

module.exports = router;
