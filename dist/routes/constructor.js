const express = require('express')
const router = express.Router()

router.get('/', async  function(req, res, next) {
  let  data = {
    h1: 'Run Command Constructor',
    layout:  'layout.njk',
    title: 'Run Command Constructor',
    noIndex: true,
    bodyClass: "body--constructor"
  }

  res.render('constructor.njk', data)
})

module.exports = router