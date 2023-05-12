const express = require('express');
const router = express.Router();

// Get all groups
router.get('/', async (req, res) => {
    res.json({route: 'Get all groups'})
})

// Get all groups joined or organized by the currnet user
router.get('/current', async (req, res) => {
    res.json({route: 'Get all groups orgnaized or joined by user'})
})

// Get details of group by ID
router.get('/:groupID', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Get group with ID of ${groupID}`})
})

// Create a group
router.post('/', async (req, res) => {
    res.json({route: 'Create a group'})
})

// Add an image to a group based on id
router.post('/:groupID/images', async (req, res) => {
    const { groupID } = req.params;
    res.json({route: `Add an image to group with ID of ${groupID}`})
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


module.exports = router;
