// const iframe = document.getElementById('dialog-iframe').contentWindow.document.querySelector('html')
// const content = iframe.contentWindow.document.querySelector('html')

function postRequest(emailDataJSON) {
    const request = new XMLHttpRequest()
    const API_URL = 'http://jjamison.co.uk/mailer/api'

    request.open("POST", API_URL, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(emailDataJSON)

    request.onreadystatechange = () => {
        console.log(request.readyState, request.status, request.response)
    }
}

function collectEmailData() {
    return {
        toAddress: 'jjamison@wiley.com',
        subject: 'Test email',
        html: document.getElementById('dialog-iframe').contentWindow.document.querySelector('body'),
    }
}

function sendMail() {
    const emailDataJSON = JSON.stringify(collectEmailData())
    postRequest(emailDataJSON)
}


