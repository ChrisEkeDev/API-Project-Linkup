const express = require('express');
const router = express.Router();
const { Attendance } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/', requireAuth,  async (req, res) => {
    const userId = req.user.id;
    let attendance = await Attendance.findAll({
        where: { userId: userId }
    });
    res.status(200).json({
        Attendances: attendance
    })
})

module.exports = router;
