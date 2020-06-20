const passport = require('passport');
const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation, resetValidation } = require('../validation');
const bcrypt = require('bcryptjs');


/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: User Management
 */

/**
 * @swagger
 * path: 
 *     /register:
 *         post:
 *             summary: Creates a new user
 *             tags: [Users]
 *             requestBody:
 *                 required: true
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/User'             
 *             responses:
 *                 '200':
 *                     description: A User schema
 *                     schema:
 *                      $ref: '#/components/schemas/User'
 */
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
        res.status(200).send({ user: user._id, firstname: user.firstname, code: 200, message: 'Successfully created user' });

    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /login:
 *  post:
 *      tags:
 *          - User
 *      name: Login
 *      summary: Logs in a user
 *      consumes:
 *          - application/json
 *      responses:
 *          '200':
 *              description: A successful response
 * 
 */
router.post('/login', async(req, res) => {
    // VALIDATE
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ code: 400, details: error.details[0].message });

    // CHECK IF EMAIL EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ code: 400, details: 'Email or Password is invalid' });

    // CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    // if (!validPass) return res.status(400).send({ code: 400, details: 'Email or Password is wrong', error: new Error('Invalid password') });
    if (!validPass) return res.status(400).send({ code: 400, details: 'Email or Password is invalid' });


    // CREATE AND ASSIGN A TOKEN
    try {
        const token = await jwt.sign({ _id: user._id }, 'skdnvkdsjnvsdkjn');
        res.header('auth-token', token).status(200).send({ user: user._id, firstname: user.firstname, token: token, message: 'successfully Logged in', code: 200 });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// RESET PASSWORD 
router.patch('/reset', async(req, res) => {
    // VALIDATE
    const { error } = resetValidation(req.body);
    if (error) return res.status(400).send({ code: 400, details: error.details[0].message });

    // CHECK IF EMAIL EXISTS
    const email = await User.findOne({ email: req.body.email });
    if (!email) return res.status(400).send({ code: 400, details: 'Email is invalid' });

    // CHECK IF PHONE NUMBER EXISTS
    const phone = await User.findOne({ phone: req.body.phone });
    if (!phone) return res.status(400).send({ code: 400, details: 'Phone Number is invalid' });

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const user = await User.updateOne({ email: req.body.email }, { $set: { password: hashedPassword } });
        res.status(200).send({ message: 'Password Updated' });
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('https://luggage-hero-a0de7.web.app')
})

module.exports = router;