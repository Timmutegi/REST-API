const mongoose = require('mongoose');


const BookingSchema = mongoose.Schema({
    user_ID: {
        type: String,
        required: true
    },
    shop_ID: {
        type: String,
        required: true
    },
    status: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Bookings', BookingSchema);