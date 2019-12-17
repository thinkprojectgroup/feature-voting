const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const uploadImages = require("../middleware/imageUpload")
const { gfs } = require("../startup/db")

router.get("/:fileId", (req, res) => {
    gfs.files.findOne({ id: req.params.fileId }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists',
          })
        }
    
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename)
          readstream.pipe(res)
        } else {
          res.status(404).json({
            err: 'Not an image',
          })
        }
      })
      
})

module.exports = router;
