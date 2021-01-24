const auth = {
    page: {
        users: { 'admin' : 'privaledge' },
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