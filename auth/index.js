const express = require('express')
const router = express.Router()
const knex = require('../db')
const bcrypt = require('bcryptjs')
const queries = require('../db/queries')

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

router.post('/signup', (req, res, next) => {
  if (validPerson(req.body)) {
    queries.getOneByEmail(req.body.email)
      .then(person => {
        console.log('person', person)
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
                  res.json({
                    id,
                    message: 'signup route working'
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

module.exports = router;
