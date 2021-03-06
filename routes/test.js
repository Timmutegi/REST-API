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
        KRA: req.body.KRA,
        companyName: req.body.companyName,
        companyLocation: req.body.companyLocation,
        companyRevenue: req.body.companyRevenue
    });

    try {
        const savedTest = await test.save();
        res.status(200).send({ savedTest, code: 200 })
    } catch (err) {
        res.status(400).json({ message: err, code: 400 });
    }
});

// GET ONE 
router.get('/:ID', async(req, res) => {
    try {
        const data = await Test.findById(req.params.ID);
        res.status(200).send({ data, code: 200 });
    } catch (err) {
        res.status(400).send({ message: err });
    }
})

module.exports = router;