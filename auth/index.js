const express = require('express')
const router = express.Router()
const knex = require('../db')
const bcrypt = require('bcryptjs')
const queries = require('../db/queries')
const jwt = require('jsonwebtoken')
const saltRounds = 10

router.get('/signup', (req, res) => {
  res.json({
    message: 'working'
  })
})

function validPerson(user) {
  const validEmail = typeof user.email === 'string' && user.email.trim() != ''
  const validPassword = typeof user.password === 'string' &&
    user.password.trim() != '' &&
    user.password.trim().length >= 6
  return validEmail && validPassword
}

function validUsername(user) {
  const validUsername = typeof user.username === 'string' && user.username.trim() != ''
  const validPassword = typeof user.password === 'string' && user.password.trim() != ''
  return validUsername && validPassword
}

router.post('/signup', (req, res, next) => {
  if (validPerson(req.body)) {
    queries.getOneByEmail(req.body.email)
      .then(person => {
        if (!person) {
          bcrypt.hash(req.body.password, saltRounds)
            .then((hash) => {
              const person = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
                tagline: req.body.tagline,
                photo_url: req.body.photo_url
              }
              queries.create(person)
                .then(id => {
                  console.log('id', id);
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
          next(new Error('Email in already in use'))
        }
      })
  } else {
    next(new Error('Invalid user'))
  }
})

router.post('/login', (req, res, next) => {
  if (validUsername(req.body)) {
    console.log(req.body);
    queries.getOneByUsername(req.body.username)
      .then(person => {
        if (person) {
          bcrypt.compare(req.body.password, person.password)
            .then((result) => {
              if (result) {
                let token = jwt.sign({
                  id: person.id
                }, process.env.TOKEN_SECRET, {
                  expiresIn: '1h'
                })
                console.log(token)
                res.json({
                  id: person.id,
                  token,
                  message: 'ok'
                })
              } else {
                next(new Error('Invalid login'))
              }
            })
        } else {
          next(new Error('Invalid login'))
        }
      })
  } else {
    next(new Error('Invalid login'))
  }
})

module.exports = router;
