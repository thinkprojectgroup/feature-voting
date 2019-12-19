const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
})

const Image = mongoose.model("Image", imageSchema)

exports.Image = Image