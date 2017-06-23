const express = require('express')
const router = express.Router()
const knex = require('../db')
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')
const saltRounds = 10


function validID(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/posts', (req, res) => {
  knex.select('*').from('people')
    .leftJoin('post', 'people.id', 'post.people_id')
    .then(stuff => {
      console.log(stuff);
      res.json(stuff)
    })
})

router.post('/posts', (req, res, next) => {
  queries.createPost(req.body).then(posts => {
    res.json(posts[0])
  })
})

module.exports = router
