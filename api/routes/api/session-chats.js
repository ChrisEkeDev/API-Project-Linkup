const express = require('express');
const router = express.Router();
const { Player, SessionChat } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateCreateChat} = require("./validation/expressValidations");
const { chatNotFound } =require('./constants/responseMessages');


router.put('/:chatId', requireAuth, validateCreateChat,  async(req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;
    const playerId = req.player.id;

    const sessionChat = await SessionChat.findOne({
        where: { id: chatId, playerId }
    })

    if (!sessionChat) {
        res.status(404).json(chatNotFound)
    }

    sessionChat.set({
        content
    })
    sessionChat.save();

    const chat = await SessionChat.findByPk(sessionChat.id, {
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


router.delete('/:chatId', requireAuth, async(req, res) => {
    const { chatId } = req.params;
    const playerId = req.player.id;

    const sessionChat = await SessionChat.findOne({
        where: { id: chatId, playerId }
    })

    if (!sessionChat) {
        res.status(404).json(chatNotFound)
    }

    sessionChat.destroy();

    return res.status(201).json({
        status: 201,
        message: "Chat deleted successfully",
        data: sessionChat,
        error: null
    })
})

/// Like messages

module.exports = router;
