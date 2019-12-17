const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")
const mongoUri = require("../config/keys").mongoURI 
const crypto = require("crypto")

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'server/public')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// var upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 2000000 // 2 MB
//     },
//     fileFilter: fileFilter
// }).array("file", 3)

// Create storage engine
const storage = new GridFsStorage({
    url: mongoUri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err)
          }
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })
  
  const upload = multer({ storage }).array("file", 3)

module.exports = upload