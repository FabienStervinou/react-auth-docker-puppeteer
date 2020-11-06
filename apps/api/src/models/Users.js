const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = model('user', UserSchema)
module.exports = User