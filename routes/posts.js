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
    for(var i = 0; i < posts.length; i++){
      queries.getPersonImage(posts[i].people_id).then(users => {
        posts[i]["image_url"] = users.photo_url
      })
    }

  })
  res.json(posts)
})

router.post('posts', (req, res, next) => {
  queries.createPost(req.body).then(posts => {
    res.json(posts[0])
  })
})

module.exports = router
