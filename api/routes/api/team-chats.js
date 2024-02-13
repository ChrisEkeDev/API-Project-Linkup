const express = require('express');
const router = express.Router();
const { Player, TeamChat } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateCreateChat } = require("./validation/expressValidations");
const { chatNotFound } =require('./constants/responseMessages');
const { v4: uuidv4 } = require('uuid');


router.put('/:chatId', requireAuth, validateCreateChat,  async(req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;
    const playerId = req.player.id;

    const teamChat = await TeamChat.findOne({
        where: { id: chatId, playerId }
    })

    if (!teamChat) {
        res.status(404).json(chatNotFound)
    }

    teamChat.set({
        content
    })
    teamChat.save();

    const chat = await TeamChat.findByPk(teamChat.id, {
        include: {
            model: Player,
            attributes: ['name', 'profileImage']
        }
    })

    return res.status(201).json({
        status: 201,
        message: "Chat updated successfully",
        data: chat,
        error: null
    })
})


router.delete('/:chatId', requireAuth,  async(req, res) => {
    const { chatId } = req.params;
    const playerId = req.player.id;

    const teamChat = await TeamChat.findOne({
        where: { id: chatId, playerId }
    })

    if (!teamChat) {
        res.status(404).json(chatNotFound)
    }

    teamChat.destroy();

    return res.status(201).json({
        status: 201,
        message: "Chat deleted successfully",
        data: teamChat,
        error: null
    })
})

/// Like messages

module.exports = router;
