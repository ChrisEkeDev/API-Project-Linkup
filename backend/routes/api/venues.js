const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Venue, User, Group, Membership } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { states } = require('../../utils/states');



// Edit a Venue specified by its id
const validateEditVenue = [
    check('address').optional().exists({checkFalsy: true}).withMessage('Street address is required'),
    check('city').exists().withMessage('City is required').optional(),
    check('state').optional().exists({checkFalsy: true}).isIn(states).withMessage('State is required'),
    check('lat').optional().exists({checkFalsy: true}).isFloat({ min: -90, max: 90 }).withMessage('Latitude is not valid'),
    check('lng').optional().exists({checkFalsy: true}).isFloat({ min: -180, max: 180 }).withMessage('Longitude is not valid'),
    handleValidationErrors
]
router.put('/:venueId', requireAuth, validateEditVenue, async (req, res) => {
    const { venueId } = req.params;
    const userId = req.user.id;
    const venue = await Venue.findByPk(venueId);
    const { address, city, state, lat, lng } = req.body;

    // Checks if the group exists
    if (!venue) {
        res.status(404).json({
            message: "Venue couldn't be found"
        })
    }

    const groupId = venue.groupId;
    const group = await Group.findByPk(groupId);

    // Checks if user is a member of the group
    let user = await group.getUsers({
        where: {
            id: userId,
        }
    });


    // Checks if user is the Organizer or the Co-host of the group
    let status = user[0]?.dataValues.Membership.dataValues.status;
    if ( status === "organizer" || status === "co-host" ) {

        //Updates the Venue
        await venue.set({
            address: address ? address : venue.address,
            city: city ? city : venue.city,
            state: state ? state : venue.state,
            lat: lat ? lat : venue.lat,
            lng: lng ? lng : venue.lng
        })
        await venue.save();
        return res.status(200).json(venue)

    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

})

module.exports = router;
