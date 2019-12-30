const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Image } = require("../models/image")

router.get("/:imageId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.imageId)) {
    return res.status(400).send("ProjectId doesn't fit id schema")
  }

  const image = await Image.findById(req.params.imageId)
  if (!image) return res.status(404).send("Image not found")

  res.status(200).send(image.imageData)
})

module.exports = router;
