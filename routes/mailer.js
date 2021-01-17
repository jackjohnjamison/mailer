var express = require('express')
var router = express.Router()

router.get('/', (req, res) =>
    res.status(200).json({ message: 'Welcome to Express API template' })
)

module.exports = router