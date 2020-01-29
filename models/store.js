const mongoose = require('mongoose');


const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Stores', StoreSchema);