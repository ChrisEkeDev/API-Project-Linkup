const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const { Membership, Team, Player } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// router.get('/', requireAuth,  async (req, res) => {
//     const playerId = req.player.id;

//     let memberships = await Membership.findAll({
//         where: { playerId }
//     });

//     return res.status(200).json({
//         status: 200,
//         message: null,
//         data: null,
//         error: null
//     })
// })


// Route to get all teams the current user is a member of
router.get('/current', requireAuth, async (req, res) => {
    const playerId = req.player.id;

    let teams = await Membership.findAll({
        where: { playerId, status: {[Op.ne]: 'host'}},
        attributes: ['id', 'status', 'teamId'],
        include: [
            {
                model: Team,
                attributes: {
                    exclude: ['updatedAt']
                },
                group: ['Team.id'],
                include: [
                    {
                        as: "captain",
                        model: Player,
                        attributes: ['name', 'profileImage']
                    }
                ]
            },

        ]
    })

    for (const team of teams) {
        const count = await Membership.count({
            where: { teamId: team.Team.id }
        })
        team.dataValues.Team.dataValues.members = count;
    }

    return res.status(200).json({
        status: 200,
        message:null,
        data: teams,
        error: null
    })
})


module.exports = router;
