const winston = require("winston")
const { Image } = require("../models/image")

// Used as the last middleware function in applyMiddleware.js this catches all errors thrown by 
// other middleware functions (mainly db connection issues)
module.exports = async function (err, req, res, next) {
    winston.error(err.message)
    res.status(500).send("Something failed")

    //TODO: discuss if we should keep this
    process.exit()
}