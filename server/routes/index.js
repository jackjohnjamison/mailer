let  express = require('express')
let  router = express.Router()

router.get('/', async  function(req, res, next) {
  let  data = {
    message: 'Hello world!',
    layout:  'layout.njk',
    title: 'Nunjucks example'
  }

  res.render('index.njk', data)
})

console.log('I ran')

module.exports = router