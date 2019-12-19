const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const uploadImages = require("../middleware/imageUpload")
const { Image } = require("../models/image")

router.get("/:imageId", async (req, res) => {
  //TODO: verify id schema

  const image = await Image.findById(req.params.imageId)
  if (!image) return res.status(404).send("image not found")

  res.status(200).send(image.imageData)
})

router.post("/uploadBase", async (req, res, next) => {
  //TODO: validateImage
  console.log(req.body.imageName)

  const newImage = new Image({
    imageName: req.body.imageName,
    imageData: req.body.imageData
  })

  await newImage.save()

  res.status(200).send(newImage)
})

module.exports = router;
