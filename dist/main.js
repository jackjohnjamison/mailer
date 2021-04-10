const express = require('express')
const basicAuth = require('express-basic-auth')
const path = require('path')
const auth = require('./lib/auth')

const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser') // For parsing the body of API requests

const nunjucks = require('nunjucks')

const main = express()

main.use(bodyParser.json()) // support json encoded bodies
main.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// configute Nunjucks with 'views' as templates directory
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: main
})

main.use(logger('dev'))
main.use(express.json())
main.use(express.urlencoded({ extended:  false }))
main.use(cookieParser())
main.use(express.static(path.join(__dirname, 'assets'))) // Sets root for static files

// Adding routes
const indexRouter = require('./routes/index')
const mailerRouter = require('./routes/mailer')
const mailerAPIRouter = require('./routes/mailer-api')
const constructor = require('./routes/constructor')
const publishing = require('./routes/publishing')

console.log(constructor)
console.log(publishing)

main.use('/', indexRouter)
main.use('/mailer', basicAuth(auth.page), mailerRouter)
main.use('/mailer/api', /*basicAuth(auth.api),*/ mailerAPIRouter) // TODO basic auth for the API
main.use('/constructor', basicAuth(auth.page), constructor)
main.use('/publishing', publishing)


module.exports = main