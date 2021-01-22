const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')
const configs = require('../bin/configs')

// Set message defaults
const defaults = {
    fromAddress: "", // this has to be set to your validated email sending address.
    subject: 'No subject', // The SendGrid mailer API requires a subject
    text: 'No text content',
    html: 'No html content'
}

// Set API key and From email enviromental variables
try {
    sgMail.setApiKey( configs.API_KEY ) 
} catch(err) {
    console.error('No API key environment variable', err)
}

try {
    defaults.fromAddress = configs.FROM_EMAIL
} catch(err) {
    console.error('No from email address environment variable', err)
}

router.post('/', (req, res) => {

    console.log(req.body)

    if (req.body.toAddress) {
        const msg = {
            to: req.body.toAddress,
            from: defaults.fromAddress,
            subject: req.body.subject || defaults.subject,
            text: req.body.text || defaults.text,
            html: req.body.html || defaults.html
        }
    
        sgMail.send(msg).then(() => {
            console.log(msg)
            res.status(200).json({ message: msg })
        }).catch((error) => {
            console.error(error, msg)
            res.status(400).json({ message: 'Message sending failed', msg })
        })

    } else {
        console.error('Message sending failed, no recipient address included')
        res.status(400).json({ message: 'Message sending failed, no recipient address included' })
    }
})

module.exports = router