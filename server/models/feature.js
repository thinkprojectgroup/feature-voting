const mongoose = require("mongoose")

const featureSchema = new mongoose.Schema({
    headline: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true
    },
    description: {
        type: String,
        required: false,
        maxlength: 2048,
    },
    employeeIds: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    userIds: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    acceptedStatus: {
        type: Boolean,
        default: false
    }
})

exports.featureSchema = featureSchema
