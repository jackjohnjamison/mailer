(() => {
    function postRequest(emailDataJSON) {
        const request = new XMLHttpRequest()
        const API_URL = 'http://localhost:3000/mailer' // TODO enviroment variable
    
        request.open("POST", API_URL, true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(emailDataJSON)
    
        request.onreadystatechange = () => {
            console.log(request.readyState, request.status, request.response)
        }
    }
    
    function collectEmailData() {
        return {
            toAddress: document.getElementById('toAddress').value,
            fromAddress: document.getElementById('fromAddress').value,
            subject: document.getElementById('subject').value,
            html: document.getElementById('html').value,
            text: document.getElementById('text').value
        }
    }
    
    function sendMail() {
        const emailDataJSON = JSON.stringify(collectEmailData())
        postRequest(emailDataJSON)
    }

    // Initialize form
    (function initFormAction() {
        const emailForm = document.getElementById('emailForm')
        emailForm.onsubmit = sendMail
    })();
    
    (function initEmailPreview() {
        const emailPreview = document.getElementById('emailPreview')
        const emailHTML = document.getElementById('html')
        emailHTML.addEventListener("change", () => {
            emailPreview.srcdoc = emailHTML.value
        })
    })();
})();
