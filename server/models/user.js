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
        required: false,
        default: false,
    }
}))

// TODO: maybe remove, users should only be created internally
function validateUser(user) {
    const schema = {
        role: Joi.string().valid("user", "admin", "employee"),
        email: Joi.string().email(),
        name: Joi.string().min(1).max(255)
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validateUser = validateUser
