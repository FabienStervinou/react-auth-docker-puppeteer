const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation, isEmail } = require('../utils/validation')


const get = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (e) {
    next();
  }
};

const register = async (req, res,) => {

  // Validate data before create
  const { error } = registerValidation(req.body);
  if (error) {
    var errorMessgae = error.details[0].message;
    return res.status(401).send({'server_error': errorMessgae});
  }

  if (isEmail(req.body.email)) {
    // Verify if user already in the db
    const emailExist = await User.findOne({
      email: req.body.email
    })
    if (emailExist) {
      return res.status(401).send({'server_error': 'Email already exists in the database'})
    }
    
    // Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
  
    const user = new User({
      email: req.body.email,
      password: hashPassword,
      repeat_password: hashPassword,
    });
    try {
      const savedUser = await user.save();
      res.send({ 'id': user._id})
    } catch (error) {
      res.status(401).send('server_error', error)
    }
  } else {
    return res.status(401).send({'server_error': 'Email is not valid'})
  }


}

const login = async (req, res) => {

  // Validate data before login
  const { error } = loginValidation(req.body)
  if (error) {
    var errorMessgae = error.details[0].message
    return res.status(401).send({'server_error': errorMessgae})
  }

  if (isEmail(req.body.email)) {

    // Verify if email exists in the db
    const user = await User.findOne({
      email: req.body.email
    })
    if (!user) {
      return res.status(401).send({'server_error': 'Email adress not found'})
    }

    // Verify if password is correct 
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).send({'server_error': 'Password is not valid'})
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send({
      'token': token,
      'user': user,
      'server-success': 'Logged in with success'
    })
  } else {
    return res.status(401).send({'server_error': 'Email is not valid'})
  }
}

const profile = async (req, res) => {
  const id = req.body._id

  try {
    const user = await User.findOne({
      _id: id
    })
    if (user) {
      return res.send({
        'server-success': 'Find profile with success',
        'user': user
      })
    } else {
      return res.send({ 'server_error': 'User not found' })
    }
  } catch (error) {
    return res.send(error)
  }

}

const verifyToken = async (req, res) => {
  const token_header = req.header('auth-token')

  if (token_header) {
    return res.send({
      'token': token_header,
      'user': req.user
    })
  } else {
    return res.send({
      'server_error': 'Error on verifyToken'
    })
  }
}

const UserController = {
  get,
  register,
  login,
  profile,
  verifyToken
};

module.exports = UserController;