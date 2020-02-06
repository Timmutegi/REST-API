const mongoose = require('mongoose');

const HoursSchema = mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stores',
        required: true
    },
    hours: {
        monday: {
            open: {
                type: String,
            },
            close: {
                type: String,
            }
        },
        tuesday: {
            open: {
                type: String,
            },
            close: {
                type: String,
            }
        },
        wednesday: {
            open: {
                type: String,
            },
            close: {
                type: String,
            }
        },
        thursday: {
            open: {
                type: String,
            },
            close: {
                type: String,
            }
        },
        friday: {
            open: {
                type: String,
            },
            close: {
                type: String,
            }
        },
        saturday: {
            open: {
                type: String,
            },
            close: {
                type: String,
            }
        },
        sunday: {
            open: {
                type: String,
            },
            close: {
                type: String,
            }
        }
    }
});

module.exports = mongoose.model('business-hours', HoursSchema);