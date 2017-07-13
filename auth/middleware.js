const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkTokenSetUser(req, res, next) {
  const tokenHeader = req.get('Authorization')
  if (tokenHeader) {
    let token = tokenHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET, (decoded, err) => {
      if (!err) {
        req.person = decoded;
        next()
      } else {
        next()
      }
    });
  } else {
    next()
  }
}

function allowAccess(req, res, next) {
  const tokenHeader = req.get('Authorization')
  let token = tokenHeader.split(' ')[1]
  jwt.verify(token, process.env.TOKEN_SECRET, (decoded, err) => {
    if (!err) {
      req.person = decoded;
      if (req.person.id == req.params.id) {
        next();
      } else {
        res.status(401)
        next(new Error('Un-Authorized'))
      }
      next()
    } else {
      next()
    }
  })

}



module.exports = {
  allowAccess,
  checkTokenSetUser
}
