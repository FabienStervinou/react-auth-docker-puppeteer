const UserController = require('../controllers/users.js')
const tokenRequired = require('../utils/verifyToken')

const routes = app => { 
  app.get('/users', UserController.get)
  app.post('/users/profile', tokenRequired, UserController.profile)
  app.post('/register', UserController.register)
  app.post('/login', UserController.login)
  app.get('/verifyToken', tokenRequired, UserController.verifyToken)
}

module.exports = routes