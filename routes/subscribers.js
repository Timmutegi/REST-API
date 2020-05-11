const express = require('express');
const router = express.Router();
const Subscribers = require('../models/subscribers');
const { subscribeValidation } = require('../validation');

// GET ALL SUBSCRIBERS
router.get('/', async(req, res) => {
    try {
        const subscribers = await Subscribers.find();
        res.json(subscribers);
    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMIT SUBSCRIPTION
router.post('/', async(req, res) => {
    const { error } = subscribeValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF EMAIL EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ code: 400, details: 'You have already subscribed' });

    const subscriber = new Subscribers({
        email: req.body.email,
    });

    try {
        const success = await subscriber.save();
        res.status(200).send({ code: 200, message: 'successful' })

    } catch {
        res.json({ message: err });
    }
});

module.exports = router;