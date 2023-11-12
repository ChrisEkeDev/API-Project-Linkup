const express = require('express');
const router = express.Router();
const { Membership } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/', requireAuth,  async (req, res) => {
    const playerId = req.player.id;

    let memberships = await Membership.findAll({
        where: { playerId }
    });

    return res.status(200).json({
        status: 200,
        message: "",
        data: null,
        errors: {}
    })
})

module.exports = router;
