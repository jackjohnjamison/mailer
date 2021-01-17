const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')

// Set API key if file is avalible
let API_KEY

try {
    API_KEY = require('../API_KEY')
    sgMail.setApiKey(API_KEY) 
} catch {
    console.error(`
        No API key file present
        Crate and account and gain an API key at sendgrid.com
        Add a file in the root directory called 'API_KEY.js' using the following format:
        module.exports = 'SG._XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    `)
}

// Set message defaults
const defaults = {
    fromAddress: 'jackofthejamison@hotmail.com', // this has to be set to your validated email sending address.
    subject: 'No subject', // The SendGrid mailer API requires a subject
    text: 'No text content',
    html: 'No html content'
}

router.post('/', (req, res) => {

    console.log(req.body)

    if (req.body.toAddress) {
        const msg = {
            to: req.body.toAddress,
            from: req.body.fromAddress || defaults.fromAddress,
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