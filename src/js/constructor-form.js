function createRunString() {

    const PORT = document.getElementById('PORT').value
    const API_KEY = document.getElementById('API_KEY').value
    const FROM_EMAIL = document.getElementById('FROM_EMAIL').value
    const SSL_KEY = btoa(document.getElementById('SSL_KEY').value)
    const SSL_CRT = btoa(document.getElementById('SSL_CRT').value)

    const runString = `docker run -p ${PORT}:${PORT} -e "PORT=${PORT}" -e "FROM_EMAIL=${FROM_EMAIL}" -e "API_KEY=${API_KEY}" -e "SSL_CRT=${SSL_CRT}" -e "SSL_KEY=${SSL_KEY}" johnjamison/mailer`

    return runString
}

const convertButton = document.getElementById('convert')
convertButton.addEventListener('click', function() {
    const configWindow = document.getElementById('config')
    configWindow.value = createRunString()
})

const copyButton = document.getElementById('copy')
copyButton.addEventListener('click', function(e) {
    e.preventDefault()
    const configText = document.getElementById('config')
    configText.select()
    configText.setSelectionRange(0, 99999)
    document.execCommand("copy")
})