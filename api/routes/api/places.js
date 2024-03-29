const express = require('express');
const axios = require('axios');
const { Session } = require('../../db/models');
const { Op } = require('sequelize');
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
            data: [],
            errors: { error: e }
        })
    }
})

router.get('/markers', async (req, res) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayISOString = yesterday.toISOString()
    const markers = await Session.unscoped().findAll({
        attributes: [
            'id',
            'name',
            'startDate',
            'address',
            'private',
            'lat',
            'lng'
        ],
        where: {
            endDate: {
                [Op.gte]: yesterdayISOString
            }
        },
    })

    return res.status(200).json({
        status: 200,
        message: '',
        data: markers,
        error: null
    })
})

module.exports = router;
