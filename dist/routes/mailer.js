const  express = require('express')
const  router = express.Router()

router.get('/', async  function(req, res, next) {
  let  data = {
    h1: 'HTML email sending tool',
    layout:  'layout.njk',
    title: 'HTML email sending tool',
    bodyClass: "full-width"
  }

  res.render('mailer.njk', data)
})

module.exports = router