const express = require('express');
const router = express.Router();
const { Membership } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/', requireAuth,  async (req, res) => {
    const userId = req.user.id;
    let memberships = await Membership.findAll({
        where: { userId: userId }
    });
    res.status(200).json({
        Memberships: memberships
    })
})

module.exports = router;
