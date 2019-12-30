const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    imageData: {
        type: String,
        required: true
    }
})

const Image = mongoose.model("Image", imageSchema)

exports.Image = Image