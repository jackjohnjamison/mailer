const express = require('express')
const path = require('path')

const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser') // For parsing the body of API requests

const nunjucks = require('nunjucks')

const indexRouter = require('./routes/index')
const mailerRouter = require('./routes/mailer')
const mailerAPIRouter = require('./routes/mailer-api')

const app = express()


app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// configute Nunjucks with 'views' as templates directory
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:  false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'assets'))) // Sets root for static files

app.use('/', indexRouter)
app.use('/mailer', mailerRouter)
app.use('/mailer/api', mailerAPIRouter)

module.exports = app