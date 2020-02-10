const mongoose = require('mongoose');

const HoursSchema = mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stores',
        required: true
    },
    hours: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('business-hours', HoursSchema);