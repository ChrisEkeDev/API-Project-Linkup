const express = require('express');
const router = express.Router();
const { Event, Group, Venue, EventImage } = require('../../db/models');
const { Op } = require('sequelize');

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
        event.dataValues.previewImage = eventImage[0].dataValues.url
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
        res.status(404).json({
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
router.post('/:eventID/images', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Create an image for event with ID of ${eventID}`})
})

// Edit an Event specified by its id
router.put('/:eventID', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Update event with ID of ${eventID}`})
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
