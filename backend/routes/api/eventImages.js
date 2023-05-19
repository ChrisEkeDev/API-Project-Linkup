const express = require('express');
const router = express.Router();
const { Event, EventImage, Group } = require('../../db/models');
const { requireAuth } =require('../../utils/auth')

// Delete an Image for a Event
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const userId = req.user.id;
    const image = await EventImage.findByPk(imageId)

    if (!image) {
        return res.status(404).json({
            message: "Event Image couldn't be found"
        })
    }

    const eventId = image.dataValues.eventId;
    const event = await Event.findByPk(eventId);
    const groupId = event.dataValues.groupId;
    const group = await Group.findByPk(groupId);

    const membership = group.getMemberships({
        where: {
            userId: userId
        }
    })

    let status = membership[0]?.dataValues.status
    if (userId === group.dataValues.organizerId || status === 'co-host') {
        await image.destroy();
        return res.status(200).json({
            message: "Successfully deleted"
        })
    } else {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }

})
module.exports = router;
