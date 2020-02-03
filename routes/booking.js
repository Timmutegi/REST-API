const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const { bookingValidation } = require('../validation');

// GET ALL BOOKINGS
router.get('/', async(req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC BOOKING
router.get('/:bookingID', async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.storeID);
        res.json(booking);

    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMIT BOOKING
router.post('/create', async(req, res) => {
    const { error } = bookingValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const booking = new Booking({
        name: req.body.user_ID,
        county: req.body.shop_ID
    });

    try {
        const savedBooking = await booking.save();
        res.send({ savedBooking });

    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE BOOKING
router.patch('/:storeID', async(req, res) => {
    try {
        const updatedBooking = await Booking.updateOne({ _id: req.params.storeID }, { $set: { status: req.body.status } });
        res.status(200).send({ message: 'Successful' });

    } catch (err) {
        res.json({ message: err });
    }
});

// DELETE BOOKING
router.delete('/:bookingID', async(req, res) => {
    try {
        const removedBooking = await Booking.deleteOne({ _id: req.params.bookingID });
        res.status(200).send({ message: 'Successful' });

    } catch (err) {
        res.json({ message: err });
    }
});