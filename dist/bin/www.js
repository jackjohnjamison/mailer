const https = require('https')

const utl = require('../lib/server-utilites')
utl.setDevEnviroment() // This needs to be set before running the main

const main = require('../main')
const debug = require('debug')('server:server')

/**
 * Get port from environment and store in Express.
 */
const port = utl.normalizePort( process.env.PORT )
main.set('port', port)

/**
 * Create server.
 */
function setServer() {
    return https.createServer({
        key: utl.getSSLEnv('SSL_KEY'),
        cert: utl.getSSLEnv('SSL_CRT')
    }, main)
}
const server = setServer()

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    console.log(`Listening on port ${ port }`)
})
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTPS server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}