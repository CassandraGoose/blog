const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')
const saltRounds = 10


function validID(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/', (req, res) => {
  queries.getAllComments().then(users => {
    res.json(users)
  })
})

router.post('/', (req, res, next) => {
  queries.createComment(req.body).then(users => {
    res.json(users[0])
  })
})

module.exports = router
