const express = require('express');
const router = express.Router();
const Store = require('../models/store');
const bcrypt = require('bcryptjs');
// const tz = require('moment-timezone');
// const moment = require('moment');
const { storeValidation } = require('../validation');
const { loginValidation } = require('../validation');

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

// REGISTER STORE
router.post('/register', async(req, res) => {
    const { error } = storeValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const store = new Store({
        name: req.body.name,
        county: req.body.county,
        location: req.body.location,
        street: req.body.street,
        email: req.body.email,
        phone: req.body.phone,
        capacity: req.body.capacity,
        password: hashedPassword
    });

    try {
        const savedStore = await store.save();
        res.send({ savedStore });

    } catch (err) {
        res.json({ message: err });
    }
});

// LOGIN
router.post('/login', async(req, res) => {
    // VALIDATE
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF EMAIL EXISTS
    const store = await Store.findOne({ email: req.body.email });
    if (!store) return res.status(400).send('Email or password is wrong');

    // CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, store.password);
    if (!validPass) return res.status(400).send('Invalid password');

    res.status(200).send({ code: 200, id: store._id, message: 'successfully logged in' });

    // CREATE AND ASSIGN A TOKEN
    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).status(200).send({ token: token, message: 'successfully Logged in', code: 200 });

})

// UPDATE STORE
router.patch('/:storeID', async(req, res) => {
    try {
        const updatedPost = await Store.findOneAndUpdate({ _id: req.params.storeID }, {
            $set: {
                name: req.body.name,
                location: req.body.location,
                street: req.body.street,
                county: req.body.county,
                capacity: req.body.capacity,
                email: req.body.email,
                phone: req.body.phone
            },
        }, {
            new: true
        });
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