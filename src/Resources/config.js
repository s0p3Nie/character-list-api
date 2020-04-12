const config = {
    server: {
        host: 'localhost',
        port: 3000
    },
    serverHasSertificate: false,
    mongo: {
        url: 'mongodb://localhost:27017/',
        db: 'db'
    }
}

module.exports = config;