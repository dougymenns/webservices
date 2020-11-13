//validation
const Joi = require('joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().strip().required(),
        last_name: Joi.string().strip().required(),
        user_name: Joi.string().strip().required(),
        user_type: Joi.string().strip().required(),
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

const freelancerValidation = (data) => {
  const schema = Joi.object({
      region: Joi.string().strip().required(),
      expertise: Joi.string().strip().required(),
      level_of_expertise: Joi.string().strip().required(),
      other_skills: Joi.string().strip().required(),
      about: Joi.string().strip().required(),
      picture: Joi.string().strip().required(),
      resume: Joi.string().strip().required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.freelancerValidation = freelancerValidation