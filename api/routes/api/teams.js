const express = require('express');
const router = express.Router();
const { Team, Membership, Player, TeamChat, Session, CheckIn } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const {  Op, fn, col } = require('sequelize');
const { validateCreateTeam, validateEditTeam } = require('./validation/expressValidations')
const { teamNotFound, playerNotAuthorized, membershipNotFound, membershipAlreadyExists } = require('./constants/responseMessages');


// Get all teams
router.get('/search/*', async (req, res) => {
    const { query, sortBy } = req.query;
    const lowerCaseQuery = query ? query.toLowerCase() : '';
    let teams = await Team.findAll({
        attributes: {
            include: [[fn('COUNT', col('Memberships.id')), 'members']],
            exclude: ['updatedAt']
        },
        group: ['Team.id'],
        include: [
            {
                model: Membership,
                attributes: []
            },
            {
                as: "captain",
                model: Player,
                attributes: ['id', 'name', 'profileImage']
            },
        ],
        order: [
            [sortBy ? sortBy : 'createdAt', sortBy === 'startDate' ? 'ASC' : 'DESC']
        ]
    })

    function calculateRelevance(team) {
        let relevance = 0;
        if (query) {
            lowerCaseQuery.split(' ').forEach(word => {
                if (team.name.toLowerCase().includes(word)) {
                    relevance++;
                }
            })
        }
        return relevance;
    }

    return res.status(200).json({
        status: 200,
        message: null,
        data: teams.sort((a, b) => calculateRelevance(b) - calculateRelevance(a)),
        error: null
    })
})



// Get all teams created by the current player
router.get('/current', requireAuth, async (req, res) => {
    const playerId = req.player.id;

    let teams = await Team.findAll({
        where: { captainId: playerId },
        attributes: {
            include: [[fn('COUNT', col('Memberships.id')), 'members']],
            exclude: ['updatedAt']
        },
        group: ['Team.id'],
        include: [
            {
                model: Membership,
                attributes: []
            },
            {
                as: "captain",
                model: Player,
                attributes: ['id', 'name', 'profileImage']
            },
        ]
    })

    return res.status(200).json({
        status: 200,
        message:null,
        data: teams,
        error: null
    })
})

// Get all sessions hosted by the team
router.get('/:teamId/sessions', async(req, res) => {
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId)
    // Checks if the team exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const teamSessions = await Session.findAll({
        where: { hostId: team.id},
        attributes: {
            include: [
                [fn('COUNT', col('CheckIns.id')), 'checkInCount' ]
            ],
            exclude: ['CheckIn','updatedAt']
        },
        group: ['Session.id'],
        include: [
            {
                model: Player,
                as: 'creator'
            },
            {
                model: CheckIn,
                attributes: []
            }
        ]
    })

    return res.status(200).json({
        status: 200,
        message:null,
        data: teamSessions,
        error: null
    })
})



// Get details of team by ID
router.get('/:teamId', async (req, res) => {
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId, {
        attributes: {
            exclude: ['updatedAt']
        },
        include: [
            {
                model: Player,
                as: "captain",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: Player,
                through: {
                    model: Membership
                },
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: TeamChat,
                include: {
                    model: Player,
                    attributes: ['name', 'profileImage']
                },
                order: [['createdAt', 'DESC']],
                limit: 3
            }
        ]
    })

    // Checks if the team exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    return res.status(200).json({
        status: 200,
        message: null,
        data: team,
        error: null
    })
})



// // Create a team
router.post('/', requireAuth, validateCreateTeam, async (req, res) => {
    const { name, private } = req.body;
    const playerId = req.player.id;

    // Creates the team
    const team = await Team.create({
        id: uuidv4(),
        captainId: playerId,
        name,
        private
    })

    // Create the Membership
    await Membership.create({
        id: uuidv4(),
        playerId,
        teamId: team.id,
        status: 'host'
    })

    const newTeam = await Team.findByPk(team.id, {
        attributes: {
            exclude: ['updatedAt']
        },
        include: [
            {
                model: Player,
                as: "captain",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: Player,
                through: {
                    model: Membership
                },
                attributes: ['name', 'profileImage']
            },
            {
                model: TeamChat,
                include: {
                    model: Player,
                    attributes: ['name', 'profileImage']
                },
                order: [['createdAt', 'DESC']],
                limit: 3
            }
        ]
    })

    return res.status(201).json({
        status: 201,
        message: null,
        data: newTeam,
        error: null
    })
})

// // Update a team based on ID
router.put('/:teamId', requireAuth, validateEditTeam, async (req, res) => {
    const { teamId } = req.params;
    const playerId = req.player.id;
    const { name, private } = req.body;
    let team = await Team.findByPk(teamId);

    // Checks if the group exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const isCaptain = playerId == team.captainId;

    if (!isCaptain) {
        return res.status(403).json(playerNotAuthorized)
    }

    // Updates the group
    await team.set({
        name: name ? name : team.name,
        private: private !== null ? private : team.private,
    })

    await team.save();

    const updatedTeam = await Team.findByPk(team.id, {
        attributes: {
            exclude: ['updatedAt']
        },
        include: [
            {
                model: Player,
                as: "captain",
                attributes: ['id', 'name', 'profileImage']
            },
            {
                model: Player,
                through: {
                    model: Membership
                },
                attributes: ['name', 'profileImage']
            },
            {
                model: TeamChat,
                include: {
                    model: Player,
                    attributes: ['name', 'profileImage']
                },
                order: [['createdAt', 'DESC']],
                limit: 3
            }
        ]
    })

    return res.status(200).json({
        status: 200,
        message: null,
        data: updatedTeam,
        error: null
    })
})



// Delete a team based on ID
router.delete('/:teamId', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    let team = await Team.findByPk(teamId)
    const playerId = req.player.id;

    // Checks if the groups exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const isCaptain = playerId == team.captainId;

    if(!isCaptain) {
        return res.status(403).json(playerNotAuthorized)
    }

    await team.destroy();

    return res.status(200).json({
        status: 200,
        message: team.name + " was deleted successfully.",
        data: null,
        error: null,
    })
})


// GET ALL MEMBERSHIPS FOR A TEAM
router.get('/:teamId/memberships', async (req, res) => {
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId)

    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const memberships = await Membership.findAll({
        where: { teamId },
        attributes: {
            include: ['createdAt']
        },
        include: {
            model: Player
        }
    })

    return res.status(200).json({
        status: 200,
        message: null,
        data: memberships,
        error: null
    })
})


//Request a Membership for a Team based on the Team's id
router.post('/:teamId/join-team', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const playerId = req.player.id;
    const team = await Team.findByPk(teamId);

    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const membership = await Membership.findOne({
        where: { teamId: team.id, playerId }
    })

    if (membership) {
        return res.status(405).json(membershipAlreadyExists)
    }

    const newMembership = await Membership.create({
        playerId, teamId: team.id,
        status: team.private ? 'pending' : 'member'
    })

    const createdMembership = await Membership.findByPk(newMembership.id, {
        attributes: {
            include: ['createdAt']
        },
        include: {
            model: Player
        }
    })

    return res.status(201).json({
        status: 201,
        message: team.private ? "You request to join is pending" : "You have joined this team",
        data: createdMembership,
        error: null
    })
})


// Promote to Co-Host
router.put('/:teamId/promote-to-co-host', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const { playerId } = req.body;
    const authId = req.player.id;

    const authMembership = await Membership.findOne({
        where: { teamId, playerId: authId, status: 'host' }
    })

    if (!authMembership) {
        return res.status(403).json(playerNotAuthorized)
    }

    const membership = await Membership.findOne({
        where: { teamId, playerId }
    })

    if (!membership) {
        return res.status(403).json(membershipNotFound)
    }

    membership.set({status: 'co-host'})
    membership.save();

    const updatedMembership = await Membership.findByPk(membership.id, {
        attributes: {
            include: ['createdAt']
        },
        include: {
            model: Player
        }
    })

    return res.status(201).json({
        status: 201,
        message: "",
        data: updatedMembership,
        error: null
    })
})

// Promote to Member
router.put('/:teamId/add-to-team', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const { playerId } = req.body;
    const authId = req.player.id;

    const authMembership = await Membership.findOne({
        where: { teamId, playerId: authId, status: {[Op.or]: ['host', 'co-host']}}
    })

    if (!authMembership) {
        return res.status(403).json(playerNotAuthorized)
    }

    const membership = await Membership.findOne({
        where: { teamId, playerId }
    })

    if (!membership) {
        return res.status(404).json(membershipNotFound)
    }

    membership.set({status: 'member'})
    membership.save();

    const updatedMembership = await Membership.findByPk(membership.id, {
        attributes: {
            include: ['createdAt']
        },
        include: {
            model: Player
        }
    })

    return res.status(201).json({
        status: 201,
        message: "",
        data: updatedMembership,
        error: null
    })
})

router.delete('/:teamId/leave-team', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const playerId = req.player.id;
    const team = await Team.findByPk(teamId)
    if (!team) return res.status(404).json(teamNotFound)
    const membership = await Membership.findOne({
        where: { playerId, teamId }
    })
    if (!membership) return res.status(404).json(membershipNotFound)
    if (membership.status === 'host') {
        return res.status(403).json(cantDeleteMembership)
    }
    await membership.destroy()
    return res.status(200).json({
        status: 200,
        message: "Membership deleted successfully",
        data: membership,
        error: null
    })
})

// // Delete membership to a group specified by id
router.delete('/:teamId/remove-from-team', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const { playerId } = req.body;
    const authId = req.player.id;

    const requestMembership = await Membership.findOne({
        where: { playerId: authId, teamId }
    })

    const membership = await Membership.findOne({
        where: { playerId, teamId }
    })

    if (!requestMembership && !membership) {
        return res.status(404).json(membershipNotFound)
    }

    const requestStatus = requestMembership.status;
    const isSelf = authId == playerId;
    const isHostDeleteSelf = requestStatus === 'host' && isSelf;
    const isAuthorized = isSelf || ['host', 'co-host'].includes(requestStatus)

    if (isHostDeleteSelf) {
        return res.status(404).json(cantDeleteMembership)
    }

    if (!isAuthorized) {
        return res.status(403).json(playerNotAuthorized)
    }

    await membership.destroy()

    return res.status(200).json({
        status: 200,
        message: "Membership deleted successfully",
        data: membership,
        error: null
    })

})


router.get('/:teamId/chat-feed', requireAuth, async (req, res) => {
    const { teamId } = req.params;

    const teamFeed = await TeamChat.findAll({
        where: { teamId },
        include: {
            model: Player,
            attributes: ['name', 'profileImage']
        },
        order: [['createdAt', 'ASC']]
    })

    return res.status(200).json({
        status: 200,
        message: null,
        data: teamFeed,
        error: null
    })
})



router.post('/:teamId/chat-feed', requireAuth, async (req, res) => {
    const playerId = req.player.id;
    const { teamId } = req.params;
    const { content } = req.body;
    const team = await Team.findByPk(teamId);
    if (!team) {
        return res.status(404).json(teamNotFound)
    }
    const membership = await Membership.findOne({
        where: { playerId, teamId }
    })

    if (!membership) {
        return res.status(404).json(membershipNotFound)
    }

    const teamChat = await TeamChat.create({
        content,
        playerId,
        teamId
    })

    const chat = await TeamChat.findByPk(teamChat.id, {
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
