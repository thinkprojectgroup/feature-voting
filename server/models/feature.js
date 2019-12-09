const mongoose = require("mongoose")
const Joi = require("joi")

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
    employeeIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    voteCount: {
        type:Number,
        default: 0
    },
    acceptedStatus: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false,
    }
})

featureSchema.pre("validate", function (next) {
    this.voteCount = this.employeeIds.length + this.userIds.length
    next()
})

function validateFeature(feature) {
    const schema = {
        headline: Joi.string().min(1).max(255).required(),
        description: Joi.string().max(2048)
    }
    return Joi.validate(feature, schema)
}

exports.featureSchema = featureSchema
exports.validateFeature = validateFeature
