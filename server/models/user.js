const mongoose = require("mongoose")
const Joi = require("joi")

const User = mongoose.model("User",  new mongoose.Schema({
    _id: {
        type:  mongoose.Schema.Types.ObjectId, // TODO: adjust to sebastians id requirements
        required: true
    },
    role: {
        type: String,
        default: "User",
        required: true
    },
    banned: {
        type: Boolean,
        default: false
    }
}))

function validateUser(user) {
    const schema = {
        id: Joi.objectId().required(), // TODO: adjust to sebastians id requirements
        role: Joi.string().valid("user", "admin", "employee").required()
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validateUser = validateUser