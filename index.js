const express = require('express')
// Setup our express app
const app = express()

const mongoose = require('mongoose')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')

const port = process.env.port || 4000

// Connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/student')
mongoose.Promise = global.Promise

/**
 * Custom middleware
 */
// logger middleware
app.use(logger)

// Cross origin resource sharing
app.use(cors(corsOptions))

/**
 * Built-in middleware
 */
// middleware to handle urlencoded data
app.use(express.urlencoded({extended: false}))

// express parser to parse the data sent or received from DB
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// middleware for static files
app.use(express.static('public'))

/**
 * Initialize routes
 */
app.use('/api/register', require('./routes/register'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/refresh', require('./routes/refresh'))

app.use(verifyJWT)

app.use('/api/student', require('./routes/student'))
app.use('/api/users', require('./routes/user'))
/*app.all('*', (req, res) => {
    res.status(404)

    console.log(req.headers.accept);
    if (req.accepts('html')) {
        res.sendFile()
    } else if (req.accepts('json') || req.accepts('application/json')) {
        res.json({error : '404 not found'})
    } else {
        res.type('txt').send('404 not found')
    }
})*/

// Error handling middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Ready to Go! : ${port}`)
})
