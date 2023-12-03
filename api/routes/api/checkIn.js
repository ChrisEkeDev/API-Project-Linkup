const express = require('express');
const router = express.Router();
const { CheckIn } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/', requireAuth,  async (req, res) => {

    const playerId = req.player.id

    let checkins = await CheckIn.findAll({
        where: { playerId }
    });

    return res.status(200).json({
        status: 200,
        message: "",
        data: checkins,
        errors: {}
    })
})



module.exports = router;
