const mongoose = require("mongoose")
const Joi = require("joi")

const Comment = mongoose.model("Comment", new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, // TODO: adjust to sebastians id requirements
        required: true
    },
    flagged: {
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
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true,
    }
}))

function validateComment(comment) {
    const schema = {
        authorId: Joi.objectId().required(), // TODO: adjust to sebastians id requirements
        content: Joi.string().min(1).max(2048).required(),
        featureId: Joi.objectId().required()
    }
    return Joi.validate(comment, schema)
}

exports.Comment = Comment
exports.validateComment = validateComment