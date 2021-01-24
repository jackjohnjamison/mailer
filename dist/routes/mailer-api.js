const express = require('express')
const router = express.Router()
const sendMail = require('../lib/mail-sender')

router.post('/', (req, res) => {
    sendMail(req, res)
})

module.exports = router