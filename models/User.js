const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 6
    },
    lastname: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phone: {
        type: Number,
        required: true,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 1024,
        min: 6
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);