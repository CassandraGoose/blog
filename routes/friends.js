const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

router.get('/friends', (req, res) => {
  queries.getAll().then(friends => {
    res.json(friends)
  })
})

module.exports = router
