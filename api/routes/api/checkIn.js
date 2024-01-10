const express = require('express');
const router = express.Router();
const { CheckIn, Court, Session } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/', requireAuth,  async (req, res) => {

    const playerId = req.player.id

    let checkins = await CheckIn.findAll({
        where: { playerId },
        attributes: ['id'],
        include: [
            {
                model: Session,
                as: 'session',
                attributes: ['id', 'name', 'startDate', 'endDate'],
                include: {
                    model: Court,
                    attributes: ['address', 'lat', 'lng']
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
