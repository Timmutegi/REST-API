const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nationalID: {
        type: String,
        required: true
    },
    KRA: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
    },
    companyRevenue: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('formdata', TestSchema);