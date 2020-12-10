const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const config = require('./utils/config')
const app = express()
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


console.log('connecting to ', config.MONGODB_URI)
app.get('/favicon.ico', (req, res) => res.status(204));

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(()=> {
        logger.info('connected to MongoDB')
    })
    .catch((error)=>{
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
