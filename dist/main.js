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
main.use('/', require('./routes/index') )
main.use('/mailer', basicAuth(auth.page), require('./routes/mailer') )
main.use('/mailer2', basicAuth(auth.page), require('./routes/mailer2') )
main.use('/mailer/api', /*basicAuth(auth.api),*/ require('./routes/mailer-api') ) // TODO basic auth for the API
main.use('/constructor', basicAuth(auth.page), require('./routes/constructor') )
main.use('/publishing', require('./routes/publishing') )

module.exports = main