const express = require('express');
const router = express.Router();
const { Event, EventImage, Group } = require('../../db/models');
const { requireAuth } =require('../../utils/auth');

// Delete an Image for a Event
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const playerId = req.player.id;
    const image = await SessionImage.findByPk(imageId, {
        include: {
            model: Session,
            attributes: ['creatorId']
        }
    })

    if (!image) {
        return res.status(404).json({
            status: 404,
            message: "Session Image couldn't be found",
            data: null,
            errors: {}
        })
    }

    const isAuthorized = playerId == image.Session.creatorId;

    if (!isAuthorized) {
        return res.status(403).json(playerNotAuthorized)
    }

    await image.destroy();
    deleteImages([image]);

    return res.status(200).json({
        status: 200,
        message: "",
        data: null,
        errors: {}
    })

})
module.exports = router;
