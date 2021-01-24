// A home for small utility functions

const utilities = {

    // Decodes base 64 strings. Used for SSL keys and certs
    decodeBase64: (string) => {
        return Buffer.from(string, 'base64').toString('ascii')
    },

    // Normalize a port into a number, string, or false. Borrowed from Express boilerplate
    normalizePort: (val) => {
        const port = parseInt(val, 10);
      
        if (isNaN(port)) {
          return val; // named pipe
        }
      
        if (port >= 0) {
          return port; // port number
        }
      
        return false;
    },

    
}

module.exports = utilities