const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const app = express()

var authMiddleware = require('./auth/middleware.js')

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan')
  app.use(logger('dev'))
}


app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

app.use(cors())

app.use(authMiddleware.checkTokenSetUser);


app.use('/api/posts', authMiddleware.ensureLoggedIn, require('./routes/posts'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/friends', require('./routes/friends'))
app.use('/auth', require('./auth/index'))


app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)

  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

app.listen(process.env.PORT || 3000)

module.exports = app
