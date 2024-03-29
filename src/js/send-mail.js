(() => {
    function postRequest(emailDataJSON) {
        const request = new XMLHttpRequest()
        const API_URL = 'mailer/api'
    
        request.open("POST", API_URL, true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(emailDataJSON)
    
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                const response = JSON.parse(request.response)
                switch (response.result) {
                    case 'success':
                        const messageRecipient = response.message.to
                        message.set('success', `Message sent sucessfully to ${messageRecipient}!`)
                        state.removeSending()
                        break;
                    case 'failure':
                        message.set('alert', `${request.response}!`)
                        state.removeSending()
                        break;
                    default:
                        message.set('alert', `Sending error`)
                        state.removeSending()
                }
			}
        }
    }
    
    function collectEmailData() {
        return {
            toAddress: document.getElementById('toAddress').value,
            subject: document.getElementById('subject').value,
            html: document.getElementById('html').value,
            text: document.getElementById('text').value
        }
    }

    const message = {
        messageElement: document.getElementById('message'),

        set(state, message) {
            this.messageElement.setAttribute('state', state)
            this.messageElement.innerText = message
        }
    }

    const state = {
        targetElement: document.body,
        buttonElement: document.getElementById("submit"),
        toggleClass: 'js-state--sending',

        setSending() {
            this.targetElement.classList.add( this.toggleClass )
            this.buttonElement.disabled = true
        },

        removeSending() {
            this.targetElement.classList.remove( this.toggleClass )
            this.buttonElement.disabled = false
        }
    }
    
    function sendMail() {
        const emailDataJSON = JSON.stringify(collectEmailData())
        postRequest(emailDataJSON)
        state.setSending()
    }

    // Initialize form
    (function initFormAction() {
        const emailForm = document.getElementById('emailForm')
        emailForm.onsubmit = sendMail
    })();
    
    (function initEmailPreview() {
        const emailPreview = document.getElementById('emailPreview')
        const emailHTML = document.getElementById('html')
        const update = document.getElementById('update')

        function updatePreview() {
            emailPreview.srcdoc = emailHTML.value
        }

        update.addEventListener("change", () => {
            updatePreview()
        })

        update.addEventListener("click", (e) => {
            e.preventDefault()
            updatePreview()
        })
    })();
})();