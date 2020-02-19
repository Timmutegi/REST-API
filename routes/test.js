const express = require('express');
const router = express.Router();
const Test = require('../models/test');

// SUBMIT
router.post('/', async(req, res) => {
    const test = new Test({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        nationalID: req.body.nationalID,
        kra: req.body.kra,
        companyName: req.body.companyName,
        companyLocation: req.body.companyLocation,
        companyRevenue: req.body.compnayRevenue
    });

    try {
        const savedTest = await test.save();
        res.send({ savedTest })
    } catch (err) {
        res.json({ message: err });
    }
});