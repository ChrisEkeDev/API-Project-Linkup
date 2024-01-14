const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiKey = process.env.GOOGLE_API_KEY

router.post('/', async(req, res) => {
    const { query } = req.body;
    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await axios.get(endpoint);
        const { results } = response.data;
        return res.status(200).json({
            status: 200,
            message: "",
            data: results,
            errors: {}
        })
    } catch(e) {
        return res.status(404).json({
            status: 404,
            message: "There was an error getting data",
            data: null,
            errors: { error: e }
        })
    }
})

module.exports = router;
