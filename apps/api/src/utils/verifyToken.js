const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  
  if (!token) {
    return res.status(401).send({
      'server_error': 'Access denied',
      'token': token
    })
  } try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(404).send({'server_error': 'Invalid token' + error})
  }
}