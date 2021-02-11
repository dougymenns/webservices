//validation
const Joi = require('joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().strip().required(),
        last_name: Joi.string().strip().required(),
        email: Joi.string().strip().required().email(), 
        user_name: Joi.string().strip().required(),
        user_type: Joi.string().strip().required(), 
        password: Joi.string().strip().required(),
        phone: Joi.string().strip().required()
      });

      return schema.validate(data);
}

const gssValidation = (data) => {
  const schema = Joi.object({
      full_name: Joi.string().strip().required(),
      employed: Joi.boolean().strip().required(),
      email: Joi.string().strip().required().email(), 
      workplace: Joi.string().strip().required(),
      workplace_role: Joi.string().strip().required(),
      medium: Joi.string().strip().required(), 
      come_along: Joi.string().strip().required(),
      people_along: Joi.string().strip().required(),
      expectation: Joi.string().strip().required(),
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
module.exports.gssValidation = gssValidation