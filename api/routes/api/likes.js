const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { SessionChat, TeamChat, Like } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { entityNotFound, likeNotFound, playerNotAuthorized } = require('./constants/responseMessages');



router.get('/current', requireAuth, async(req, res) => {
    const playerId = req.player.id;
    const myLikes = await Like.findAll({
        where: { playerId }
    })
    return res.status(201).json({
        status: 201,
        message: "",
        data: myLikes,
        errors: {}
    })
})

///////////////////////////////////////////////////////////

// Create a Like

//////////////////
router.post('/', requireAuth, async(req, res) => {
    const playerId = req.player.id;
    const { entityId, entityType } = req.body;
    const sessionChat = await SessionChat.findByPk(entityId)
    const teamChat = await TeamChat.findByPk(entityId)

    if (!sessionChat && !teamChat) {
        return res.status(404).json(entityNotFound)
    }

    const existingLike = await Like.findOne({
        where: { playerId, entityId }
    })

    if (existingLike) {
        return res.status(404).json(alreadyLiked)
    }

    const like = await Like.create({
        id: uuidv4(),
        playerId,
        entityId,
        entityType
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
router.delete('/', requireAuth, async(req, res) => {
    const playerId = req.player.id;
    const { entityId } = req.body;
    const like = await Like.findOne({
        where: { playerId, entityId }
    });
    const playerAuthorized = playerId === like.playerId;

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
