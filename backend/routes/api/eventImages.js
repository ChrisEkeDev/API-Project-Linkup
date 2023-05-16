const express = require('express');
const router = express.Router();

// Delete an Image for a Event
router.delete('/:imageID', async (req, res) => {
    const { imageID } = req.params;
    res.json({route: `Deletes an image for event with ID of ${imageID}`})
})
module.exports = router;
