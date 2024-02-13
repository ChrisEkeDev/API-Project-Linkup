const express = require('express');
const router = express.Router();
const { CheckIn, Session, Player, Team, SessionImage, SessionChat, Like } = require('../../db/models');
const { sequelize, Op, fn, col, literal } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { uploadMedia, deleteMedia } = require('../../utils/aws');
const { validateCreateSession, validateEditSession } = require('./validation/expressValidations')
const { sessionNotFound, playerNotAuthorized, teamNotFound, checkInNotFound } =require('./constants/responseMessages');
const { v4: uuidv4 } = require('uuid');


// Search Sessions Sorted by Relevance
router.get('/search/*', async(req, res) => {
    const { query, sortBy } = req.query;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayISOString = yesterday.toISOString()
    const lowerCaseQuery = query ? query.toLowerCase() : '';

    const sessions = await Session.findAll({
        attributes: [
            'id',
            'name',
            'startDate',
            'address',
            'private',
            [fn('COUNT', col('CheckIns.id')), 'checkIns']
        ],
        where: {
            endDate: {
                [Op.gte]: yesterdayISOString
            }
        },
        order: [
            [sortBy ? sortBy : 'startDate', sortBy === 'startDate' ? 'ASC' : 'DESC']
        ],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: CheckIn,
                attributes: []
            },
            {
                model: Team,
                as: "host",
                include: {
                    model: Player,
                    as: 'captain',
                    attributes: ['id', 'profileImage', 'name']
                },
                attributes: ['id', 'name']
            }
        ],
        group: [
            'Session.id',
            'Session.name',
            'Session.startDate',
            'Session.address',
            'Session.private',
            'creator.id',
            'creator.name',
            'creator.profileImage',
            'host.id',
            'host.name',
            'host.captain.id',
            'host.captain.profileImage',
            'host.captain.name'
        ],
    })

    function calculateRelevance(session) {
        let relevance = 0;
        if (query) {
            lowerCaseQuery.split(' ').forEach(word => {
                if (session.name.toLowerCase().includes(word)) {
                    relevance++;
                }
                if (session.address.toLowerCase().includes(word)) {
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


// Get all Sessions created or joined by the current players
router.get('/current', requireAuth, async (req, res) => {
    const playerId = req.player.id;
    const sessions = await Session.findAll({
        where: {
            [Op.or]: [
                { creatorId: playerId },
                { '$CheckIns.playerId$': playerId}
            ]
        },
        attributes: [
            'id',
            'name',
            'startDate',
            'address',
            'private',
            [fn('COUNT', col('CheckIns.id')), 'checkIns']
        ],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: CheckIn,
                attributes: []
            },
            {
                model: Team,
                as: "host",
                include: {
                    model: Player,
                    as: 'captain',
                    attributes: ['id', 'profileImage', 'name']
                },
                attributes: ['id', 'name']
            }
        ],
        group: [
            'Session.id',
            'Session.name',
            'Session.startDate',
            'Session.address',
            'Session.private',
            'creator.id',
            'creator.name',
            'creator.profileImage',
            'host.id',
            'host.name',
            'host.captain.id',
            'host.captain.profileImage',
            'host.captain.name'
        ],
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
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: CheckIn,
                include: {
                    model: Player,
                    as: 'player',
                }
            },
            {
                model: Team,
                as: 'host',
                attributes: ['id', 'name'],
                include: [{
                    model: Player,
                    as: 'captain',
                    attributes: ['profileImage', 'name']
                }]
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

////////////////////////////////////////

// Checks users attendance status in the specified session

////////////////////////////////////////

router.get('/:sessionId/current', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const checkIn = await CheckIn.findOne({
        where: {playerId, sessionId }
    })

    return res.status(200).json({
        status: 200,
        message: null,
        data: checkIn ? checkIn.status : false,
        error: null
    })

})


////////////////////////////////////////////////////////////////////

// Create a Session

////////////////////
router.post('/', requireAuth, uploadMedia, validateCreateSession, async (req, res) => {
    const { name, address, private, startDate, endDate, hostId } = req.body;
    const image = req.file;
    const playerId = req.player.id;

    const session = await Session.create({
        id: uuidv4(),
        creatorId: playerId,
        name,
        placeId: address.place_id,
        address: address.address,
        lat: address.lat,
        lng: address.lng,
        private,
        startDate,
        endDate,
        hostId
    })

    await CheckIn.create({
        id: uuidv4(),
        sessionId: session.id,
        playerId,
        status: 'attending'
    })

    if (image) {
        await SessionImage.create({
            id: uuidv4(),
            sessionId: session.id,
            url: image.location
        })
    }

    const newSession = await Session.findByPk(session.id, {
        attributes: [
            'id',
            'name',
            'startDate',
            'address',
            'private',
            [fn('COUNT', col('CheckIns.id')), 'checkIns']
        ],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: CheckIn,
                attributes: []
            },
            {
                model: Team,
                as: 'host',
                include: {
                    model: Player,
                    as: 'captain',
                    attributes: ['id', 'profileImage', 'name']
                },
                attributes: ['id', 'name']
            }
        ],
        group: [
            'Session.id',
            'Session.name',
            'Session.startDate',
            'Session.address',
            'Session.private',
            'creator.id',
            'creator.name',
            'creator.profileImage',
            'host.id',
            'host.name',
            'host.captain.id',
            'host.captain.profileImage',
            'host.captain.name'
        ],
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
    const { name, startDate, endDate, hostId, private } = req.body;
    const session = await Session.findByPk(sessionId);
    console.log(session , hostId)

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
        endDate: endDate ? endDate : session.endDate,
        hostId: hostId ? hostId : session.hostId,
        private: private !== null ? private : session.private
    })
    await session.save();



    const updatedSession = await Session.findByPk(session.id, {
        attributes: [
            'id',
            'name',
            'startDate',
            'address',
            'private',
            [fn('COUNT', col('CheckIns.id')), 'checkIns']
        ],
        include: [
            {
                model: Player,
                as: "creator",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: CheckIn,
                attributes: []
            },
            {
                model: Team,
                as: 'host',
                include: {
                    model: Player,
                    as: 'captain',
                    attributes: ['id', 'profileImage', 'name']
                },
                attributes: ['id', 'name']
            }
        ],
        group: [
            'Session.id',
            'Session.name',
            'Session.startDate',
            'Session.address',
            'Session.private',
            'creator.id',
            'creator.name',
            'creator.profileImage',
            'host.id',
            'host.name',
            'host.captain.id',
            'host.captain.profileImage',
            'host.captain.name'
        ],
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
        include: [
            {
                model: Session,
                as: 'session',
                attributes: ['creatorId']
            },
            {
                as: "player",
                model: Player
            }
        ]
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
router.post('/:sessionId/check-in', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const session = await Session.findByPk(sessionId);
    const sessionExpired = new Date(session.endDate) < new Date();
    const existingCheckIn = await CheckIn.findOne({
        where: { sessionId, playerId }
    })

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    if (sessionExpired) {
        return res.status(403).json({
            status: 403,
            message: "This session has expired.",
            data: null,
            error: null
        })
    }

    if (existingCheckIn) {
        return res.status(403).json({
            status: 403,
            message: "You have already checked in to this session.",
            data: null,
            error: null
        })
    }

    const checkIn = await CheckIn.create({
        id: uuidv4(),
        sessionId,
        playerId,
        status: session.private ? 'pending' : 'attending'
    })

    const newCheckIn = await CheckIn.findByPk(checkIn.id, {
        attributes: ['id', 'status', 'sessionId'],
        include: [
            {
                model: Session,
                as: 'session',
                attributes: ['id', 'name', 'startDate', 'endDate', 'hostId'],
                include: {
                    model: Team,
                    attributes: ['name'],
                    include: [
                        {
                            as: "captain",
                            model: Player,
                            attributes: ['name', 'profileImage']
                        }
                    ]
                }
            }
        ]
    })

    return res.status(201).json({
        status: 201,
        message: session.private ? "You request to join is pending." : "You are checked in to this session.",
        data: newCheckIn,
        error: null
    })
})

/////////////////////////////////////////////////////////

//  Add a Player to Session

/////////////////

router.put('/:sessionId/add-to-session', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const { playerId } = req.body;
    const authId = req.player.id;

    const session = await Session.findByPk(sessionId)

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const isCreator = authId === session.creatorId;


    const checkIn = await CheckIn.findOne({
        where: { playerId, sessionId }
    })

    if (!checkIn) {
        return res.status(404).json(checkInNotFound)
    }

    if (!isCreator) {
        return res.status(403).json(playerNotAuthorized)
    }

    await checkIn.set({status: 'attending'})
    await checkIn.save();

    const updatedCheckIn = await CheckIn.findByPk(checkIn.id, {
        include: [
            {
                model: Session,
                as: 'session',
                attributes: ['creatorId']
            },
            {
                as: "player",
                model: Player
            }
        ]
    })

    return res.status(200).json({
        status: 200,
        message: "You have been approved for the session",
        data: updatedCheckIn,
        error: null
    })

})


/////////////////////////////////////////////////////////

//  Remove a Player from Session

/////////////////

router.delete('/:sessionId/remove-from-session', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const { playerId } = req.body;
    const authId = req.player.id;
    const session = await Session.findByPk(sessionId);

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const isCreator = authId === session.creatorId;

    const checkIn = await CheckIn.findOne({
        where: { playerId, sessionId }
    })

    if (!checkIn) {
        return res.status(404).json(checkInNotFound)
    }

    if (!isCreator) {
        return res.status(403).json(playerNotAuthorized)
    }

    await checkIn.destroy()

    return res.status(200).json({
        status: 200,
        message: "Membership deleted successfully",
        data: checkIn,
        error: null
    })
})

////////////////////////////////////////////////////////////

// Check Out of a Session

////////////////////
router.delete('/:sessionId/check-out', requireAuth, async (req, res) => {
    const { sessionId } = req.params;
    const playerId = req.player.id;
    const session = await Session.findByPk(sessionId);
    const sessionExpired = new Date(session.endDate) < new Date();

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    if (sessionExpired) {
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


router.get('/:sessionId/chat-feed', async (req, res) => {
    const { sessionId } = req.params;
    const sessionFeed = await SessionChat.findAll({
        where: { sessionId },
        attributes: {
            include: [
                [fn('COUNT', col('Likes.id')), 'likes']
            ]
        },
        include: [
            {
                model: Player,
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: Like,
                attributes: []
            }
        ],
        group: [
            'SessionChat.id',
            'Player.id',
            'Player.name',
            'Player.profileImage',
        ],
        order: [['createdAt', 'ASC']]
    })
    return res.status(200).json({
        status: 200,
        message: null,
        data: sessionFeed,
        error: null
    })
})

router.get('/:sessionId/chat-feed/top-comments', async (req, res) => {
    const { sessionId } = req.params;

    const sessionFeed = await SessionChat.findAll({
        where: { sessionId },
        include: [
            {
                model: Player,
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: Like,
                attributes: [],
            }
        ],
        attributes: {
            include: [
                [fn('COUNT', col('Likes.id')), 'likes']
            ]
        },
        group: [
            'SessionChat.id',
            'Player.id',
            'Player.name',
            'Player.profileImage',
        ],
        order: [[literal("likes"), 'DESC']],
        limit: 3
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
        id: uuidv4(),
        content,
        playerId,
        sessionId
    })

    const chat = await SessionChat.findByPk(sessionChat.id, {
        attributes: {
            include: [
                [fn('COUNT', col('Likes.id')), 'likes']
            ]
        },
        include: [
            {
                model: Player,
                attributes: ['name', 'profileImage']
            },
            {
                model: Like,
                attributes: [] // empty array means do not fetch columns from the Likes table
            }
        ],
        group: [
            'SessionChat.id',
            'Player.id',
            'Player.name',
            'Player.profileImage',
        ],
    })

    return res.status(201).json({
        status: 201,
        message: "Chat created successfully",
        data: chat,
        error: null
    })
})

module.exports = router;
