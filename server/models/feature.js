const mongoose = require("mongoose")
const Joi = require("joi")
const util = require("util")


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
        type: Number,
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
    imageUrls: [{
        type: String,
        minlength: 0,
        maxlength: 1024
    }],
    deleted: {
        type: Boolean,
        default: false,
    },
    commentCount: {
        type: Number,
        min: 0,
        default: 0
    }
})
featureSchema.index({ headline: "text", description: "text" })

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

function validateSearch(body) {
    const schema = {
        searchString: Joi.string().required(),
    }
    return Joi.validate(body, schema)
}

// Remove sensitive information from features before returning them to client
function cleanFeatures(features, userId) {
    return features.map(feature => {
        //UserIds is type [object], turn them into [string] 
        const userIdStrings = feature.userIds.map(obj => util.inspect(obj))
        const employeeIdStrings = feature.employeeIds.map(obj => util.inspect(obj))
        feature.upvoted = (userIdStrings.includes(userId) || employeeIdStrings.includes(userId))
        feature.userVoteCount = feature.userIds.length
        feature.employeeVoteCount = feature.employeeIds.length
        delete feature.userIds
        delete feature.employeeIds
        delete feature.creator
    })
}

exports.featureSchema = featureSchema
exports.validateFeature = validateFeature
exports.validateSearch = validateSearch
exports.cleanFeatures = cleanFeatures
