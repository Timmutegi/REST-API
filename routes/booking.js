const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
// const lodash = require('lodash');
const { bookingValidation } = require('../validation');

// GET ALL BOOKINGS
router.get('/', async(req, res) => {
    try {
        const bookings = await Booking.find().populate('customer').populate('shop');
        res.json(bookings);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC BOOKING
router.get('/:bookingID', async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingID).populate('customer').populate('shop');
        // const filteredBooking = lodash.omit(booking.toObject(), ['password']);
        res.json(booking);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC SHOP BOOKINGS
router.get('/business/:storeID', async(req, res) => {
    try {
        const bookings = await Booking.find({ shop: req.params.storeID }).populate('customer');
        res.json(bookings);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC CUSTOMER BOOKINGS
router.get('/customer/:customerID', async(req, res) => {
    try {
        const bookings = await Booking.find({ customer: req.params.customerID }).populate('shop');
        res.json(bookings);

    } catch (err) {
        res.json({ message: err });
    }
});


// SUBMIT BOOKING
router.post('/create', async(req, res) => {
    const { error } = bookingValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const booking = new Booking({
        customer: req.body.customer,
        shop: req.body.shop,
        status: req.body.status,
        date: req.body.date
    });

    try {
        const savedBooking = await booking.save();
        res.send({ savedBooking });

    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE BOOKING
router.patch('/:bookingID', async(req, res) => {
    try {
        const updatedBooking = await Booking.updateOne({ _id: req.params.bookingID }, { $set: { status: req.body.status } });
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

module.exports = router;