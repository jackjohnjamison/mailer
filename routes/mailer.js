const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')
const API_KEY = require('../API_KEY')

sgMail.setApiKey(API_KEY) 

router.post('/', (req, res) => {

    const msg = {
        to: "jjamison@wiley.com", // Change to your recipient
        from: "jackofthejamison@hotmail.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail.send(msg).then(() => {
        console.log("Email sent")
    }).catch((error) => {
        console.error(error)
    })

})

module.exports = router