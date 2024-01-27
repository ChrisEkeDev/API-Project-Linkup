const express = require('express');
const router = express.Router();
const { CheckIn, Player, Team, Session } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth,  async (req, res) => {
    const playerId = req.player.id

    let checkins = await CheckIn.findAll({
        where: { playerId },
        attributes: ['id', 'status', 'sessionId'],
        include: [
            {
                model: Session,
                as: 'session',
                attributes: ['id', 'name', 'startDate', 'endDate', 'hostId'],
                include: {
                    model: Team,
                    as: 'host',
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
    });

    return res.status(200).json({
        status: 200,
        message: null,
        data: checkins,
        error: null
    })
})



module.exports = router;
