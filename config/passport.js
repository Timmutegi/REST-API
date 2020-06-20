const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const Google = require('../models/Google')

module.exports = function(passport) {
    passport.use(newGoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.nextTick.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/users/auth/google/callback'
        },

        async(accesToken, refreshToken, profile, done) => {
            console.log(profile)
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}