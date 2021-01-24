// Normalize a port into a number, string, or false. Borrowed from Express boilerplate
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val; // named pipe
    }
    if (port >= 0) {
        return port; // port number
    }
    return false;
}


// Decodes base 64 strings. Used for SSL keys and certs
function decodeBase64(string) {
    return Buffer.from(string, 'base64').toString('ascii')
}


// Destroys property from object after reading it
function burnAfterReading(object, property) {
    const value = object[property]
    object[property] = null
    return value
}

// Gets SSL credential then nulls it from envriomental variables
function getSSLEnv(property) {
    return decodeBase64( burnAfterReading( process.env, property ) )
}

// Gets SSL credential then nulls it from environment variables
function setDevEnviroment() { 
    try {
        if ( !process.env.IN_IMAGE ) {
            const devEnviroment = require('../../dev-enviroment.json') // This looks for a local dev enviroment file that exists in local but isn't included in the distributed image
            Object.assign(process.env, devEnviroment)
        }
    } catch (err) {
        console.error("Valid dev enviroment settings not found: ", err)
    }
}


const utilities = {
    normalizePort: normalizePort,
    decodeBase64: decodeBase64,
    burnAfterReading: burnAfterReading,
    getSSLEnv: getSSLEnv,
    setDevEnviroment: setDevEnviroment
}

module.exports = utilities