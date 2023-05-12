const express = require('express');
const router = express.Router();

// Get details of an Event specified by its id
router.get('/:eventID', async (req, res) => {
    const { eventID } = req.params;
    res.json({route: `Get details of event with ID of ${eventID}`})
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

// Add Query Filters to Get All Events
router.get('/', async (req, res) => {
    const { page, size, name, type, startDate } = req.query;
    res.json({route: `Returns events matching query params`})
})


module.exports = router;
