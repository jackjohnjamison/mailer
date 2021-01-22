// const iframe = document.getElementById('dialog-iframe').contentWindow.document.querySelector('html')
// const content = iframe.contentWindow.document.querySelector('html')
document.querySelector('.email-preview')

function postRequest(emailDataJSON) {
    const request = new XMLHttpRequest()
    const API_URL = 'https://jjamison.co.uk/mailer/api'

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
        html: document.querySelector('#dialog-iframe').contentWindow.document.querySelector('#MainFrame').contentWindow.document.querySelector('body').innerHTML
    }
}

(function sendMail() {
    const emailDataJSON = JSON.stringify(collectEmailData())
    postRequest(emailDataJSON)
})();


