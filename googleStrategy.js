const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
// const config = require('./config');
require('dotenv/config');

function extractProfile(profile) {
    let imageUrl = '';

    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }

    return {
        id: profile.id,
        displayName: profile.displayName,
        image: imageUrl,
    };
}

passport.use(new googleStrategy({
        clientID: process.env.clientId,
        clientSecret: process.env.secret,
        callbackURL: process.env.callback,
        accessType: 'offline',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, cb) => {
        cb(null, extractProfile(profile));
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});