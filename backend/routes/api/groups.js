const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Group, Membership, User, GroupImage, Venue, Attendance } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { states } = require('../../utils/states');



// Get all groups
router.get('/', async (req, res) => {
    let groups = await Group.findAll()

    // Calculates aggregate data
    for (const group of groups) {
        let members = await group.countUsers({
            where: {
                status: 'member'
            }
        });
        group.dataValues.numMembers = members;
        let groupImage = await group.getGroupImages({
            where: { preview: true },
            attributes: ['url']
        })
        if (groupImage[0]) {
            group.dataValues.previewImage = groupImage[0].dataValues.url
        } else {
            group.dataValues.previewImage = null
        }

    }

    return res.status(200).json({
        Groups: groups
    })
})



// Get all groups joined or organized by the current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const groups = await Group.findAll({
        include: {
            model: Membership,
            where: {
                userId: userId
            },
            attributes: []
        }
    })

    // Calculates aggregate data
    for (const group of groups) {
        let members = await group.countUsers({
            where: {
                status: 'member'
            }
        });
        group.dataValues.numMembers = members;
        let groupImage = await group.getGroupImages({
            where: { preview: true },
            attributes: ['url']
        })
        if (groupImage[0]) {
            group.dataValues.previewImage = groupImage[0].dataValues.url
        } else {
            group.dataValues.previewImage = null
        }
    }

    return res.status(200).json({Groups: groups})
})



// Get details of group by ID
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, {
        include: [
            {
                model: GroupImage,
                attributes: {
                    exclude: ['groupId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: User,
                as: "Organizer",
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Venue
            }
        ]
    })

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    // Calculates aggregate data
    const members = await group.countUsers({
        where: {
            status: 'member'
        }
    });
    group.dataValues.numMembers = members;

    return res.status(200).json(group)
})



// Create a group
const validateCreateGroup = [
    check('name').exists({checkFalsy: true}).isLength({max: 60, min: 5}).withMessage('Name must be 60 characters or less'),
    check('about').exists({checkFalsy: true}).isLength({min: 50}).withMessage('About must be 50 characters or more'),
    check('type').exists({checkFalsy: true}).isIn(['In person', 'Online']).withMessage("Type must be 'Online' or 'In person'"),
    check('private').exists({checkFalsy: true}).isBoolean().withMessage('Private must be a boolean'),
    check('city').exists({checkFalsy: true}).withMessage('City is required'),
    check('state').exists({checkFalsy: true}).isAlpha().isLength({min: 2, max: 2}).withMessage('State is required'),
    handleValidationErrors
]

router.post('/', validateCreateGroup, async (req, res) => {
    const { name, about, type, private, city, state } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId)

    // Creates the group
    const group = await user.createGroup({
        name, about, type, private, city, state
    })

    return res.status(201).json(group)
})



// Add an image to a group based on id
const validateImage = [
    check('url').exists({checkFalsy: true}).withMessage('Url is required'),
    check('preview').exists().isBoolean().withMessage('Preview must be a boolean'),
    handleValidationErrors
]

router.post('/:groupId/images', validateImage, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    const { url, preview } = req.body;
    let group = await Group.findByPk(groupId)

    // Checks if the groups exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    // Checks if user is a member of the group
    let user = await group.getUsers({
        where: {
            id: userId,
        }
    });
    if (user.length === 0) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // Authorization
    let status = await user[0].dataValues.Membership.dataValues.status;
    if ( status === "co-host" || userId === group.organizerId ) {
        // Creates the image
        let image = await group.createGroupImage({
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



// Update a group based on ID
const validateEditGroup = [
    check('name').optional().isLength({max: 60, min: 5}).withMessage('Name must be 60 characters or less'),
    check('about').optional().isLength({min: 50}).withMessage('About must be 50 characters or more'),
    check('type').optional().isIn(['In person', 'Online']).withMessage("Type must be 'Online' or 'In person'"),
    check('private').optional().isBoolean().withMessage('Private must be a boolean'),
    check('city').exists().withMessage('City is required').optional(),
    check('state').optional().isIn(states).isLength({min: 2, max: 2}).withMessage('State is required'),
    handleValidationErrors
]

router.put('/:groupId', requireAuth, validateEditGroup, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    const { name, about, type, private, city, state } = req.body;
    let group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    // Authorization
    if (userId !== group.organizerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // Updates the group
    await group.set({
        name: name ? name : group.name,
        about: about ? about : group.about,
        type: type ? type : group.type,
        private: private ? private : group.private,
        city: city ? city : group.city,
        state: state ? state : group.state
    })
    await group.save();

    return res.status(200).json(group)
})



// Delete a group based on ID
router.delete('/:groupId', requireAuth, async (req, res) => {
    const { groupId } = req.params;
    let group = await Group.findByPk(groupId)
    const userId = req.user.id;

    // Checks if the groups exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    // Authorization
    if (userId !== group.organizerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // Delete the group
    await group.destroy();
    return res.status(200).json({
        message: "Successfully deleted"
    })
})



// Get All Venues for a Group specified by its id
router.get('/:groupId/venues', requireAuth, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    // Checks if user is a member of the group
    let user = await group.getUsers({
        where: {
            id: userId,
        }
    });
    if (user.length === 0) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // Authorization
    let status = await user[0].dataValues.Membership.dataValues.status;
    if ( status === "co-host" || userId === group.organizerId ) {
        const venues = await group.getVenues();
        return res.status(200).json({Venues: venues})
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})



// Create a new Venue for a Group specified by its id
const validateCreateVenue = [
    check('address').exists({checkFalsy: true}).withMessage('Street address is required'),
    check('city').exists({checkFalsy: true}).withMessage('City is required'),
    check('state').exists({checkFalsy: true}).isIn(states).withMessage('State is required'),
    check('lat').exists({checkFalsy: true}).isFloat({ min: -90, max: 90 }).withMessage('Latitude is not valid'),
    check('lng').exists({checkFalsy: true}).isFloat({ min: -180, max: 180 }).withMessage('Longitude is not valid'),
    handleValidationErrors
]

router.post('/:groupId/venues', requireAuth, validateCreateVenue, async (req, res) => {
    const { groupId } = req.params;
    const { address, city, state, lat, lng } = req.body;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    // Checks if user is a member of the group
    let user = await group.getUsers({
        where: {
            id: userId,
        }
    });
    if (user.length === 0) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // Authorization
    let status = await user[0].dataValues.Membership.dataValues.status;
    if ( status === "co-host" || userId === group.organizerId ) {
        const venue = await group.createVenue({
            address, city, state, lat, lng
        })
        return res.status(200).json(venue)

    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

})



// Get all events of groups specified by its Id
router.get('/:groupId/events', async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    const events = await group.getEvents({
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

    //Calculates aggregate data
    for (const event of events) {
        let attendees = await event.countAttendances({
            where: {
                status: 'Attending'
            }
        });
        event.dataValues.numAttending = attendees;
        let eventImage = await event.getEventImages({
            where: {preview: true},
            attributes: ['url']
        })
        if (eventImage[0]) {
            event.dataValues.previewImage = eventImage[0].dataValues.url;
        } else event.dataValues.previewImage = null
    }

    return res.status(200).json({Events: events})
})



// Create an Event for a Group specified by its id
const validateCreateEvent = [
    check('venueId').custom(async(id) => {
        const venue = await Venue.findByPk(id);
        if (!venue) throw new Error('Venue does not exist')
    }),
    check('name').exists({checkFalsy: true}).isLength({min: 5}).withMessage('Name must be at leat 5 characters'),
    check('type').exists({checkFalsy: true}).isIn(['In person', 'Online']).withMessage('Type must be Online or In person'),
    check('capacity').exists({checkFalsy: true}).isInt().withMessage('Capacity must be an integer'),
    check('price').custom(async (price) => {
        let priceRegex = /^\d+(?:\.\d+)?(?:,\d+(?:\.\d{2})?)*$/;
        if (!priceRegex.test(price)) throw new Error('Price is invalid')
    }),
    check('description').exists({checkFalsy: true}).withMessage('Description is required'),
    check('startDate').custom(async (date) => {
        let convDate = new Date(date);
        let currDate = new Date();
        if (convDate < currDate) throw new Error('Start date must be in the future')
    }),
    check('endDate').custom(async (date, {req}) => {
        let convDate = new Date(date);
        let startDate = new Date(req.body.startDate)
        // console.log(req.)
        if (convDate < startDate) throw new Error('End date is less than start date')
    }),
    handleValidationErrors
]

router.post('/:groupId/events', requireAuth, validateCreateEvent, async (req, res) => {
    const { groupId } = req.params;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    // Checks if user is a member of the group
    let user = await group.getUsers({
        where: {
            id: userId,
        }
    });
    if (user.length === 0) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    // Authorization
    let status = await user[0].dataValues.Membership.dataValues.status;
    if ( status === "co-host" || userId === group.organizerId ) {

        const event = await group.createEvent({
            venueId, name, type, capacity, price, description, startDate, endDate
        })

        return res.status(200).json(event)

    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

})



// Get all Members of a Group specified by its id
router.get('/:groupId/members', async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    const membership = await group.getMemberships({
        where: {
            userId: userId
        }
    })
    let membersAuth = await Group.findByPk(groupId, {
        attributes: [],
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            through: {
                attributes: ['status']
            }
        }
    });

    let membersNoAuth = await Group.findByPk(groupId, {
        attributes: [],
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            through: {
                attributes: ['status'],
                where: {
                    status: {
                        [Op.not]: 'pending'
                    }
                }
            }
        }
    });

    if (userId === group.organizerId || membership[0]?.status === 'co-host') {
        return res.status(200).json({Members: membersAuth.Users})
    } else {
        return res.status(200).json({Members: membersNoAuth.Users})
    }

})



// Request a Membership for a Group based on the Group's id
router.post('/:groupId/membership', requireAuth, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    const memberships = await group.getMemberships({
        where: {
            userId: userId
        }
    })

    if (userId === group.organizerId) {
        return res.status(400).json({message: "User can't join a group they organized"})
    }

    if (memberships[0]) {
        const status = memberships[0].status;
        if (status === 'pending') {
            return res.status(400).json({message: "Membership has already been requested"})
        }

        if (status === 'member' || status === 'co-host') {
            return res.status(400).json({message: "User is already a member of the group"})
        }
    }

    await Membership.create({
        userId: userId,
        groupId: groupId,
        status: 'pending'
    })

    return res.status(200).json({
        memberId: userId,
        status: 'pending'
    })

})



// Change the status of a membership for a group specified by id
const validateMembership = [
    check('memberId').custom(async (id) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User couldn't be found")
    }),
    check('status').exists({checkFalsy: true}).isIn(['member', 'co-host', 'pending']).withMessage("Status must be 'member' or 'co-host'"),
    check('status').exists({checkFalsy: true}).not().equals('pending').withMessage('Cannot change a membership status to pending'),
    handleValidationErrors
]

router.put('/:groupId/membership', requireAuth, validateMembership, async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    const { memberId, status } = req.body;
    const group = await Group.findByPk(groupId);

    // Checks if the group exists
    if (!group) {
        return res.status(404).json({
            message: "Group couldn't be found"
        })
    }

    const requesterMembership = await group.getMemberships({
        where: {
            userId: userId
        }
    })

    let userStatus;
    if (requesterMembership[0]) {
        userStatus = requesterMembership[0].status
    }

    const requestedMembership = await group.getMemberships({
        where: {
            userId: memberId
        },
        attributes: {
            include: ['id', 'groupId', 'userId', 'status'],
            exclude: ['createdAt', 'updatedAt']
        }
    })

    if (requestedMembership.length === 0 ) {
        res.status(404).json({message: 'Membership between the user and the group does not exist'})
    }

    const member = requestedMembership[0]
    console.log(member)

    if (status === 'member') {
        if (userStatus === 'co-host' || userId === group.organizerId) {
            await member.set({
                status: status
            })
            await member.save();
            return res.status(200).json(member)
        } else {
            res.status(403).json({message: 'Forbidden'})
        }
    }

    if (status === 'co-host') {
        if (userId === group.organizerId) {
            await member.set({
                status: status
            })
            await member.save();
            return res.status(200).json(member)
        } else {
            res.status(403).json({message: 'Forbidden'})
        }
    }
})



// Delete membership to a group specified by id
router.delete('/:groupID/membership', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Deletes the membership to group with ID of ${groupID}`})
})

module.exports = router;
