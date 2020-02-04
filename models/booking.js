const mongoose = require('mongoose');


const BookingSchema = mongoose.Schema({
    user_ID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shop_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Stores',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Bookings', BookingSchema);