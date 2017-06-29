const express = require('express')
const router = express.Router()
const knex = require('../db')
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const authMiddleware = require('../auth/middleware.js')

function validID(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/', authMiddleware.allowAccess, (req, res) => {
  knex.select('*').from('people')
    .leftJoin('post', 'people.id', 'post.people_id')
    .then(stuff => {
      res.json(stuff)
    })
})

router.get('/:id', authMiddleware.allowAccess, (req, res) => {
  queries.getById(req.params.id)
    .then(userPosts => {
      console.log("hey from /:id");
      res.json(userPosts)
    })
})

router.post('/', (req, res, next) => {
  queries.createPost(req.body).then(posts => {
    res.json(posts[0])
  })
})

module.exports = router
