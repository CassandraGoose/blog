const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const authMiddleware = require('../auth/middleware.js')

router.get('/', authMiddleware.allowAccess, (req, res) => {
  queries.getAll().then(friends => {
    res.json(friends)
  })
})

module.exports = router
