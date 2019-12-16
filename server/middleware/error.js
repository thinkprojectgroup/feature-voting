const winston = require("winston")

// Used as the last middleware function in routes.js this catches all errors thrown by 
// other middleware functions (mainly db connection issues)
module.exports = function(err, req, res, next){
    winston.error(`Role: ${res.role} ${err.message}`)
    res.status(500).send(err.message)
    process.exit()
}