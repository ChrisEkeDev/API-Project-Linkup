const express = require('express');
const router = express.Router();
const { Event, Group, Venue, User, GroupImage } = require('../../db/models');
const { Op } = require('sequelize');

// Search Events and Groups
router.get('/', async (req, res) => {
    let { page, size, query } = req.query;

    let eventWhere = {}
    let groupWhere = {}
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

    if (query) {
        eventWhere = {
            [Op.or]: [
                { name: { [Op.like]:`%${query}%`  }},
                { description: { [Op.like]:`%${query}%`  }}
            ]
        }
        groupWhere = {
            [Op.or]: [
                { name: { [Op.like]:`%${query}%`  }},
                { about: { [Op.like]:`%${query}%`  }}
            ]
        }
    }

    const events = await Event.findAll({
        where: eventWhere,
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
        ]
    });

    let groups = await Group.findAll({
        where: groupWhere
    })

    // Calculates aggregate data
    for (const group of groups) {
        let members = await group.countUsers();
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

    const results = [ ...events, ...groups ];

    res.status(200).json({
        Results: results
    })

})



module.exports = router;
