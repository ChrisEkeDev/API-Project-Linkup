const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../errors/validationErrors');
const { Team, Membership, Player, CheckIn, Session } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const teamNotFound = {
    status: 404,
    message: "Team couldn't be found",
    data: null,
    errors: {
        teamId: "The 'teamId' is not recognized as a valid entity"
    }
};

const playerNotAuthorized = {
    status: 403,
    message: "not authorized",
    data: null,
    errors: {
        teamId: "You are not authorized to make this request"
    }
}


// Get all teams
router.get('/', async (req, res) => {
    let teams = await Team.findAll({
        attributes: {
            exclude: ['captainId', 'updatedAt']
        },
        include: {
            as: "captain",
            model: Player,
            attributes: ['name', 'profileImage']
        }
    })

    for (team of teams) {
        const memberships = await Membership.findAll({
            where: { teamId: team.id, status: "member" }
        })
        team.dataValues.numMembers = memberships.length;
    }

    return res.status(200).json({
        status: 200,
        message: "",
        data: teams,
        errors: {}
    })
})



// Get all teams joined by current player
router.get('/current', requireAuth, async (req, res) => {
    const playerId = req.player.id;

    const teams = await Team.findAll({
        include: {
            model: Membership,
            where: { playerId },
            attributes: []
        }
    })

    return res.status(200).json({
        status: 200,
        message: "",
        data: teams,
        errors: {}
    })
})



// Get details of team by ID
router.get('/:teamId', async (req, res) => {
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId, {
        attributes: {
            exclude: ['updatedAt', 'captainId']
        },
        include: [
            {
                model: Player,
                as: "captain",
                attributes: ['name', 'profileImage']
            },
            {
                model: Player,
                through: {
                    model: Membership,
                    attributes: []
                },
                attributes: ['name', 'profileImage']
            }
        ]
    })

    // Checks if the team exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    return res.status(200).json({
        status: 200,
        message: "",
        data: team,
        errors: {}
    })
})



// // Create a team
const validateCreateTeam = [
    check('name').exists({checkFalsy: true}).isLength({max: 60, min: 5}).withMessage('Name must be 60 characters or less'),
    check('private').exists().isBoolean().withMessage('Private must be a boolean'),
    handleValidationErrors("There was a problem creating your team")
]

router.post('/', requireAuth, validateCreateTeam, async (req, res) => {
    const { name, private } = req.body;
    const playerId = req.player.id;

    // Creates the team
    const team = await Team.create({
        captainId: playerId,
        name,
        private
    })

    // Create the Membership
    await Membership.create({
        playerId,
        teamId: team.id,
        status: 'member'
    })

    return res.status(201).json({
        status: 201,
        message: "",
        data: team,
        errors: {}
    })
})

// // Update a team based on ID
const validateEditTeam = [
    check('name').optional().isLength({max: 60, min: 5}).withMessage('Name must be 60 characters or less'),
    check('private').optional().isBoolean().withMessage('Private must be a boolean'),
    handleValidationErrors("There was a problem updating your team")
]

router.put('/:teamId', requireAuth, validateEditTeam, async (req, res) => {
    const { teamId } = req.params;
    const playerId = req.player.id;
    const { name, private } = req.body;
    let team = await Team.findByPk(teamId);
    const isCaptain = playerId == team.captainId;

    // Checks if the group exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }


    if (!isCaptain) {
        return res.status(403).json(playerNotAuthorized)
    }

    // Updates the group
    await team.set({
        name: name ? name : team.name,
        private: private ? private : team.private,
    })

    await team.save();

    return res.status(200).json({
        status: 200,
        message: "",
        data: team,
        errors: {}
    })
})



// Delete a team based on ID
router.delete('/:teamId', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    let team = await Team.findByPk(teamId)
    const playerId = req.player.id;
    const isCaptain = playerId == team.captainId;

    // Checks if the groups exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    if(!isCaptain) {
        return res.status(403).json(playerNotAuthorized)
    }

    await team.destroy();

    return res.status(200).json({
        status: 200,
        message: "Team delete successful",
        data: null,
        errors: {},
    })
})








// Get all Members of a Team specified by its id
router.get('/:teamId/members', async (req, res) => {
    const { teamId } = req.params;
    const playerId = req.player?.id;
    const team = await Team.findByPk(teamId);

    // Checks if the team exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const members = await Team.findByPk(teamId, {
        attributes: ['id'],
        include: [
            {
                model: Player,
                through: {
                    model: Membership,
                    attributes: ['createdAt', 'status']
                },
                attributes: ['name', 'profileImage']
            }
        ]
    })


    return res.status(200).json({
        status: 200,
        message: "",
        data: members,
        errors: {}
    })

})


// // Request a Membership for a Team based on the Team's id
router.post('/:teamId/membership', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const playerId = req.player.id;
    const team = await Team.findByPk(teamId);
    const membership = await Membership.findOne({
        where: { teamId, playerId }
    })

    if (membership) {
        return res.status(405).json({
            status: 405,
            message: "Membership already exists",
            data: null,
            errors: {
                membership: "You are already a member of this group."
            }
        })
    }

    // Checks if the group exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    const newMembership = await Membership.create({
        playerId, teamId,
        status: 'pending'
    })

    return res.status(201).json({
        status: 201,
        message: "",
        data: newMembership,
        errors: {}
    })

})

// Update membership status
router.put('/:teamId/membership', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const { playerId } = req.body;
    const team = await Team.findByPk(teamId);
    const player = await Player.findByPk(playerId);
    const isCaptain = req.player.id == team?.captainId;
    const member = await Membership.findOne({
        where: { playerId, teamId }
    })

    if (member.status === "member") {
        return res.status(405).json({
            status: 405,
            message: "Player is already a member",
            data: member,
            errors: {
                membership: "This player has already been approved as a member of this team"
            }
        })
    }

    if (!player) {
        return res.status(404).json({
            status: 404,
            message: "Player couldn't be found",
            data: null,
            errors: {
                teamId: "The 'playerId' is not recognized as a valid entity"
            }
        })
    }

    // Checks if the team exists
    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    if (!member) {
        return res.status(404).json({
            status: 404,
            message: "No membership found",
            data: null,
            errors: {
                membership: "A membership doesn't exist between this player and this team."
            }
        })
    }

    if (!isCaptain) {
        return res.status(403).json(playerNotAuthorized)
    }

    await member.set({
        status: "pending"
    })

    await member.save();

    return res.status(200).json({
        status: 200,
        message: `Membership status changed to ${member.status}`,
        data: member,
        errors: {}
    })

})



// // Delete membership to a group specified by id
router.delete('/:teamId/membership', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const { playerId } = req.body;
    const team = await Team.findByPk(teamId);
    const player = await Player.findByPk(playerId);
    const isCaptain = req.player.id == team?.captainId;
    const membership = await Membership.findOne({
        where: { playerId, teamId }
    })
    const isCaptainMembership = team?.captainId == membership?.playerId;
    const isPlayerMembership = req.player.id == membership?.playerId;

    if (isCaptainMembership) {
        return res.status(405).json({
            status: 405,
            message: "Can't Delete Membership",
            data: null,
            errors: {
                membership: "You can't delete your membership for a team you created."
            }
        })
    }


    if (!player) {
        return res.status(404).json({
            status: 404,
            message: "Player couldn't be found",
            data: null,
            errors: {
                teamId: "The 'playerId' is not recognized as a valid entity"
            }
        })
    }

    if (!team) {
        return res.status(404).json(teamNotFound)
    }

    if (!membership) {
        return res.status(404).json({
            status: 404,
            message: "No membership exists",
            data: null,
            errors: {
                membership: "A membership doesn't exist between this player and this team."
            }
        })
    }

    if (!isCaptain && !isPlayerMembership) {
        return res.status(403).json(playerNotAuthorized)
    }

    await membership.destroy()

    return res.status(200).json({
        status: 200,
        message: "Membership delete successful",
        data: null,
        errors: {}
    })

})

module.exports = router;
