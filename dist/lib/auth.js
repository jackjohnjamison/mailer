const auth = {
    page: {
        users: { 'admin' : 'admin' },
        challenge: true,
        realm: 'Cybertron'
    },

    api: {  // Not currently used
        users: { 'send' : 'mail' },
        challenge: true,
        realm: 'Unicron'
    }
}

module.exports = auth;