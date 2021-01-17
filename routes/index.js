let  express = require('express')
let  router = express.Router()

router.get('/', async  function(req, res, next) {
  let  data = {
    h1: 'HTML email sending tool',
    layout:  'layout.njk',
    title: 'HTML email sending tool'
  }

  res.render('index.njk', data)
})

module.exports = router