const express = require('express');
const router = express.Router();
const { Court, Player, Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { courtNotFound, likeNotFound, playerNotAuthorized } = require('./constants/responseMessages');

///////////////////////////////////////////////////////////

// Create a Like

//////////////////
router.post('/', requireAuth, async(req, res) => {
    const playerId = req.player.id;
    const { courtId } = req.body;
    const court = await Court.findByPk(courtId);
    if (!court) {
        return res.status(404).json(courtNotFound)
    }
    const like = await Like.create({
        playerId,
        courtId
    })

    return res.status(201).json({
        status: 201,
        message: "",
        data: like,
        errors: {}
    })

})


//////////////////////////////////////////////////////////////

// Remove a Like

///////////////////
router.delete('/:likeId', requireAuth, async(req, res) => {
    const playerId = req.player.id;
    const { likeId } = req.params;
    const like = await Like.findByPk(likeId);
    const playerAuthorized = playerId == like.playerId;
    if (!like) {
        return res.status(404).json(likeNotFound)
    }
    if (!playerAuthorized) {
        return res.status(403).json(playerNotAuthorized)
    }

    await like.destroy();

    return res.status(200).json({
        status: 200,
        message: "",
        data: like,
        errors: {}
    })
})

module.exports = router;
