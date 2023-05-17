const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event, Group, Venue, EventImage } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

// Get All Events with optional query filters
router.get('/', async (req, res) => {
    const { page, size, name, type, startDate } = req.query;

    const events = await Event.findAll({
        attributes: {
            exclude: ['capacity', 'price']
        },
        include: [
            {
                model: Group,
                attributes: ['id', 'name', 'city', 'state']
            },
            {
                model: Venue,
                attributes: ['id', 'city', 'state']
            }
        ]
    });

    // Calculates aggregate data
    for (const event of events) {
        let attendees = await event.countAttendances({
            where: {
                status: 'Attending'
            }
        });

        let eventImage = await event.getEventImages({
            where: {preview: true},
            attributes: ['url']
        })
        event.dataValues.numAttending = attendees;
        if (eventImage[0]) {
            event.dataValues.previewImage = eventImage[0].dataValues.url;
        } else event.dataValues.previewImage = null

    }


    return res.status(200).json({Events: events})
})


// Get details of an Event specified by its id
router.get('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId, {
        include: [
            {
                model: Group,
                attributes: {
                    exclude: ['organizerId', 'about', 'type', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Venue,
                attributes: {
                    exclude: ['groupId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: EventImage,
                attributes: {
                    exclude: ['eventId', 'createdAt', 'updatedAt']
                }
            }
        ]
    })

    // Checks if event exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    //Calculates aggregate data
    let attendees = await event.countAttendances({
        where: {
            status: 'Attending'
        }
    });
    event.dataValues.numAttending = attendees;

    return res.status(200).json(event)
})


// Add an Image to a Event based on the Event's id
const validateImage = [
    check('url').exists({checkFalsy: true}).withMessage('Url is required'),
    check('preview').exists().isBoolean().withMessage('Preview must be a boolean'),
    handleValidationErrors
]

router.post('/:eventId/images', requireAuth, validateImage,  async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    const { url, preview } = req.body;
    let event = await Event.findByPk(eventId);

    // Checks if event exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    // Checks if user is attending the event
    let user = await event.getUsers({
        where: {
            id: userId
        }
    });
    if (user.length === 0) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // console.log(user)
    // return res.status(200).json(user)

    // Authorization
    let status = await user[0].dataValues.Attendance.dataValues.status.toLowerCase();
    if (status === 'attending' || status === 'host' || status === 'co-host') {
        // Creates the image
        let image = await event.createEventImage({
            url,
            preview
        })
        return res.status(200).json(image)
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})


// Edit an Event specified by its id
const validateEditEvent = [
    check('venueId').optional().custom(async(id) => {
        const venue = await Venue.findByPk(id);
        if (!venue) throw new Error('Venue does not exist')
    }),
    check('name').optional().exists({checkFalsy: true}).isLength({min: 5}).withMessage('Name must be at leat 5 characters'),
    check('type').optional().exists({checkFalsy: true}).isIn(['In person', 'Online']).withMessage('Type must be Online or In person'),
    check('capacity').optional().exists({checkFalsy: true}).isInt().withMessage('Capacity must be an integer'),
    check('price').optional().custom(async (price) => {
        let priceRegex = /^\d+(?:\.\d+)?(?:,\d+(?:\.\d{2})?)*$/;
        if (!priceRegex.test(price)) throw new Error('Price is invalid')
    }),
    check('description').optional().exists({checkFalsy: true}).withMessage('Description is required'),
    check('startDate').optional().custom(async (date) => {
        let convDate = new Date(date);
        let currDate = new Date();
        if (convDate < currDate) throw new Error('Start date must be in the future')
    }),
    check('endDate').optional().custom(async (date, {req}) => {
        let convDate = new Date(date);
        let startDate = new Date(req.body.startDate)
        // console.log(req.)
        if (convDate < startDate) throw new Error('End date is less than start date')
    }),
    handleValidationErrors
]

router.put('/:eventId', requireAuth, validateEditEvent, async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    let event = await Event.findByPk(eventId);
    let venue = await Venue.findByPk(venueId);

    // Checks if event exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    // Checks if venue exists
    if (!venue) {
        return res.status(404).json({
            message: "Venue couldn't be found"
        })
    }

    const groupId = event.groupId;
    const group = await Group.findByPk(groupId)

    // Checks if user is attending the event
    let user = await event.getUsers({
        where: {
            id: userId
        }
    });
    if (user.length === 0) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // Authorization
    let status = await user[0].dataValues.Attendance.dataValues.status.toLowerCase();
    if (status === 'host' || status === 'co-host' || userId === group.organizerId) {

        // Update event
        await event.set({
            venueId: venueId ? venueId : event.venueId,
            name: name ? name : event.name,
            type: type ? type : event.type,
            capacity: capacity ? capacity : event.capacity,
            price: price ? price : event.price,
            description: description ? description : event.description,
            startDate: startDate ? startDate : event.startDate,
            endDate: endDate ? endDate : event.endDate
        })
        await event.save();
        return res.status(200).json(event)
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})


// Delete an Event specified by its id
router.delete('/:eventID', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Delete event with ID of ${eventID}`})
})


// Get all Attendees of an Event specified by its id
router.get('/:eventID/attendees', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Get all attendees of event with ID of ${eventID}`})
})


// Request to Attend an Event based on the Event's id
router.post('/:eventID/attendance', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Request attendance for event with ID of ${eventID}`})
})


// Change the status of an attendance for an event specified by id
router.put('/:eventID/attendance', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Change status of attendee for event with ID of ${eventID}`})
})


// Delete attendance to an event specified by id
router.delete('/:eventID/attendance', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Delete attendance for event with ID of ${eventID}`})
})



module.exports = router;
