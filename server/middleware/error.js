const winston = require("winston")
const { Image } = require("../models/image")

// Used as the last middleware function in applyMiddleware.js this catches all errors thrown by 
// other middleware functions (mainly db connection issues)
module.exports = async function (err, req, res, next) {
    winston.error(`${err.message} ${err.reason || ""} ${err.label || ""} \n ${err.stack || ""}`)
    res.status(500).send("Something failed")

    // Shut down server on mongoDB timeout
    if(err.name === "MongoTimeoutError") {
        process.exit()
    }
}