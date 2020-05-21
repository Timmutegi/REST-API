const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET SPECIFIC USER
router.get('/:userID', async(req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        res.status(200).send(user);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;