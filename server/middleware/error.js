const winston = require("winston")
const { Image } = require("../models/image")

// Used as the last middleware function in applyMiddleware.js this catches all errors thrown by 
// other middleware functions (mainly db connection issues)
module.exports = async function (err, req, res, next) {
    winston.error(err.message)
    res.status(500).send("Something failed")

    // Delete images if a request has saved images but then failed completing
    if (req.imageIds) {
        await Image.deleteMany({
            _id: {
                "$in": req.imageIds
            }
        })
    }

    process.exit()
}