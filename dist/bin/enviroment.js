const defaults = require('./defaults.json')

function setEnviroment() {
    try {
        if ( process.env.IN_IMAGE ) {
            const enviroment = process.env
            return Object.assign(defaults, enviroment)
        } else {
            const devEnviroment = require('../../dev-enviroment.json') // This looks for a local dev enviroment file that exists in local but isn't included in the distributed image
            return Object.assign(defaults, devEnviroment)
        }
    } catch (err) {
        console.error("Valid enviroment settings not found: ", err)
    }
}

const enviroment = setEnviroment()

module.exports = enviroment