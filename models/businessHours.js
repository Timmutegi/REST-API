const mongoose = require('mongoose');

const HoursSchema = mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stores',
        required: true
    },
    hours: [Array]
});

module.exports = mongoose.model('business-hours', HoursSchema);