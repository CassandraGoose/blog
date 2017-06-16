const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const app = express()

var authMiddleware = require('./routes/middleware')

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan')
  app.use(logger('dev'))
}


app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

// app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(cors())


app.use('/api', require('./routes/people'))
app.use('/api', require('./routes/posts'))
app.use('/api', require('./routes/comments'))

// app.use('/user', authMiddleware.ensureLogginIn, require('./routes/posts'))
  // app.use('/api/posts', require('./routes/comments'))

// app.use('*', function(req, res, next) {
//   res.sendFile('index.html', {
//     root: path.join(__dirname, 'public')
//   })
// })

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
