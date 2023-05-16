const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Group, Membership, User, GroupImage, Venue } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

// Get all groups
router.get('/', async (req, res) => {
    let groups = await Group.findAll()
    for (const group of groups) {
        let members = await group.countUsers();
        group.dataValues.numMembers = members;
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
    for (const group of groups) {
        let members = await group.countUsers();
        group.dataValues.numMembers = members;
    }
    return res.status(200).json({Groups: groups})
})

// Get details of group by ID
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;
    let group = await Group.findByPk(groupId, {
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
    if (!group) {
        res.status(404).json({
            message: "Group couldn't be found"
        })
    }
    let members = await group.countUsers();
    group.dataValues.numMembers = members;
    return res.status(200).json(group)
})

const validateCreateGroup = [
    check('name').exists({checkFalsy: true}).isLength({max: 60, min: 5}).withMessage('Name must be 60 characters or less'),
    check('about').exists({checkFalsy: true}).isLength({min: 50}).withMessage('About must be 50 characters or more'),
    check('type').exists({checkFalsy: true}).isIn(['In person', 'Online']).withMessage("Type must be 'Online' or 'In person'"),
    check('private').exists({checkFalsy: true}).isBoolean().withMessage('Private must be a boolean'),
    check('city').exists({checkFalsy: true}).withMessage('City is required'),
    check('state').exists({checkFalsy: true}).isAlpha().isLength({min: 2, max: 2}).withMessage('State is required'),
    handleValidationErrors
]

// Create a group
router.post('/', validateCreateGroup, async (req, res) => {
    const { name, about, type, private, city, state } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId)
    const group = await user.createGroup({
        name, about, type, private, city, state
    })
    const _membership = await Membership.create({
        userId: user.dataValues.id,
        groupId: group.dataValues.id,
        status: 'Organizer'
    })

    return res.status(201).json(group)
})

// Add an image to a group based on id
router.post('/:groupId/images', async (req, res) => {
    const { groupId } = req.params;
    res.json({route: `Add an image to group with ID of ${groupId}`})
})

// Update a group based on ID
router.put('/:groupID', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Update a group with ID of ${groupID}`})
})

// Delete a group based on ID
router.delete('/:groupID', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Delete group with an ID of ${groupID}`})
})

// Get All Venues for a Group specified by its id
router.get('/:groupID/venues', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Get all venues of group with ID of ${groupID}`})
})

// Create a new Venue for a Group specified by its id
router.post('/:groupID/venues', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Create a venue for group with ID of ${groupID}`})
})

// Get all events of groups specified by its Id
router.get('/:groupID/events', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Get all events of group with ID of ${groupID}`})
})

// Create an Event for a Group specified by its id
router.post('/:groupID/events', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Create an event for group with ID of ${groupID}`})
})

// Get all Members of a Group specified by its id
router.get('/:groupID/members', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Returns the members of group with ID of ${groupID}`})
})

// Request a Membership for a Group based on the Group's id
router.post('/:groupID/membership', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Request membership to group with ID of ${groupID}`})
})

// Change the status of a membership for a group specified by id
router.put('/:groupID/membership', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Changes the membership to group with ID of ${groupID}`})
})

// Delete membership to a group specified by id
router.delete('/:groupID/membership', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Deletes the membership to group with ID of ${groupID}`})
})

module.exports = router;
