const port = process.env.port || 4000

// Todo need to update before upload to live server
const whitelist = [
    'https://www.yoursite.com',
    `http://127.0.0.1:${port}`,
    `http://localhost:${port}`
]

const corsOptions = {
    origin: (origin, callback) => {
        // Todo need to update before upload to live server
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions