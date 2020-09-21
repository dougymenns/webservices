//validation
const Joi = require('joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().strip().required(),
        last_name: Joi.string().strip().required(),
        email: Joi.string().strip().required().email(), 
        password: Joi.string().strip().required(),
        phone: Joi.string().strip().required()
      });

      return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().strip().required().email(), 
        password: Joi.string().strip().required(),
      });

      return schema.validate(data);
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation