const { number } = require('joi');
const Joi = require('joi');


const schemaValidation= {
    body:Joi.object().required().keys({
        name:Joi.string().min(4).max(20).required(),
        password:Joi.string().min(4).max(15).required(),
        email : Joi.string().email().required(),
        age :Joi.number()
    })
}
module.exports = schemaValidation;
