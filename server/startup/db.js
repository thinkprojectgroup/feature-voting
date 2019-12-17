const mongoose = require('mongoose');
const mongoURI = process.env.MONGOLAB_URI || require('../config/keys').mongoURI;
const winston = require("winston")
const Grid = require('gridfs-stream');


module.exports = function () {
    // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
    //     .then(() => {
    //         winston.info("connected to db..");
    //     })

    mongoose.set("autoIndex", false)
    mongoose.set("useCreateIndex", true)

    const connection = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, reconnectTries: 1 })

    connection.once("open", () => {
        // const gfs = Grid(connection.db, mongoose.mongo)
        // gfs.collection('uploads')
        winston.info("connected to db..");
        // module.exports.gfs = gfs
    })
}