const express = require('express');
const router = express.Router();
const { Player, TeamChat, Like} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { validateCreateChat } = require("./validation/expressValidations");
const { chatNotFound } =require('./constants/responseMessages');


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
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('Likes.id')), 'likes']
            ]
        },
        include: [
            {
                model: Player,
                attributes: ['name', 'profileImage']
            },
            {
                model: Like,
                attributes: [] // empty array means do not fetch columns from the Likes table
            }
        ],
        group: [
            'TeamChat.id',
            'Player.id',
            'Player.name',
            'Player.profileImage'
        ]
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


module.exports = router;
