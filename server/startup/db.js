const mongoose = require('mongoose');
const mongoURI = require('../config/keys');
const winston = require("winston")

module.exports = function () {
    mongoose.connect(mongoURI.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
        .then(() => {
            winston.info("connected to db..");
        })
}