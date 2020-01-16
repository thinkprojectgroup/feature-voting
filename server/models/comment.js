const mongoose = require("mongoose")
const Joi = require("joi")

const schema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2048,
    },
    featureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feature",
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    featureName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 255
    },
    imageUrls: [{
        type: String,
        minlength: 0,
        maxlength: 1024
    }]
})
schema.index({ content: "text" })

const Comment = mongoose.model("Comment", schema)

function validateComment(comment) {
    const schema = {
        content: Joi.string().min(1).max(2048).required(),
        name: Joi.string().min(1).max(255)
    }
    return Joi.validate(comment, schema)
}

function validateFlaggedComment(comment) {
    const schema = {
        flagged: Joi.bool().required()
    }
    return Joi.validate(comment, schema)
}

exports.Comment = Comment
exports.validateComment = validateComment
exports.validateFlaggedComment = validateFlaggedComment
