const { Image } = require("../models/image")

module.exports = async (req, res, next) => {
  // If no imageData is present, set the imageIds Array to empty and call next()
  if (!req.body.imageData) {
    req.imageIds = []
    return next()
  }

  // Save each image in the db and save their ids
  const dbImages = await Image.create(req.body.imageData.map(image => { imageData: image }))
  const imageIds = dbImages.map(img => img._id)

  // Add the image ids to the request
  req.imageIds = imageIds
  next()
}