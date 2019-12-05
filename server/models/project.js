const mongoose = require("mongoose")
const Joi = require("joi")
const { featureSchema } = require("./feature")

const Project = mongoose.model("Project", new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 1,
        maxlength: 255
    },
    features: {
        required: true,
        type: [featureSchema]
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    }
}))

function validateProject(project) {
    const schema = {
        name: Joi.string().min(1).max(255).required()
    }
    return Joi.validate(project, schema)
}

exports.Project = Project
exports.validateProject = validateProject