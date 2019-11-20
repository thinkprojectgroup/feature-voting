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
    voteCount: {
        type:Number,
        default: 0
    },
    acceptedStatus: {
        type: Boolean,
        default: false
    }
})

featureSchema.pre("validate", function (next) {
    this.voteCount = this.employeeIds.length + this.userIds.length
    next()
})

exports.featureSchema = featureSchema
