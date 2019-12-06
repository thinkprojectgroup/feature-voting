const winston = require("winston")

require("express-async-errors") // Automatically catches express async errors and passes control to error middleware function

const format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    })
)

module.exports = function () {
    // Winston setup
    winston.add(winston.createLogger({
        transports: [new winston.transports.Console({
            format: format,
            handleExceptions: true
        })],
        exitOnError: true
    }))

    winston.info("logger set up")
    process.on("unhandledRejection", (ex) => { throw ex }) // Catch UnhandledPromiseRejections and rethrow as normal exceptions
}