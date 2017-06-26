const express = require('express')
const router = express.Router()
const knex = require('../db')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const queries = require('../db/queries')
require('dotenv').config();

function ensureLogginIn(req, res, next) {
  const authHeader = req.get('Authorization')
  console.log(authHeader)
  const token = authHeader.split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      console.log('here', err, decoded)
      if (!err) return next()
      res.status(401)
      next(new Error('Invalid token'))
    })
  } else {
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

function allowAccess(req, res, next) {
  const authHeader = req.get('Authorization')
  console.log(authHeader)
  const token = authHeader.split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      console.log('here', err, decoded)
      if (!err && req.params.id == decoded.id) return next()
      res.status(401)
      next(new Error('Un-Authorized'))
    })
  } else {
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}


module.exports = {
  ensureLogginIn,
  allowAccess
}
