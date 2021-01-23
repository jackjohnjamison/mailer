const express = require('express')
const basicAuth = require('express-basic-auth')
const path = require('path')
const auth = require('./lib/auth')


const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser') // For parsing the body of API requests

const nunjucks = require('nunjucks')

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

// Adding routes
const indexRouter = require('./routes/index')
const mailerRouter = require('./routes/mailer')
const mailerAPIRouter = require('./routes/mailer-api')
const constructor = require('./routes/constructor')

app.use('/', indexRouter)
app.use('/mailer', basicAuth(auth.page), mailerRouter)
app.use('/mailer/api', /*basicAuth(auth.api),*/ mailerAPIRouter) // TODO basic auth for the API
app.use('/constructor', basicAuth(auth.page), constructor)

module.exports = app