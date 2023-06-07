const express = require('express');
const router = express.Router();
const { Membership } = require('../../db/models');

router.get('/', async (req, res) => {
    let memberships = await Membership.findAll();
    res.status(200).json({
        Memberships: memberships
    })
})

module.exports = router;
