const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event, Group, Venue, EventImage, User, Attendance } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

// Get All Events with optional query filters
router.get('/', async (req, res) => {
    let { page, size, name, type, startDate } = req.query;

    const where = {}
    const pagination = {}

    if (size) {
        if (size >= 1 && size <= 30 ) {
            pagination.limit = parseInt(size)
        } else {
            pagination.limit = 20
        }
    }

    if (page) {
        if ( page >= 1 && page <= 10 ) {
            pagination.offset = parseInt(size) * (parseInt(page) - 1)
        } else {
            pagination.offset = parseInt(size) * (parseInt(1) - 1)
        }
    }

    if ( name ) {
        where.name = {
            [Op.like]: `%${name}%`
        }
    }

    if ( type ) {
        where.type = type
    }

    if ( startDate ) {
        where.startDate = {
            [Op.like]: `%${startDate}%`
        }
    }

    const events = await Event.findAll({
        where,
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
        ],
        ...pagination
    });

    // Calculates aggregate data
    for (const event of events) {
        let attendees = await event.countAttendances({
            where: {
                status: 'attending'
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
    event.numAttending = attendees;

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

    // console.log(user)
    // return res.status(200).json(user)

    // Authorization
    let status = await user[0].Membership.status;
    if ( status === "co-host" || status === 'attending' || userId === group.organizerId ) {
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
    let status = await user[0].Membership.status;
    if ( status === "co-host" || userId === group.organizerId ) {

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
router.delete('/:eventId', requireAuth, async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    let event = await Event.findByPk(eventId);

    // Checks if event exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
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
    let status = await user[0].Membership.status;
    if ( status === "co-host" || userId === group.organizerId ) {
        return res.status(200).json({
            message: "Successfully deleted"
        })
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})


// Get all Attendees of an Event specified by its id
router.get('/:eventId/attendees', async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    const event = await Event.findByPk(eventId);

    // Checks if the group exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    let groupId = event.groupId;
    const group = await Group.findByPk(groupId)

    const membership = await group.getMemberships({
        where: {
            userId: userId
        }
    })

    let attendeesAuth = await Event.findByPk(eventId, {
        attributes: [],
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            through: {
                attributes: ['status']
            }
        }
    });

    let attendeesNoAuth = await Event.findByPk(eventId, {
        attributes: [],
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            through: {
                attributes: ['status'],
                where: {
                    status: {
                        [Op.not]: 'waitlist'
                    }
                }
            }
        }
    });

    if (userId === group.organizerId || membership[0]?.status === 'co-host') {
        return res.status(200).json({Attendees: attendeesAuth.Users})
    } else {
        return res.status(200).json({Attendees: attendeesNoAuth.Users})
    }
})


// Request to Attend an Event based on the Event's id
router.post('/:eventId/attendance', requireAuth, async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    const event = await Event.findByPk(eventId);

    // Checks if the group exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    let groupId = event.groupId;
    const group = await Group.findByPk(groupId)

    const memberships = await group.getMemberships({
        where: {
            userId: userId
        }
    })

    const attendances = await event.getAttendances({
        where: {
            userId: userId
        }
    })

    if (userId === group.organizerId) {
        return res.status(400).json({message: "User can't request attendance to an event they are hosting"})
    }

    if (memberships[0]) {
        if (attendances[0]) {
            const status = attendances[0].status;
            if (status === 'waitlist') {
                return res.status(400).json({message: "Attendance has already been requested"})
            }

            if (status === 'attending') {
                return res.status(400).json({message: "User is already an attendee of the event"})
            }
        }
    } else {
        return res.status(403).json({message: 'Forbidden'})
    }

    await Attendance.create({
        userId: userId,
        eventId: eventId,
        status: 'waitlist'
    })

    return res.status(200).json({
        userId: userId,
        status: 'waitlist'
    })
})


// Change the status of an attendance for an event specified by id
const validateAttendance = [
    check('userId').custom(async (id) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User couldn't be found")
    }),
    check('status').exists({checkFalsy: true}).isIn(['waitlist', 'attending']).withMessage("Status must be 'waitlist' or 'attending'"),
    check('status').exists({checkFalsy: true}).not().equals('waitlist').withMessage('Cannot change a membership status to waitlist'),
    handleValidationErrors
]


router.put('/:eventId/attendance', requireAuth, validateAttendance, async (req, res) => {
    const { eventId } = req.params;
    const authId = req.user.id;
    const event = await Event.findByPk(eventId);
    const { userId, status } = req.body;

    if (status === 'waitlist') {
        return res.status(400).json({message: "Cannot change an attendance status to waitlist"})
    }

    // Checks if the group exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    let groupId = event.groupId;
    const group = await Group.findByPk(groupId)

    const authMembership = await group.getMemberships({
        where: {
            userId: authId
        }
    })

    let authStatus;
    if (authMembership[0]) {
        authStatus = authMembership[0].status
    }

    if (authId !== group.organizerId && authStatus !== 'co-host') {
        return res.status(403).json({message: 'Forbidden'})
    }



    const userAttendance = await event.getAttendances({
        where: {
            userId: userId
        },
        attributes: {
            include: ['id', 'eventId', 'userId', 'status'],
            exclude: ['createdAt', 'updatedAt']
        }
    })

    if (userAttendance.length === 0 ) {
       return res.status(404).json({message: 'Attendance between the user and the event does not exist'})
    }

    const attendee = userAttendance[0]

    if (authId === group.organizerId || authStatus === 'co-host') {

        if (attendee.status === 'attending') {
            return res.status(400).json({message: "User is already an attendee of the event"})
        } else {
            await attendee.set({
                status: status
            })
            await attendee.save();
            return res.status(200).json(attendee)
        }

    }
})


// Delete attendance to an event specified by id
const validateDeleteAttendance = [
    check('userId').custom( async (id) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User couldn't be found")
    }),
    handleValidationErrors
]
router.delete('/:eventId/attendance', requireAuth, validateDeleteAttendance, async (req, res) => {
    const { eventId } = req.params;
    const authId = req.user.id;
    const event = await Event.findByPk(eventId);
    const { userId } = req.body;

    // Checks if the group exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    let groupId = event.groupId;
    const group = await Group.findByPk(groupId)

    if (authId !== group.organizerId && authId !== userId) {
        return res.status(403).json({message: "Only the User or organizer may delete an Attendance"})
    }

    const userAttendance = await event.getAttendances({
        where: {
            userId: userId
        },
        attributes: {
            include: ['id', 'eventId', 'userId', 'status'],
            exclude: ['createdAt', 'updatedAt']
        }
    })

    if (userAttendance.length === 0 ) {
        return res.status(404).json({message: 'Attendance does not exist for this User'})
    }

    const attendee = userAttendance[0]

    if (authId === userId || authId === group.organizerId) {
        await attendee.destroy();
        return res.status(200).json({message: "Successfully deleted attendance from event"})
    } else {
        return res.status(403).json({message: "Only the User or organizer may delete an Attendance"})
    }

})



module.exports = router;
