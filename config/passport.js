const GoogleStrategy = require('passport-google-oauth20').Strategy
const Google = require('../models/Google')

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/api/user/google/callback'
            },

            async(accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                }

                try {
                    let user = await Google.findOne({ googleId: profile.id })

                    if (user) {
                        done(null, user)
                    } else {
                        user = await Google.create(newUser)
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Google.findById(id, (err, user) => done(err, user))
    })
}