//const newrelic = require('newrelic')
const express = require('express')
const winston = require("winston")

require('./startup/logging')()
require('./startup/db')()
require('./startup/joivalidation')()
const port = process.env.PORT || 3000
const app = express();

require('./startup/applyMiddleware')(app);


app.listen(port , () => {
    winston.info(`listening on port ${port}`)
})