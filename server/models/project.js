const mongoose = require("mongoose")
const Joi = require("joi")
const { featureSchema } = require("./feature")

const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 1,
        maxlength: 255
    },
    displayName: {
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
        default: false,
    }
})
schema.index({ name: 1 }, { unique: true })

const Project = mongoose.model("Project", schema)

function validateProject(project) {
    const schema = {
        name: Joi.string().min(1).max(255).required().regex(/^[ /\w|\-|\s/]+$/)
    }
    return Joi.validate(project, schema)
}

function generateUrlName(name) {
    // Remove unwanted characters, only accept alphanumeric and space
    var urlName = name.replace(/[^A-Za-z0-9- ]/g, '')

    //TODO: maybe turn multiple dashes in a row into just one?
    
    // Trim and remove multi spaces
    urlName = urlName.trim().replace(/\s{2,}/g, ' ')

    // Replace space with a '-' symbol and return
    return urlName.replace(/\s/g, "-")
}

exports.Project = Project
exports.validateProject = validateProject
exports.generateUrlName = generateUrlName
