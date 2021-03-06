// VALIDATION
const joi = require('@hapi/joi');

// REGISTER VALIDATION
const registerValidation = data => {
    const schema = joi.object({
        firstname: joi
            .string()
            .required(),
        lastname: joi
            .string()
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
        customer: joi
            .string()
            .required(),
        shop: joi
            .string()
            .required(),
        status: joi
            .string()
            .required(),
        date: joi
            .date()
            .required(),
    });
    return schema.validate(data);
};

// TEST VALIDATION
const testValidation = data => {
    const schema = joi.object({
        firstname: joi
            .string()
            .required(),
        lastname: joi
            .string()
            .required(),
        phone: joi
            .number()
            .required(),
        email: joi
            .string()
            .required()
            .email(),
        nationalID: joi
            .number()
            .min(8)
            .required(),
        KRA: joi
            .string()
            .required(),
        companyName: joi
            .string()
            .required(),
        companyLocation: joi
            .string()
            .required(),
        companyRevenue: joi
            .number()
            .required()

    });
    return schema.validate(data);
};

// SUBSCRIBE VALIDATION
const subscribeValidation = data => {
    const schema = joi.object({
        email: joi
            .string()
            .required()
            .email()
    })
    return schema.validate(data);
};

// RESET VALIDATION
const resetValidation = data => {
    const schema = joi.object({
        email: joi
            .string()
            .required()
            .email(),
        password: joi
            .string()
            .required(),
        phone: joi
            .number()
            .required()
            .min(6)

    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.storeValidation = storeValidation;
module.exports.bookingValidation = bookingValidation;
module.exports.testValidation = testValidation;
module.exports.subscribeValidation = subscribeValidation;
module.exports.resetValidation = resetValidation;