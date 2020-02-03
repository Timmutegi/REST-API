// VALIDATION
const joi = require('@hapi/joi');

// REGISTER VALIDATION
const registerValidation = data => {
    const schema = joi.object({
        firstname: joi
            .string()
            .min(6)
            .required(),
        lastname: joi
            .string()
            .min(6)
            .required(),
        phone: joi
            .number()
            .min(6)
            .required(),
        email: joi
            .string()
            .min(6)
            .required()
            .email(),
        password: joi
            .string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};

// LOGIN VALIDATION
const loginValidation = data => {
    const schema = joi.object({
        email: joi
            .string()
            .min(6)
            .required()
            .email(),
        password: joi
            .string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};


// STORE VALIDATION
const storeValidation = data => {
    const schema = joi.object({
        email: joi
            .string()
            .min(6)
            .required()
            .email(),
        password: joi
            .string()
            .min(6)
            .required(),
        name: joi
            .string()
            .required(),
        county: joi
            .string()
            .required(),
        location: joi
            .string()
            .required(),
        capacity: joi
            .number()
            .required(),
        phone: joi
            .number()
            .required(),
        street: joi
            .string()
            .required()
    });
    return schema.validate(data);
};

// BOOKING VALIDATION
const bookingValidation = data => {
    const schema = joi.object({
        user_ID: joi
            .string()
            .required(),
        shop_ID: joi
            .string()
            .required(),
        status: joi
            .string()
            .required(),
    });
    return schema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.storeValidation = storeValidation;
module.exports.bookingValidation = bookingValidation;