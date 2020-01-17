const mongoose = require("mongoose")
const Joi = require("joi")

const User = mongoose.model("User", new mongoose.Schema({
    role: {
        type: String,
        default: "user",
        required: true
    },
    banned: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 255
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deviceHash: {
        type: String,
        minlength: 0,
        maxlength: 1024
    }
}))

function validateUser(user) {
    const schema = {
        role: Joi.string().valid("user", "admin", "employee").required(),
        email: Joi.string().email(),
        name: Joi.string().min(1).max(255)
    }
    return Joi.validate(user, schema)
}

function validateBanRequest(user) {
    const schema = {
        banned: Joi.boolean().required(),
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validateUser = validateUser
exports.validateBanRequest = validateBanRequest

