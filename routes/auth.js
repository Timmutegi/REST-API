const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register', async(req, res) => {
    // VALIDATE BEFORE ADDING USER
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USER EXISTS
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE USER
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id, code: 200, message: 'Successfully created user' });

    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async(req, res) => {
    // VALIDATE
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF EMAIL EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    // CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200).send({ token: token, message: 'successfully Logged in', code: 200 });

})

module.exports = router;