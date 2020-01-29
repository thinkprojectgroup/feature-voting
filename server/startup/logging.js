const winston = require("winston")

require("express-async-errors") // Automatically catches express async errors and passes control to error middleware function

const format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(({ timestamp, level, message, label, reason }) => {
        return `${timestamp} ${level}: ${message} ${label || ""} ${reason || ""}`
    })
)

const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    format
)

module.exports = function () {
    winston.add(new winston.transports.Console({ level: "info", handleExceptions: true, format: consoleFormat }))
    winston.add(new winston.transports.File({ filename: "error-log.txt", level: "error", handleExceptions: true, format: format }))

    process.on("unhandledRejection", (ex) => { throw ex }) // Catch UnhandledPromiseRejections and rethrow as normal exceptions
}