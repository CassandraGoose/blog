const express = require('express')
const router = express.Router()
const knex = require('../db')
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')
const saltRounds = 10


function validID(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/', (req, res) => {
  knex.select('*').from('people')
    .leftJoin('post', 'people.id', 'post.people_id')
    .then(stuff => {
      res.json(stuff)
    })
})
router.get('/:id', (req, res) => {
  queries.getById(req.params.id)
  .then(userPosts => {
    console.log("hey from /:id");
    console.log(userPosts);
    res.json(userPosts)
  })
})

// router.get('/:id', (req, res) => {
//   knex.select('*').from('people')
//     .where('id', req.params.id)
//     .leftJoin('post', 'people.id', 'post.people_id')
//     .then(stuff => {
//       res.json(stuff)
//     })
// })

router.post('/', (req, res, next) => {
  queries.createPost(req.body).then(posts => {
    res.json(posts[0])
  })
})

module.exports = router
