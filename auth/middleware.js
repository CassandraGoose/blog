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

// function ensureLoggedIn(req, res, next){
//   const tokenHeader = req.get('Authorization')
//   console.log('ensureloggedin', 'token header', tokenHeader);
//   let token = tokenHeader.split(' ')[1]
//   console.log('ensureloggedin', 'token', token);
//   jwt.verify(token, process.env.TOKEN_SECRET, (decoded, err) => {
//     if (!err) {
//       console.log('decoded', decoded);
//       req.person = decoded;
//       next()
//     } else {
//       next()
//     }
//   })
//   //check if valid token?
//   console.log('req.person should match decoded', req.person);
//   if(req.person){
//     next();
//   }else{
//     res.status(401)
//     next(new Error('Un-Authorized'))
//   }
// }

function allowAccess(req, res, next){
  const tokenHeader = req.get('Authorization')
  let token = tokenHeader.split(' ')[1]
  console.log('allowaccess', 'token', token);
  jwt.verify(token, process.env.TOKEN_SECRET, (decoded, err) => {
    console.log('in the verify function');
    if (!err) {
      console.log('decoded in allowaccess', decoded);
      req.person = decoded;
      console.log('req.person should match decoded', req.person);
        if(req.person.id == req.params.id){
          next();
        }else{
          res.status(401)
          next(new Error('Un-Authorized'))
        }
      next()
    } else {
      next()
    }
  })
  // console.log('req.person.id', req.person.id);

}



module.exports = {
  allowAccess,
  checkTokenSetUser
}
