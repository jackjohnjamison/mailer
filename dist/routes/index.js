const express = require('express')
const router = express.Router()

router.get('/', async  function(req, res, next) {
  let  data = {
    h1: 'Homepage',
    layout:  'layout.njk',
    title: 'Webpage title'
  }

  res.render('index.njk', data)
})

module.exports = router