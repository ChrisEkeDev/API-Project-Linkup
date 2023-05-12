const express = require('express');
const router = express.Router();

// Edit a Venue specified by its id
router.put('/:venueID', async (req, res) => {
    const { venueID } = req.params;
    res.json({route: `Update a venue with ID of ${venueID}`})
})

module.exports = router;
