const express = require('express');
const router = express.Router();
const Store = require('../models/store');
const bcrypt = require('bcryptjs');
// const tz = require('moment-timezone');
// const moment = require('moment');
const { storeValidation } = require('../validation');

// GET ALL STORES
router.get('/', async(req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);

    } catch (err) {
        res.json({ message: err });
    }
});

// GET SPECIFIC STORE
router.get('/:storeID', async(req, res) => {
    try {
        const store = await Store.findById(req.params.storeID);
        res.json(store);

    } catch (err) {
        res.json({ message: err });
    }
});

// SUBMIT STORE
router.post('/', async(req, res) => {
    const { error } = storeValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const store = new Store({
        name: req.body.name,
        county: req.body.county,
        street: req.body.street,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword
    });

    try {
        const savedStore = await store.save();
        res.send({ savedStore });

    } catch (err) {
        res.json({ message: err });
    }
})

// UPDATE STORE
router.patch('/:storeID', async(req, res) => {
    try {
        const updatedPost = await Store.updateOne({ _id: req.params.storeID }, { $set: { name: req.body.name } });
        res.status(200).send({ message: 'Successful' });

    } catch (err) {
        res.json({ message: err });
    }
});

// DELETE STORE
router.delete('/:storeID', async(req, res) => {
    try {
        const removedStore = await Store.deleteOne({ _id: req.params.storeID });
        res.status(200).send({ message: 'Successful' });

    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;