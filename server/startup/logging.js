const winston = require("winston")

require("express-async-errors") // Automatically catches express async errors and passes control to error middleware function

module.exports = function () {
    // Winston setup
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true })
    )
    process.on("unhandledRejection", (ex) => { throw ex }) // Catch UnhandledPromiseRejections and rethrow as normal exceptions

    // TODO: add error logging to file/db
}