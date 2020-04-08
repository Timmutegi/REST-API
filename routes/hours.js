const express = require('express');
const router = express.Router();
const Hours = require('../models/businessHours');

// GET ALL BUSINESS WORKING HOURS
router.get('/', async(req, res) => {
    try {
        const bookings = await Hours.find().populate('shop');
        res.json(bookings);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC BUSINESS WORKING HOURS
router.get('/:storeID', async(req, res) => {
    try {
        const hours = await Hours.find({ shop: req.params.storeID });
        res.json(hours);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC DAY'S BUSINESS WORKING HOURS
router.get('/:storeID/:weekday', async(req, res) => {
    try {
        const business = await Hours.find({ shop: req.params.storeID });
        const hours = business[0].hours[0];
        // const weekday = req.params.weekday;
        const open = hours.req.params.weekday;
        res.json(hours);
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

// UPDATE BUSINESS WORKING HOURS
router.patch('/:storeID', async(req, res) => {
    try {
        const updatedHours = await Hours.updateOne({ shop: req.params.storeID }, { $set: { hours: req.body.hours } });
        res.status(200).send({ message: 'Successful' });

    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;