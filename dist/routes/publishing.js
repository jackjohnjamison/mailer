const express = require('express')
const router = express.Router()

router.get('/', async  function(req, res, next) {
  let  data = {
    h1: 'Academic Publishing',
    layout:  'layout.njk',
    title: 'Academic Publishing',
    bodyClass: 'publishing'
  }
  console.log('I ran')

  res.render('publishing.njk', data)
})

module.exports = router