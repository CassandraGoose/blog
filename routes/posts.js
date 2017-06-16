const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')
const saltRounds = 10


function validID(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/posts', (req, res) => {
  queries.getAllPosts().then(posts => {
    res.json(posts)
  })
})

router.post('posts', (req, res, next) => {
  queries.createPost(req.body).then(posts => {
    res.json(posts[0])
  })
})

module.exports = router
