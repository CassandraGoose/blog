const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require('jsonwebtoken')
require('dotenv').config()



function validUserPost(user) {
  const hasUsername = typeof user.username == 'string' && user.username.trim() != ''
  const hasEmail = typeof user.email == 'string' && user.email.trim() != ''
  const hasPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6
  return hasUsername && hasEmail && hasPassword
}

function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != ''
  return validEmail && validPassword;
}

function validID(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/', (req, res) => {
  queries.getAll().then(users => {
    res.json(users)
  })
})

router.post('/', (req, res, next) => {
  queries.create(req.body).then(users => {
    res.json(users[0])
  })
})

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {

        if (!user) {

          bcrypt.hash(req.body.password, saltRounds)
            .then((hash) => {
              const user = {
                email: req.body.email,
                password: hash,
              }
              User
                .create(user)
                .then(id => {
                  // setUserIdCookie(req, res, id);
                  jwt.sign({
                    id
                  }, process.env.TOKEN_SECRET, {
                    expiresIn: '1h'
                  }, (err, token) => {
                    res.json({
                      id,
                      token,
                      message: 'ok'
                    })
                  })
                })
            })
        } else {
          next(new Error('Email in use'))
        }
      })
  } else {
    next(new Error('Invalid user'))
  }
})



router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                jwt.sign({
                  id: user.id
                }, process.env.TOKEN_SECRET, {
                  expiresIn: '1h'
                }, (err, token) => {
                  res.json({
                    id: user.id,
                    token,
                    message: 'ok'
                  })
                })
              } else {
                next(new Error('Invalid login'))
              }
            });
        } else {
          next(new Error('Invalid login'))
        }
      })
  } else {
    next(new Error('Invalid login'))
  }
})

module.exports = router
