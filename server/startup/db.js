const mongoose = require('mongoose');
const config = require('../config/keys');
const winston = require("winston");

module.exports = function () {
    mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
        .then(() => {
            winston.info("connected to db..");
        })
}