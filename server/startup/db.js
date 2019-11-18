const mongoose = require('mongoose');
const mongoURI = require('../config/keys');

module.exports = function(){
    mongoose.connect(mongoURI.mongoURI).then(() => {
        console.log("connected to db..");
    }).catch((err) => (
        console.log(err.message)
    ))
}