const mongoose = require('mongoose');
/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  -firstname
 *                  -lastname
 *                  -email
 *                  -phone
 *                  -password
 *              properties:
 *                  name:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                      format: email
 *                      description: Email of the user, needs to be unique
 *                  phone:
 *                      type: number
 *                      description: Phone Number of the user, needs to be unique
 *                  password:
 *                      type: string
 *                      description: Must be a minimum of 6 characters
 *                      
 * 
 */
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
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
        required: true,
        max: 1024,
        min: 6
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);