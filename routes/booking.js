const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/User');
const lodash = require('lodash');
const { bookingValidation } = require('../validation');

// GET ALL BOOKINGS
router.get('/', async(req, res) => {
    try {
        // const bookings = await Booking.find();
        const bookings = await Booking.aggregate([{
            $lookup: {
                from: "User",
                localField: "user_ID",
                foreignField: "_id",
                as: "combined"
            }
        }])
        res.json(bookings);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC BOOKING
router.get('/:bookingID', async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingID);
        const user = await User.findById(booking.user_ID);
        const filteredUser = lodash.omit(user.toObject(), ['password']);
        res.json({ filteredUser, booking });

    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMIT BOOKING
router.post('/create', async(req, res) => {
    const { error } = bookingValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const booking = new Booking({
        user_ID: req.body.user_ID,
        shop_ID: req.body.shop_ID,
        status: req.body.status
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