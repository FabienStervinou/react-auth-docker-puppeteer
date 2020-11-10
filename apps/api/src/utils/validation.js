const Joi = require('joi')
  
// Register validation 
const registerValidation = (data) => {
  
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be an empty field`,
      'string.min': `Email should have a minimum length of 6`,
      'string.max': `Email should have a maximum length of 255`,
      'any.required': `Email is a required field`
    }),
    password: Joi.string().min(6).max(1024).required().messages({
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of 6`,
      'string.max': `Password should have a maximum length of 1024`,
      'any.required': `Password is a required field`
    }),
    repeat_password: Joi.ref('password')
  })

  return schema.validate(data)
}

// Login validation
const loginValidation = (data) => {
  
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be an empty field`,
      'string.min': `Email should have a minimum length of 6`,
      'string.max': `Email should have a maximum length of 255`,
      'any.required': `Email is a required field`
    }),
    password: Joi.string().min(6).max(1024).required().messages({
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of 6`,
      'string.max': `Password should have a maximum length of 1024`,
      'any.required': `Password is a required field`
    }),
  })

  return schema.validate(data)
}

const isEmail = (data) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(data)
}

module.exports = {
  registerValidation,
  loginValidation,
  isEmail
}

  