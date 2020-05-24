const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET SPECIFIC USER
router.get('/:userID', async(req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        res.status(200).send(user);
    } catch (err) {
        res.json({ message: err });
    }
});

// CHANGE PASSWORD OF USER
router.patch('/password', async(req, res) => {

    const user = await User.findById(req.body.id);
    if (!user) return res.status(400).send({ code: 400, details: 'User Does Not Exist' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ code: 400, details: 'Current password is invalid' });

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(req, body.newPassword, salt);

    try {
        User.updateOne({ _id: req.body.id }, { $set: { password: newHashedPassword } });
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

module.exports = router;