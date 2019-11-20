const mongoose = require("mongoose")
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
    }
}))

exports.Project = Project