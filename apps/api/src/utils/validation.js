const Joi = require('joi')
  
// Register validation 
const registerValidation = (data) => {
  
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    repeat_password: Joi.ref('password')
  })

  return schema.validate(data)
}

// Login validation
const loginValidation = (data) => {
  
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  })

  return schema.validate(data)
}

module.exports = {
  registerValidation,
  loginValidation
}

  