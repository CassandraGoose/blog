const express = require('express')
const router = express.Router()
const queries = require('./db/queries')
const bcrypt = require('bcryptjs')
const saltRounds = 10



function validUserPost(user) {
  const hasUsername = typeof user.username == 'string' && user.username.trim() != ''
  const hasEmail = typeof user.email == 'string' && user.email.trim() != ''
  const hasPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6
  return hasUsername && hasEmail && hasPassword
}

function validID(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/users', (req, res) => {
  queries.getAll().then(users => {
    res.json(users)
  })
})

router.post('/users', (req, res, next) => {
  queries.create(req.body).then(users => {
    res.json(users[0])
  })
})

module.exports = router
