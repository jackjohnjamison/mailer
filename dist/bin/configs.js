const defaults = require('./defaults.json')

function setConfigs() {
    try {
        if ( process.env ) {
            const enviromentConfigs = process.env // Environment configs are URL encoded as to be passed as strings when the container is first run
            return Object.assign(defaults, enviromentConfigs)
        } else {
            const localConfigs = require('../../configs/local-configs.json') // This looks for a local configs file that exists in local but isn't included in the distributed image
            return Object.assign(defaults, localConfigs)
        }
    } catch (err) {
        console.error("Valid configs not found: ", err)
    }
}

const configs = setConfigs()

console.log(configs)

module.exports = configs