var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('AAAAAAAAAAAAAAAAAA')
    return res.status(200).json({ message: 'Welcome to Express API template' })
});

console.log('I ran')

module.exports = router