const https = require('https')
const app = require('../app')
const debug = require('debug')('server:server')
const utl = require('../lib/utilites')
const enviroment = require('./enviroment')

/**
 * Get port from environment and store in Express.
 */
const port = utl.normalizePort( enviroment.PORT )
app.set('port', port)

/**
 * Create server.
 */
function setServer() {
    return https.createServer({
        key: utl.decodeBase64(enviroment.SSL_KEY),
        cert: utl.decodeBase64(enviroment.SSL_CRT)
    }, app)
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
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}