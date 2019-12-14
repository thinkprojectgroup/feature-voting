const mongoose = require('mongoose');
const mongoURI = process.env.MONGOLAB_URI;
const winston = require("winston")

module.exports = function () {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
        .then(() => {
            winston.info("connected to db..");
        })
        
    mongoose.set("autoIndex", false)
    mongoose.set("useCreateIndex", true)
}