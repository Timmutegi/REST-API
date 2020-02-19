const express = require('express');
const router = express.Router();
const Test = require('../models/test');
const { testValidation } = require('../validation')

// SUBMIT
router.post('/', async(req, res) => {
    const { error } = testValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const test = new Test({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        nationalID: req.body.nationalID,
        kra: req.body.kra,
        companyName: req.body.companyName,
        companyLocation: req.body.companyLocation,
        companyRevenue: req.body.companyRevenue
    });

    try {
        const savedTest = await test.save();
        res.status(200).send({ savedTest, code: 200 })
    } catch (err) {
        res.status(400).json({ message: err });
    }
});