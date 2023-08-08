const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event, Group, Venue, EventImage, User, Attendance, GroupImage } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const s3 = new AWS.S3();

AWS.config.update({
    region: process.env.AWS_S3_REGION,
    correctClockSkew: true
})

router.use(bodyParser.json())

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'linkup-bucket',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
})

// Get All Events with optional query filters
router.get('/', async (req, res) => {
    let { page, size, query } = req.query;

    let where = {}
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

    if ( query ) {
        where = {
            [Op.or]: [
                { name: { [Op.like]:`%${query}%`  }},
                { description: { [Op.like]:`%${query}%`  }}
            ]
        }
    }


    const events = await Event.findAll({
        where: where,
        attributes: {
            exclude: ['capacity', 'price']
        },
        include: [
            {
                model: Group,
                attributes: ['id', 'name', 'city', 'state'],
                include: [{
                    model: User,
                    as: 'Organizer'
                }, {
                    model: GroupImage
                }]
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
        event.numAttending = attendees;
        if (eventImage[0]) {
            event.previewImage = eventImage[0].url;
        } else event.previewImage = null

    }


    return res.status(200).json({Events: events})
})

// Get all Events attended by the current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const events = await Event.findAll({
        include: {
            model: Attendance,
            where: { userId: userId},
            attributes: []
        }
    })
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
                },
                include: [
                    {
                        model: User,
                        as: 'Organizer'
                    },
                    {
                        model: Venue
                    },
                    {
                        model: GroupImage
                    }
                ],

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
            status: 'attending'
        }
    });
    event.numAttending = attendees;

    return res.status(200).json(event)
})


// Add an Image to a Event based on the Event's id
const validateImage = [
    check('preview').exists().isBoolean().withMessage('Preview must be a boolean'),
    handleValidationErrors
]

router.post('/:eventId/images', requireAuth, upload.single('image'), validateImage,  async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    const { preview } = req.body;
    let event = await Event.findByPk(eventId);
    const image = req.file;

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

    // Authorization
    let status = user[0]?.Membership.status;
    if ( status === "co-host" || status === 'attending' || userId === group.organizerId ) {
        // Creates the image
        let  newImage = await event.createEventImage({
            url: image.location,
            preview
        })
        return res.status(200).json(newImage)
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})


// Edit an Event specified by its id
const validateEditEvent = [
    check('venueId').optional().custom(async(id) => {
        if (id !== null) {
            const venue = await Venue.findByPk(id);
            if (!venue) throw new Error('Venue does not exist')
            else return
        } else return
    }),
    check('name').optional().exists({checkFalsy: true}).isLength({min: 5}).withMessage('Name must be at leat 5 characters'),
    check('type').optional().exists({checkFalsy: true}).isIn(['In person', 'Online']).withMessage('Type must be Online or In person'),
    check('capacity').optional().exists().isInt().withMessage('Capacity must be an integer'),
    check('private').optional().exists().isBoolean().withMessage('Private must be a boolean'),
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

    const groupId = event.groupId;
    const group = await Group.findByPk(groupId)

    // Checks if user is attending the event
    let user = await event.getUsers({
        where: {
            id: userId
        }
    });

    // Authorization
    let status = user[0]?.Attendance.status;
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

    const images = await EventImage.findAll({
        where: {
            eventId: event.id
        }
    })

    // Authorization
    let status = user[0]?.Membership.status;
    if ( status === "co-host" || userId === group.organizerId ) {
        if (images.length) {
            images.forEach(async(image) => {
                const imageKey = image.url.split('/');
                const imageKeyUnencoded = imageKey[imageKey.length - 1]
                const key = decodeURI(imageKeyUnencoded)
                const params = {
                    Bucket: "linkup-bucket",
                    Key: key
                }
                await s3.deleteObject(params).promise();
            })
        }
        await event.destroy();
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
    const userId = req.user?.id;
    const event = await Event.findByPk(eventId);

    // Checks if the group exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    let groupId = event.groupId;
    const group = await Group.findByPk(groupId)

    const membership = await group.getMemberships();

    let attendeesAuth = await Event.findByPk(eventId, {
        attributes: [],
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'profileImage'],
            through: {
                attributes: ['status']
            }
        }
    });

    let attendeesNoAuth = await Event.findByPk(eventId, {
        attributes: [],
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'profileImage'],
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

    let status = membership[0]?.status;
    if (userId && userId === group.organizerId || status === 'co-host') {
        return res.status(200).json({Attendees: attendeesAuth.Users})
    } else {
        return res.status(200).json({Attendees: attendeesNoAuth.Users})
    }
})

// Get all Attendances from an Event id
router.get('/:eventId/attendances', async (req, res) => {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);

    // Checks if the group exists
    if (!event) {
        return res.status(404).json({
            message: "Event couldn't be found"
        })
    }

    const attendances = await event.getAttendances();
    return res.status(200).json({
        Attendances: attendances
    })

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

    let status = attendances[0]?.status
    if (memberships[0]) {
        if (status === 'waitlist') {
            return res.status(400).json({message: "Attendance has already been requested"})
        }

        if (status === 'attending') {
            return res.status(400).json({message: "User is already an attendee of the event"})
        }
    }

    const attendance = await Attendance.create({
        userId: userId,
        eventId: parseInt(eventId),
        status: 'waitlist'
    })

    return res.status(200).json(attendance)
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

    let authStatus = authMembership[0]?.status;
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
