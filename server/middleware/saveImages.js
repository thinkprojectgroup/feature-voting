const { Image } = require("../models/image")

module.exports = async (req, res, next) => {
  // If no imageData is present, set the imageIds Array to empty and call next()
  if (!req.body.imageData) {
    req.imageIds = []
    return next()
  }

  const imageIds = []
  const images = req.body.imageData

  // Save each image in the db and save their ids
  await Promise.all(images.map(async (image) => {
    const dbImage = new Image({
      imageData: image
    })
    await dbImage.save()
    imageIds.push(dbImage._id)
  }))

  // Add the image ids to the request
  req.imageIds = imageIds
  next()
}