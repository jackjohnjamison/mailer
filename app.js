const  express = require('express')
const  path = require('path')

const  cookieParser = require('cookie-parser') // Unused???
const  logger = require('morgan') // Unused???

const  nunjucks = require('nunjucks')

const  indexRouter = require('./routes/index')
const  mailerRouter = require('./routes/mailer')

const  app = express()

app.use(express.static('assets/dist')) // Sets root for static files

const bodyParser = require('body-parser') // For parsing the body of API requests
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// configute Nunjucks with 'views' as templates directory
nunjucks.configure('views', {
  autoescape:  true,
  express:  app
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:  false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/mailer', mailerRouter)

module.exports = app