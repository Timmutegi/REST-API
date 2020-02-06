const express = require('express');
const router = express.Router();
const Hours = require('../models/businessHours');

// GET ALL BUSINESS WORKING HOURS
router.get('/', async(req, res) => {
    try {
        const bookings = await Booking.find().populate('shop');
        res.json(bookings);

    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMIT BUSINESS WORKING HOURS
router.post('/', async(req, res) => {
    // const { error } = bookingValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const hours = new Hours({
        shop: req.body.shop,
        hours: req.body.hours
    });

    try {
        const savedHours = await hours.save();
        res.send({ savedHours });

    } catch (err) {
        res.json({ message: err });
    }
});