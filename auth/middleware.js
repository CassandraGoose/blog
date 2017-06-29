const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkTokenSetUser(req, res, next) {
  const tokenHeader = req.get('Authorization')
  console.log('auth header', tokenHeader)
  if (tokenHeader) {
    let token = tokenHeader.split(' ')[1]
    console.log('token!!!!!', token);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next()
      } else {
        console.log('decoded', decoded);
        req.person = decoded;
        next()
      }
    });
  } else {
    next()
  }
}

function ensureLoggedIn(req, res, next) {
  console.log('req.person', req.person)
  if (req.person) {
    next()
  } else {
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

function allowAccess(req, res, next) {
  console.log(req.person.id, req.params.id)
  if (req.person.id == req.params.id) {
    next()
  } else {
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

module.exports = {
  ensureLoggedIn,
  allowAccess,
  checkTokenSetUser
}
